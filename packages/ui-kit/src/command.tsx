"use client";

import { Search } from "lucide-react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
import { cn } from "./lib/utils";

// React 18 warns about useLayoutEffect during server rendering.
const useClientLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;

const OPTION = '[data-slot="command-item"]';
const SELECTABLE_OPTION = `${OPTION}:not([aria-disabled="true"])`;

export interface CommandFilterItem {
  value: string;
  keywords: readonly string[];
}

/** Decides whether an item stays for a non-blank query. */
export type CommandFilter = (query: string, item: CommandFilterItem) => boolean;

// Accents are dropped so that "configuracoes" finds "Configurações".
function fold(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase();
}

function matchesEveryWord(query: string, { value, keywords }: CommandFilterItem) {
  const text = fold([value, ...keywords].join(" "));
  return fold(query).trim().split(/\s+/).every((word) => text.includes(word));
}

interface CommandContextValue {
  query: string;
  setQuery: (query: string) => void;
  filter: CommandFilter | false;
  activeId: string | undefined;
  setActiveId: (id: string) => void;
  empty: boolean;
  listId: string;
  notifyOptionsChanged: () => void;
  navigate: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommand() {
  const context = useContext(CommandContext);
  if (!context) throw new Error("Command parts must be rendered inside <Command>.");
  return context;
}

export interface CommandProps extends ComponentProps<"div"> {
  /** The search text, for a controlled search. */
  query?: string;
  /** The search text at mount, for an uncontrolled search. */
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  /**
   * Replaces the default filter, which keeps an item when every word of the query appears in its
   * `value` or `keywords`, ignoring case and accents. Pass `false` when the host filters the list
   * itself, for example on the server.
   */
  filter?: CommandFilter | false;
}

/**
 * A searchable list of actions, for a ⌘K palette inside `Dialog` or a picker inside `Popover`.
 * DOM focus stays in `CommandInput` and the active option is exposed through
 * `aria-activedescendant`, the WAI-ARIA combobox pattern with a listbox popup.
 */
export const Command = forwardRef<HTMLDivElement, CommandProps>(function Command(
  { query: controlledQuery, defaultQuery = "", onQueryChange, filter = matchesEveryWord, className, children, ...props },
  ref,
) {
  const root = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => root.current as HTMLDivElement, []);
  const listId = useId();
  const [ownQuery, setOwnQuery] = useState(defaultQuery);
  const [activeId, setActiveId] = useState<string>();
  const [empty, setEmpty] = useState(false);
  const [optionsRevision, notifyOptionsChanged] = useReducer((revision: number) => revision + 1, 0);
  const query = controlledQuery ?? ownQuery;
  const lastQuery = useRef(query);

  // The DOM is the source of truth for which options exist and in what order, so options can sit
  // at any depth, inside any host component, and arrive or leave at any time.
  useClientLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    element.querySelectorAll<HTMLElement>('[data-slot="command-group"]').forEach((group) => {
      group.hidden = group.querySelector(OPTION) === null;
    });
    setEmpty(element.querySelector(OPTION) === null);
    const options = [...element.querySelectorAll<HTMLElement>(SELECTABLE_OPTION)];
    const queryChanged = lastQuery.current !== query;
    lastQuery.current = query;
    setActiveId((current) => (!queryChanged && options.some((option) => option.id === current) ? current : options[0]?.id));
    if (queryChanged) {
      const list = element.querySelector('[data-slot="command-list"]');
      if (list) list.scrollTop = 0;
    }
  }, [query, optionsRevision]);

  const context = useMemo<CommandContextValue>(() => {
    function activate(option: HTMLElement | undefined) {
      if (!option) return;
      setActiveId(option.id);
      option.scrollIntoView({ block: "nearest" });
    }
    return {
      query,
      setQuery(next) {
        if (controlledQuery === undefined) setOwnQuery(next);
        onQueryChange?.(next);
      },
      filter,
      activeId,
      setActiveId,
      empty,
      listId,
      notifyOptionsChanged,
      navigate(event) {
        // Enter and the arrows belong to an input method while it composes.
        if (event.nativeEvent.isComposing || event.keyCode === 229) return;
        const options = [...(root.current?.querySelectorAll<HTMLElement>(SELECTABLE_OPTION) ?? [])];
        const index = options.findIndex((option) => option.id === activeId);
        if (event.key === "ArrowDown") activate(options[(index + 1) % options.length]);
        else if (event.key === "ArrowUp") activate(options[(Math.max(index, 0) - 1 + options.length) % options.length]);
        else if (event.key === "Home") activate(options[0]);
        else if (event.key === "End") activate(options[options.length - 1]);
        else if (event.key === "Enter") options[index]?.click();
        else return;
        event.preventDefault();
      },
    };
  }, [activeId, controlledQuery, empty, filter, listId, onQueryChange, query]);

  return (
    <CommandContext.Provider value={context}>
      <div {...props} ref={root} data-slot="command" className={cn("ci-command", className)}>
        {children}
      </div>
    </CommandContext.Provider>
  );
});

export interface CommandInputProps extends Omit<ComponentProps<"input">, "value" | "defaultValue" | "type" | "role"> {
  /** Sits beside the input, such as a clear button or an `Esc` hint. */
  trailing?: ReactNode;
}

/** The search field. Name it with `aria-label`: the kit has no default text. */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { trailing, className, onChange, onKeyDown, ...props },
  ref,
) {
  const { activeId, empty, listId, navigate, query, setQuery } = useCommand();
  return (
    <div className="ci-command__search">
      <Search aria-hidden="true" />
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        {...props}
        ref={ref}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={!empty}
        aria-controls={listId}
        aria-activedescendant={activeId}
        data-slot="command-input"
        className={cn("ci-command__input", className)}
        value={query}
        onChange={(event) => {
          onChange?.(event);
          setQuery(event.target.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented) navigate(event);
        }}
      />
      {trailing != null ? <span className="ci-command__search-trailing">{trailing}</span> : null}
    </div>
  );
});

export interface CommandListProps extends Omit<ComponentProps<"div">, "id" | "role"> {}

/** The scrolling listbox. Name it with `aria-label`; `--ci-command-list-max-height` caps it. */
export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(function CommandList({ className, onMouseDown, ...props }, ref) {
  const { empty, listId } = useCommand();
  return (
    <div
      {...props}
      ref={ref}
      id={listId}
      role="listbox"
      hidden={empty}
      data-slot="command-list"
      className={cn("ci-command__list", className)}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        // Keeps focus in the input; a press on the list's own scrollbar still drags it.
        if (event.target !== event.currentTarget) event.preventDefault();
      }}
    />
  );
});

export interface CommandGroupProps extends Omit<ComponentProps<"div">, "role"> {
  /** The visible group title, which also names the group for assistive technology. */
  heading?: ReactNode;
}

/** Groups options under a heading. It hides itself when none of its options match. */
export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(function CommandGroup({ heading, className, children, ...props }, ref) {
  const headingId = useId();
  const named = heading != null;
  return (
    <div {...props} ref={ref} role="presentation" data-slot="command-group" className={cn("ci-command__group", className)}>
      {named ? <div id={headingId} aria-hidden="true" className="ci-command__group-heading">{heading}</div> : null}
      <div role={named ? "group" : "presentation"} aria-labelledby={named ? headingId : undefined}>{children}</div>
    </div>
  );
});

export interface CommandItemProps extends Omit<ComponentProps<"div">, "onSelect" | "role"> {
  /** What the filter searches and what `onSelect` receives. Use the visible label. */
  value: string;
  /** More text for the filter to find, such as aliases, a subtitle or the group's title. */
  keywords?: readonly string[];
  disabled?: boolean;
  /** Runs on a click and on Enter while the option is active. */
  onSelect?: (value: string) => void;
  /** Decorative: hidden from assistive technology. */
  icon?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Sits at the end of the row, usually a `Kbd` or `KbdGroup`. */
  shortcut?: ReactNode;
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem(
  { value, keywords = [], disabled = false, onSelect, icon, description, shortcut, id, className, children, onClick, onPointerMove, ...props },
  ref,
) {
  const { activeId, filter, notifyOptionsChanged, query, setActiveId } = useCommand();
  const generatedId = useId();
  const optionId = id ?? generatedId;
  const visible = filter === false || query.trim() === "" || filter(query, { value, keywords });

  useClientLayoutEffect(() => {
    if (!visible) return;
    notifyOptionsChanged();
    return notifyOptionsChanged;
  }, [disabled, notifyOptionsChanged, optionId, visible]);

  if (!visible) return null;
  const active = activeId === optionId;
  return (
    <div
      {...props}
      ref={ref}
      id={optionId}
      role="option"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      data-slot="command-item"
      data-active={active || undefined}
      className={cn("ci-command__item", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!disabled && !event.defaultPrevented) onSelect?.(value);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        // On movement, not on enter: a list scrolling under a resting pointer must not steal it.
        if (!disabled && !active) setActiveId(optionId);
      }}
    >
      {icon != null ? <span className="ci-command__icon" aria-hidden="true">{icon}</span> : null}
      <span className="ci-command__text">
        <span className="ci-command__label">{children}</span>
        {description != null ? <small className="ci-command__description">{description}</small> : null}
      </span>
      {shortcut != null ? <span className="ci-command__shortcut">{shortcut}</span> : null}
    </div>
  );
});

export interface CommandEmptyProps extends Omit<ComponentProps<"div">, "role"> {}

/**
 * The message for a search with no match. Render it after `CommandList`, not inside: a listbox can
 * only hold options. It stays mounted as a `role="status"` region so screen readers announce it.
 */
export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(function CommandEmpty({ className, children, ...props }, ref) {
  const { empty } = useCommand();
  return (
    <div {...props} ref={ref} role="status" data-slot="command-empty" data-empty={empty || undefined} className={cn("ci-command__empty", className)}>
      {empty ? children : null}
    </div>
  );
});

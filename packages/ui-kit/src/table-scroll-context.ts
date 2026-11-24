import { createContext, useContext } from "react";

export const TableScrollAreaContext = createContext(false);

export function useInsideTableScrollArea(): boolean {
  return useContext(TableScrollAreaContext);
}

/**
 * The `scrollbarLabel` a consumer gave the enclosing TableScrollArea. A Table with no other name
 * uses it for its scroll container; the built-in default is never passed down.
 */
export const TableScrollAreaNameContext = createContext<string | undefined>(undefined);

export function useTableScrollAreaName(): string | undefined {
  return useContext(TableScrollAreaNameContext);
}

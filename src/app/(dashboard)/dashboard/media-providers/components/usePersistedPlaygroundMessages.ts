"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import {
  loadPlaygroundMessages,
  savePlaygroundMessages,
  type StoredPlaygroundMessage,
} from "./llmChatStorage";

/**
 * Playground conversation state persisted per storage key (provider × selected API key).
 * `abortInFlight` aborts the in-flight request and returns true, or returns false when idle.
 */
export function usePersistedPlaygroundMessages(
  storageKey: string,
  streaming: boolean,
  abortInFlight: () => boolean
): [StoredPlaygroundMessage[], Dispatch<SetStateAction<StoredPlaygroundMessage[]>>] {
  const [messages, setMessages] = useState<StoredPlaygroundMessage[]>([]);
  const messagesRef = useRef<StoredPlaygroundMessage[]>(messages);

  // The conversation belongs to the storage key: reload it whenever the key changes —
  // adjusting state during render, so `messages` and the key it belongs to always commit
  // together and the persist effect below can never write one key's conversation into
  // another key's slot.
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  if (loadedKey !== storageKey) {
    setLoadedKey(storageKey);
    setMessages(loadPlaygroundMessages(storageKey));
  }

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Key change / unmount mid-stream: the fetch is aborted, so keep what already arrived.
  useEffect(() => {
    return () => {
      if (abortInFlight()) savePlaygroundMessages(storageKey, messagesRef.current);
    };
  }, [storageKey, abortInFlight]);

  // Persist only once a turn is complete — not on every streamed token.
  useEffect(() => {
    if (streaming) return;
    savePlaygroundMessages(storageKey, messages);
  }, [messages, storageKey, streaming]);

  return [messages, setMessages];
}

import { createContext, useContext } from "react";

export const TableScrollAreaContext = createContext(false);

export function useInsideTableScrollArea(): boolean {
  return useContext(TableScrollAreaContext);
}

"use client";

import { createContext, useCallback, useContext, useState } from "react";

type BootContextValue = {
  /** system boot complete - loader finished */
  booted: boolean;
  setBooted: () => void;
};

const BootContext = createContext<BootContextValue>({
  booted: false,
  setBooted: () => {},
});

export function useProjectOverlay() {
  return useContext(BootContext);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [booted, setBootedState] = useState(false);

  const setBooted = useCallback(() => setBootedState(true), []);

  return (
    <BootContext.Provider value={{ booted, setBooted }}>
      {children}
    </BootContext.Provider>
  );
}

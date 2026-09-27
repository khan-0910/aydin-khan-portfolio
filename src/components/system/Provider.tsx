"use client";

import { createContext, useCallback, useContext, useState } from "react";

type OverlayContextValue = {
  openProject: string | null;
  open: (id: string) => void;
  close: () => void;
  /** system boot complete — loader finished */
  booted: boolean;
  setBooted: () => void;
};

const OverlayContext = createContext<OverlayContextValue>({
  openProject: null,
  open: () => {},
  close: () => {},
  booted: false,
  setBooted: () => {},
});

export function useProjectOverlay() {
  return useContext(OverlayContext);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [booted, setBootedState] = useState(false);

  const open = useCallback((id: string) => setOpenProject(id), []);
  const close = useCallback(() => setOpenProject(null), []);
  const setBooted = useCallback(() => setBootedState(true), []);

  return (
    <OverlayContext.Provider value={{ openProject, open, close, booted, setBooted }}>
      {children}
    </OverlayContext.Provider>
  );
}

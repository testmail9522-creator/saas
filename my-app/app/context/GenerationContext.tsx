"use client";

import { createContext, useContext, useState } from "react";

type GenContextType = {
  hasGenerated: boolean;
  setHasGenerated: (v: boolean) => void;
};

const GenerationContext = createContext<GenContextType | null>(null);

export function GenerationProvider({ children }: { children: React.ReactNode }) {
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
    <GenerationContext.Provider value={{ hasGenerated, setHasGenerated }}>
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const ctx = useContext(GenerationContext);
  if (!ctx) throw new Error("useGeneration must be inside provider");
  return ctx;
}

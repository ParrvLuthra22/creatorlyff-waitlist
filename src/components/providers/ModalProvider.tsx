"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
// Forced recompile
import dynamic from "next/dynamic";

const WaitlistModal = dynamic(() => import("../modal/WaitlistModal").then(mod => mod.WaitlistModal), {
  ssr: false,
});

interface ModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

interface ModalProviderProps {
  children: ReactNode;
}

import { useLenis } from "./LenisProvider";

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lenis } = useLenis();

  const open = useCallback(() => {
    setIsOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    if (lenis && (lenis as any).stop) {
      (lenis as any).stop();
    }
  }, [lenis]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    if (lenis && (lenis as any).start) {
      (lenis as any).start();
    }
  }, [lenis]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <WaitlistModal />
    </ModalContext.Provider>
  );
}

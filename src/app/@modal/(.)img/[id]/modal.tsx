"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop h-full w-full">
      <dialog
        ref={dialogRef}
        className="modal m-0 h-full w-full bg-zinc-900/70 text-white"
        onClose={onDismiss}
      >
        {children}
        {/* <button onClick={onDismiss} className="close-button" /> */}
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}

"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";

interface VideoModalProps {
  videoSrc: string | null;
  onClose: () => void;
}

export function VideoModal({ videoSrc, onClose }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoSrc) return;

    document.body.style.overflow = "hidden";

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [videoSrc, onClose]);

  if (!videoSrc) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-void/95"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 font-mono text-stone-400 hover:text-chalk transition-colors text-2xl leading-none cursor-pointer"
      >
        &times;
      </button>
      <video
        controls
        autoPlay
        src={videoSrc}
        className="max-w-4xl w-full max-h-[80vh] rounded-sm"
      />
    </div>,
    document.body
  );
}

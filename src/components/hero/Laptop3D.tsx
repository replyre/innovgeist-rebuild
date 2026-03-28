"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { colors } from "@/lib/theme";
import { ServiceCarousel } from "./ServiceCarousel";
import { TetrisGame, type TetrisGameHandle } from "./TetrisGame";

const INITIAL_ROT_X = -16;
const INITIAL_ROT_Y = -22;
const DRAG_SENSITIVITY = 0.35;

const SCREEN_W = 540;
const SCREEN_H = 340;
const BASE_DEPTH = 230;

type WindowStatus = "normal" | "minimized" | "closed" | "maximized";

// Arrow key map: grid index → { symbol, key }
const ARROW_KEYS: Record<number, { symbol: string; key: string }> = {
  40: { symbol: "▲", key: "arrowup" },
  53: { symbol: "◀", key: "arrowleft" },
  54: { symbol: "▼", key: "arrowdown" },
  55: { symbol: "▶", key: "arrowright" },
};

interface Laptop3DProps {
  mirrorCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
  tetrisRef?: React.RefObject<TetrisGameHandle | null>;
  onReady?: (controls: { flipIn: () => gsap.core.Timeline }) => void;
  onWindowChange?: (state: { dashboardVisible: boolean; tetrisVisible: boolean }) => void;
}

export function Laptop3D({ mirrorCanvasRef, tetrisRef, onReady, onWindowChange }: Laptop3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const hasEntrance = !!onReady;
  const [rot, setRot] = useState({
    x: INITIAL_ROT_X,
    y: hasEntrance ? 180 : INITIAL_ROT_Y,
  });
  const dragging = useRef(false);
  const dragReady = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 4;
  const [isBackFacing, setIsBackFacing] = useState(hasEntrance);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Feature 2: Window state
  const [windowState, setWindowState] = useState({
    dashboard: "normal" as WindowStatus,
    tetris: "normal" as WindowStatus,
  });

  useEffect(() => {
    const n = ((rot.y % 360) + 360) % 360;
    setIsBackFacing(n > 90 && n < 270);
  }, [rot.y]);

  // Feature 2: Notify parent of window visibility changes
  useEffect(() => {
    onWindowChange?.({
      dashboardVisible: windowState.dashboard !== "closed",
      tetrisVisible: windowState.tetris !== "closed",
    });
  }, [windowState, onWindowChange]);

  // Feature 1: Expose flipIn via onReady instead of self-animating entrance
  const rotProxy = useRef({ y: 180 });
  useEffect(() => {
    if (!laptopRef.current || !onReady) return;
    rotProxy.current.y = 180;
    const flipIn = () => {
      return gsap.timeline().to(rotProxy.current, {
        y: INITIAL_ROT_Y,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          setRot((prev) => ({ ...prev, y: rotProxy.current.y }));
        },
        onComplete: () => {
          setRot({ x: INITIAL_ROT_X, y: INITIAL_ROT_Y });
          setIsBackFacing(false);
        },
      });
    };
    onReady({ flipIn });
  }, [onReady]);

  // Fallback: if no onReady (no entrance animation), use old entrance
  useGSAP(
    () => {
      if (!laptopRef.current || onReady) return;
      gsap.fromTo(
        laptopRef.current,
        { opacity: 0, scale: 0.7, rotateX: -35, rotateY: -50 },
        {
          opacity: 1,
          scale: 1,
          rotateX: INITIAL_ROT_X,
          rotateY: INITIAL_ROT_Y,
          duration: 1.6,
          delay: 0.6,
          ease: "power3.out",
        }
      );
    },
    { scope: wrapperRef }
  );

  // Feature 4: Global keyboard listeners for arrow key highlighting
  useEffect(() => {
    const arrowMap: Record<string, string> = {
      ArrowUp: "arrowup",
      ArrowDown: "arrowdown",
      ArrowLeft: "arrowleft",
      ArrowRight: "arrowright",
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const mapped = arrowMap[e.key];
      if (mapped) {
        setPressedKeys((prev) => new Set(prev).add(mapped));
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const mapped = arrowMap[e.key];
      if (mapped) {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(mapped);
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keyup", onKeyUp, true);
    };
  }, []);

  // Drag via window-level listeners — avoids pointer capture issues with 3D transforms
  const windowMoveRef = useRef<((e: PointerEvent) => void) | null>(null);
  const windowUpRef = useRef<((e: PointerEvent) => void) | null>(null);

  const cleanupWindowDrag = useCallback(() => {
    if (windowMoveRef.current) {
      window.removeEventListener("pointermove", windowMoveRef.current);
      windowMoveRef.current = null;
    }
    if (windowUpRef.current) {
      window.removeEventListener("pointerup", windowUpRef.current);
      windowUpRef.current = null;
    }
    dragging.current = false;
    dragReady.current = false;
  }, []);

  const onDown = useCallback((e: React.PointerEvent) => {
    // Skip drag setup if click originated from an interactive element
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-drag]")) return;

    // Clean up any stale listeners first
    cleanupWindowDrag();

    // Set flags AFTER cleanup (cleanup resets them)
    dragReady.current = true;
    dragging.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: e.clientX, y: e.clientY };

    // Attach move/up to window so drag works even if pointer leaves the laptop
    const onWindowMove = (ev: PointerEvent) => {
      if (!dragReady.current && !dragging.current) return;

      if (!dragging.current) {
        const dx = ev.clientX - startPos.current.x;
        const dy = ev.clientY - startPos.current.y;
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging.current = true;
        dragReady.current = false;
      }

      const dx = ev.clientX - lastPos.current.x;
      const dy = ev.clientY - lastPos.current.y;
      lastPos.current = { x: ev.clientX, y: ev.clientY };
      setRot((p) => ({
        x: Math.max(-50, Math.min(15, p.x + dy * DRAG_SENSITIVITY)),
        y: p.y + dx * DRAG_SENSITIVITY,
      }));
    };

    const onWindowUp = () => {
      cleanupWindowDrag();
    };

    windowMoveRef.current = onWindowMove;
    windowUpRef.current = onWindowUp;
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
  }, [cleanupWindowDrag]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { cleanupWindowDrag(); };
  }, [cleanupWindowDrag]);

  // Feature 2: Dot click handlers
  const handleDot = useCallback(
    (
      e: React.PointerEvent | React.MouseEvent,
      window: "dashboard" | "tetris",
      action: "close" | "minimize" | "maximize"
    ) => {
      e.stopPropagation();
      e.preventDefault();
      if (isBackFacing) return;

      setWindowState((prev) => {
        const next = { ...prev };
        if (action === "close") {
          next[window] = "closed";
        } else if (action === "minimize") {
          next[window] = "minimized";
        } else if (action === "maximize") {
          if (prev[window] === "maximized") {
            next[window] = "normal";
          } else {
            next[window] = "maximized";
            // Auto-restore the other window if it was maximized
            const other = window === "dashboard" ? "tetris" : "dashboard";
            if (prev[other] === "maximized") {
              next[other] = "normal";
            }
          }
        }
        return next;
      });
    },
    [isBackFacing]
  );

  const restoreWindow = useCallback(
    (e: React.PointerEvent | React.MouseEvent, window: "dashboard" | "tetris") => {
      e.stopPropagation();
      e.preventDefault();
      setWindowState((prev) => ({ ...prev, [window]: "normal" }));
    },
    []
  );

  // Feature 2: Compute layout
  const bothClosed = windowState.dashboard === "closed" && windowState.tetris === "closed";
  const dashboardVisible =
    windowState.dashboard === "normal" || windowState.dashboard === "maximized";
  const tetrisVisible =
    windowState.tetris === "normal" || windowState.tetris === "maximized";
  const dashboardMaximized = windowState.dashboard === "maximized";
  const tetrisMaximized = windowState.tetris === "maximized";
  const dashboardMinimized = windowState.dashboard === "minimized";
  const tetrisMinimized = windowState.tetris === "minimized";

  // Only one visible → it fills full width
  const dashboardFull =
    dashboardVisible &&
    !tetrisVisible &&
    !tetrisMinimized &&
    windowState.tetris !== "minimized";
  const tetrisFull =
    tetrisVisible &&
    !dashboardVisible &&
    !dashboardMinimized &&
    windowState.dashboard !== "minimized";

  // One closed/minimized → other fills full
  const oneDashOnly =
    dashboardVisible &&
    (windowState.tetris === "closed" || windowState.tetris === "minimized");
  const oneTetrisOnly =
    tetrisVisible &&
    (windowState.dashboard === "closed" || windowState.dashboard === "minimized");

  // Window title bar dot helper — inline JSX, not a component
  const renderDot = (
    color: string,
    win: "dashboard" | "tetris",
    action: "close" | "minimize" | "maximize"
  ) => (
    <div
      key={action}
      data-no-drag
      className="flex items-center justify-center cursor-pointer"
      style={{ padding: "3px" }}
      onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
      onPointerUp={(e) => { e.stopPropagation(); handleDot(e, win, action); }}
    >
      <div
        className="w-[6px] h-[6px] rounded-full hover:brightness-125"
        style={{ background: color, pointerEvents: "none" }}
      />
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={laptopRef}
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          width: `${SCREEN_W}px`,
          height: `${SCREEN_H}px`,
          // When onReady is provided, start visible at rotateY:180 (back face)
          // When no onReady, start invisible for fallback animation
          opacity: onReady ? 1 : 0,
        }}
        onPointerDown={onDown}
      >
        {/* ======= SCREEN — front face ======= */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background: colors.void,
            border: `2px solid ${colors.stone[600]}60`,
            boxShadow: `0 0 50px ${colors.accent}08`,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 flex flex-col">
            {/* Bezel top — camera */}
            <div className="h-4 flex items-center justify-center shrink-0">
              <div
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: colors.stone[600], boxShadow: `0 0 4px ${colors.accent}40` }}
              />
            </div>

            {/* Screen content area */}
            <div className="flex-1 mx-2.5 mb-2.5 flex flex-row gap-1.5 overflow-hidden relative">
              {/* Both closed — desktop */}
              {bothClosed && (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo.png"
                    alt="innovgeist"
                    className="w-10 h-10 object-contain"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.3 }}
                  />
                  <div className="flex gap-3">
                    <button
                      data-no-drag
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      style={{ pointerEvents: isBackFacing ? "none" : "auto" }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => restoreWindow(e, "dashboard")}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}30` }}
                      >
                        <span style={{ fontSize: "8px", color: colors.accent }}>D</span>
                      </div>
                      <span className="font-mono" style={{ fontSize: "5px", color: colors.stone[400] }}>
                        Dashboard
                      </span>
                    </button>
                    <button
                      data-no-drag
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      style={{ pointerEvents: isBackFacing ? "none" : "auto" }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => restoreWindow(e, "tetris")}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ background: `${colors.ember}20`, border: `1px solid ${colors.ember}30` }}
                      >
                        <span style={{ fontSize: "8px", color: colors.ember }}>T</span>
                      </div>
                      <span className="font-mono" style={{ fontSize: "5px", color: colors.stone[400] }}>
                        Tetris
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Dashboard window */}
              {!bothClosed && (dashboardVisible || dashboardMaximized) && (
                <div
                  className="rounded-md overflow-hidden flex flex-col transition-all duration-300"
                  style={{
                    background: colors.surface,
                    flex:
                      dashboardMaximized || oneDashOnly || (!tetrisVisible && !tetrisMinimized)
                        ? "1 1 100%"
                        : "1 1 50%",
                  }}
                >
                  <div
                    data-no-drag
                    className="shrink-0 flex items-center gap-[2px] px-1 h-5"
                    style={{
                      borderBottom: `1px solid ${colors.stone[600]}20`,
                      position: "relative",
                      zIndex: 10,
                      pointerEvents: isBackFacing ? "none" : "auto",
                    }}
                  >
                    {renderDot("#FF5F57", "dashboard", "close")}
                    {renderDot("#FEBC2E", "dashboard", "minimize")}
                    {renderDot("#28C840", "dashboard", "maximize")}
                    <span
                      className="ml-1 font-mono uppercase tracking-[0.12em]"
                      style={{ fontSize: "6px", color: colors.stone[400] }}
                    >
                      dashboard
                    </span>
                  </div>
                  <div
                    className="flex-1 relative overflow-hidden"
                    style={{ pointerEvents: isBackFacing ? "none" : "auto" }}
                  >
                    <ServiceCarousel />
                  </div>
                </div>
              )}

              {/* Tetris window */}
              {!bothClosed && (tetrisVisible || tetrisMaximized) && (
                <div
                  className="rounded-md overflow-hidden flex flex-col transition-all duration-300"
                  style={{
                    background: colors.surface,
                    flex:
                      tetrisMaximized || oneTetrisOnly || (!dashboardVisible && !dashboardMinimized)
                        ? "1 1 100%"
                        : "1 1 50%",
                  }}
                >
                  <div
                    data-no-drag
                    className="shrink-0 flex items-center gap-[2px] px-1 h-5"
                    style={{
                      borderBottom: `1px solid ${colors.stone[600]}20`,
                      position: "relative",
                      zIndex: 10,
                      pointerEvents: isBackFacing ? "none" : "auto",
                    }}
                  >
                    {renderDot("#FF5F57", "tetris", "close")}
                    {renderDot("#FEBC2E", "tetris", "minimize")}
                    {renderDot("#28C840", "tetris", "maximize")}
                    <span
                      className="ml-1 font-mono uppercase tracking-[0.12em]"
                      style={{ fontSize: "6px", color: colors.stone[400] }}
                    >
                      tetris
                    </span>
                  </div>
                  <div
                    className="flex-1 relative overflow-hidden"
                    style={{ pointerEvents: isBackFacing ? "none" : "auto" }}
                  >
                    <TetrisGame ref={tetrisRef} mirrorCanvasRef={mirrorCanvasRef} />
                  </div>
                </div>
              )}

              {/* Minimized window icons — bottom right of screen */}
              {(dashboardMinimized || tetrisMinimized) && !bothClosed && (
                <div className="absolute bottom-1 right-1 flex gap-1 z-10">
                  {dashboardMinimized && (
                    <button
                      data-no-drag
                      className="w-6 h-6 rounded flex items-center justify-center cursor-pointer"
                      style={{
                        background: `${colors.accent}25`,
                        border: `1px solid ${colors.accent}40`,
                        pointerEvents: isBackFacing ? "none" : "auto",
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => restoreWindow(e, "dashboard")}
                    >
                      <span style={{ fontSize: "6px", color: colors.accent, fontWeight: "bold" }}>D</span>
                    </button>
                  )}
                  {tetrisMinimized && (
                    <button
                      data-no-drag
                      className="w-6 h-6 rounded flex items-center justify-center cursor-pointer"
                      style={{
                        background: `${colors.ember}25`,
                        border: `1px solid ${colors.ember}40`,
                        pointerEvents: isBackFacing ? "none" : "auto",
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => restoreWindow(e, "tetris")}
                    >
                      <span style={{ fontSize: "6px", color: colors.ember, fontWeight: "bold" }}>T</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======= SCREEN — back face (logo) ======= */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            background: `linear-gradient(150deg, #1c1a18, ${colors.void} 50%, #1c1a18)`,
            border: `2px solid ${colors.stone[600]}35`,
          }}
        >
          <div
            className="absolute inset-0 rounded-xl opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)`,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="innovgeist"
            className="relative w-12 h-12 object-contain"
            style={{
              filter: "brightness(0) invert(1)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* ======= BASE — keyboard extends FORWARD from screen bottom ======= */}
        <div
          className="absolute rounded-lg"
          style={{
            width: `${SCREEN_W + 20}px`,
            height: `${BASE_DEPTH}px`,
            top: "100%",
            left: "-10px",
            transformOrigin: "center top",
            transform: "rotateX(90deg)",
            background: `linear-gradient(180deg, #1a1816, #111010)`,
            border: `1.5px solid ${colors.stone[600]}25`,
            borderTop: `1.5px solid ${colors.stone[600]}35`,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Keyboard keys — 4 rows with arrow keys */}
          <div className="mx-6 mt-4 grid grid-cols-14 gap-[3px]">
            {Array.from({ length: 56 }).map((_, i) => {
              const arrow = ARROW_KEYS[i];
              const isPressed = arrow ? pressedKeys.has(arrow.key) : false;

              return (
                <div
                  key={i}
                  className="rounded-[2px] flex items-center justify-center"
                  style={{
                    height: "10px",
                    background: isPressed
                      ? `${colors.accent}50`
                      : arrow
                      ? `${colors.stone[600]}25`
                      : `${colors.stone[600]}15`,
                    border: isPressed
                      ? `0.5px solid ${colors.accent}60`
                      : `0.5px solid ${colors.stone[600]}12`,
                    transform: isPressed ? "scale(0.9)" : "none",
                    transition: "all 0.08s ease",
                    cursor: arrow ? "pointer" : "default",
                    fontSize: "5px",
                    color: isPressed ? colors.accent : colors.stone[400],
                    lineHeight: 1,
                  }}
                  onPointerDown={
                    arrow
                      ? (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setPressedKeys((prev) => new Set(prev).add(arrow.key));
                          tetrisRef?.current?.sendKey(arrow.key);
                        }
                      : undefined
                  }
                  onPointerUp={
                    arrow
                      ? () => {
                          setPressedKeys((prev) => {
                            const next = new Set(prev);
                            next.delete(arrow.key);
                            return next;
                          });
                        }
                      : undefined
                  }
                  onPointerLeave={
                    arrow
                      ? () => {
                          setPressedKeys((prev) => {
                            const next = new Set(prev);
                            next.delete(arrow.key);
                            return next;
                          });
                        }
                      : undefined
                  }
                >
                  {arrow ? arrow.symbol : null}
                </div>
              );
            })}
          </div>

          {/* Space bar row */}
          <div className="mx-6 mt-[3px] flex gap-[3px]">
            <div className="rounded-[2px] flex-[2]" style={{ height: "10px", background: `${colors.stone[600]}15`, border: `0.5px solid ${colors.stone[600]}12` }} />
            <div className="rounded-[2px] flex-[7]" style={{ height: "10px", background: `${colors.stone[600]}15`, border: `0.5px solid ${colors.stone[600]}12` }} />
            <div className="rounded-[2px] flex-[2]" style={{ height: "10px", background: `${colors.stone[600]}15`, border: `0.5px solid ${colors.stone[600]}12` }} />
          </div>

          {/* Trackpad */}
          <div
            className="mx-auto mt-5 rounded-lg"
            style={{
              width: "140px",
              height: "80px",
              background: `${colors.stone[600]}06`,
              border: `1px solid ${colors.stone[600]}14`,
            }}
          />
        </div>

        {/* ======= BASE — bottom cover (visible from below) ======= */}
        <div
          className="absolute rounded-lg"
          style={{
            width: `${SCREEN_W + 20}px`,
            height: `${BASE_DEPTH}px`,
            top: "100%",
            left: "-10px",
            transformOrigin: "center top",
            transform: "rotateX(90deg) rotateY(180deg)",
            background: `linear-gradient(180deg, #151311, #0e0d0c)`,
            border: `1.5px solid ${colors.stone[600]}20`,
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Hints */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 pt-3 pb-2 rounded-lg"
        style={{
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${colors.stone[600]}30`,
          backdropFilter: "blur(8px)",
          color: colors.chalk,
        }}
      >
        {/* Drag hint */}
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
            <path d="M4 10H16M16 10L12 6M16 10L12 14M4 10L8 6M4 10L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Drag</span>
        </div>

        <div className="w-px h-3" style={{ background: `${colors.stone[400]}40` }} />

        {/* Arrow keys hint */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-[1px]">
            <div
              className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center"
              style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}
            >
              <span className="text-[6px] leading-none">▲</span>
            </div>
            <div className="flex gap-[1px]">
              <div
                className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center"
                style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}
              >
                <span className="text-[6px] leading-none">◀</span>
              </div>
              <div
                className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center"
                style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}
              >
                <span className="text-[6px] leading-none">▼</span>
              </div>
              <div
                className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center"
                style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}
              >
                <span className="text-[6px] leading-none">▶</span>
              </div>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Play</span>
        </div>

        <div className="w-px h-3" style={{ background: `${colors.stone[400]}40` }} />

        {/* Dot buttons hint */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-[3px]">
            <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#28C840" }} />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Window</span>
        </div>
      </div>
    </div>
  );
}

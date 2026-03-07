"use client";

import { useRef, useEffect, useCallback } from "react";

const COLS = 8;
const ROWS = 12;
const STONE = "#5C514A";

// --- Piece definitions (tetromino shapes) ---
// Each cell: [rowOffset, colOffset] from piece origin
// Letters map 1:1 to cells in reading order (top-to-bottom, left-to-right)

interface PieceCell {
  dr: number;
  dc: number;
}

interface Scene {
  keyword: string;         // 4-letter word
  color: string;
  pieceCells: PieceCell[]; // 4 cells in reading order matching keyword letters
  targetRow: number;       // board row where piece origin lands
  targetCol: number;       // board col where piece origin lands
  clearRows: [number, number]; // which 2 rows get cleared
  progressStart: number;
  progressEnd: number;
}

// Board layout: 8 dense rows (4-11) with gaps shaped for each tetromino
//
// Scene 1 — AUTO drops as T-piece into rows 4-5 (top), clears 4+5
//   T-piece:  A U T    Row 4 gaps: cols 2,3,4
//               O      Row 5 gap:  col 3
//
// Scene 2 — FLOW drops as S-piece into rows 6-7, clears 6+7
//   S-piece:  _ F L    Row 6 gaps: cols 5,6
//             O W _    Row 7 gaps: cols 4,5
//
// Scene 3 — QUAL drops as L-piece into rows 8-9, clears 8+9
//   L-piece:  Q _      Row 8 gap:  col 1
//             U A L    Row 9 gaps: cols 1,2,3
//
// Scene 4 — TOOL drops as O-piece into rows 10-11, clears 10+11
//   O-piece:  T O      Row 10 gaps: cols 3,4
//             O L      Row 11 gaps: cols 3,4

const SCENES: Scene[] = [
  {
    keyword: "AUTO",
    color: "#2DD4BF",
    // T-piece: top row 3 wide, bottom row 1 center
    pieceCells: [
      { dr: 0, dc: 0 }, // A
      { dr: 0, dc: 1 }, // U
      { dr: 0, dc: 2 }, // T
      { dr: 1, dc: 1 }, // O
    ],
    targetRow: 4,
    targetCol: 2,
    clearRows: [4, 5],
    progressStart: 0.14,
    progressEnd: 0.28,
  },
  {
    keyword: "FLOW",
    color: "#2DD4BF",
    // S-piece: top-right 2, bottom-left 2
    pieceCells: [
      { dr: 0, dc: 1 }, // F
      { dr: 0, dc: 2 }, // L
      { dr: 1, dc: 0 }, // O
      { dr: 1, dc: 1 }, // W
    ],
    targetRow: 6,
    targetCol: 4,
    clearRows: [6, 7],
    progressStart: 0.30,
    progressEnd: 0.44,
  },
  {
    keyword: "QUAL",
    color: "#14B8A6",
    // L-piece: top-left 1, bottom 3 wide
    pieceCells: [
      { dr: 0, dc: 0 }, // Q
      { dr: 1, dc: 0 }, // U
      { dr: 1, dc: 1 }, // A
      { dr: 1, dc: 2 }, // L
    ],
    targetRow: 8,
    targetCol: 1,
    clearRows: [8, 9],
    progressStart: 0.46,
    progressEnd: 0.60,
  },
  {
    keyword: "TOOL",
    color: "#F59E0B",
    // O-piece: 2x2 square
    pieceCells: [
      { dr: 0, dc: 0 }, // T
      { dr: 0, dc: 1 }, // O
      { dr: 1, dc: 0 }, // O
      { dr: 1, dc: 1 }, // L
    ],
    targetRow: 10,
    targetCol: 3,
    clearRows: [10, 11],
    progressStart: 0.62,
    progressEnd: 0.76,
  },
];

// Initial board — 8 rows with gaps matching piece shapes
// Row 4:  X X _ _ _ X X X   gaps at 2,3,4 (T-piece top)
// Row 5:  X X X _ X X X X   gap at 3 (T-piece bottom)
// Row 6:  X X X X X _ _ X   gaps at 5,6 (S-piece top)
// Row 7:  X X X X _ _ X X   gaps at 4,5 (S-piece bottom)
// Row 8:  X _ X X X X X X   gap at 1 (L-piece top)
// Row 9:  X _ _ _ X X X X   gaps at 1,2,3 (L-piece bottom)
// Row 10: X X X _ _ X X X   gaps at 3,4 (O-piece top)
// Row 11: X X X _ _ X X X   gaps at 3,4 (O-piece bottom)
const INITIAL_BOARD: number[][] = (() => {
  const b: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const fillRow = (r: number, cols: number[]) => {
    for (const c of cols) b[r][c] = 1;
  };
  fillRow(4, [0, 1, 5, 6, 7]);
  fillRow(5, [0, 1, 2, 4, 5, 6, 7]);
  fillRow(6, [0, 1, 2, 3, 4, 7]);
  fillRow(7, [0, 1, 2, 3, 6, 7]);
  fillRow(8, [0, 2, 3, 4, 5, 6, 7]);
  fillRow(9, [0, 4, 5, 6, 7]);
  fillRow(10, [0, 1, 2, 5, 6, 7]);
  fillRow(11, [0, 1, 2, 5, 6, 7]);
  return b;
})();

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface WhatWeDoTetrisProps {
  progressRef: React.RefObject<number>;
}

export function WhatWeDoTetris({ progressRef }: WhatWeDoTetrisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(-1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const progress = progressRef.current ?? 0;

    if (Math.abs(progress - lastProgressRef.current) < 0.0005) return;
    lastProgressRef.current = progress;

    const container = canvas.parentElement!;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    ctx.scale(dpr, dpr);

    const hudHeight = 32; // space reserved for score HUD above board
    const cellSize = Math.floor(
      Math.min((cw - 32) / COLS, (ch - 32 - hudHeight) / ROWS)
    );
    const boardW = cellSize * COLS;
    const boardH = cellSize * ROWS;
    const boardX = Math.floor((cw - boardW) / 2);
    const boardY = Math.floor((ch - boardH - hudHeight) / 2) + hudHeight;

    // Clear
    ctx.clearRect(0, 0, cw, ch);

    // Board background
    ctx.fillStyle = "#161412";
    ctx.fillRect(boardX, boardY, boardW, boardH);

    // Grid lines
    ctx.strokeStyle = "rgba(156,142,128,0.08)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(boardX, boardY + r * cellSize);
      ctx.lineTo(boardX + boardW, boardY + r * cellSize);
      ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(boardX + c * cellSize, boardY);
      ctx.lineTo(boardX + c * cellSize, boardY + boardH);
      ctx.stroke();
    }

    // Determine which rows have been cleared so far + score
    const clearedRows = new Set<number>();
    let linesCleared = 0;
    for (const scene of SCENES) {
      if (progress < scene.progressStart) break;
      const window = scene.progressEnd - scene.progressStart;
      const localP = Math.min(1, (progress - scene.progressStart) / window);
      // Row is cleared once dissolve is done (65% of scene)
      if (localP >= 0.65) {
        clearedRows.add(scene.clearRows[0]);
        clearedRows.add(scene.clearRows[1]);
        linesCleared += 2;
      }
    }

    // Score HUD above the board — shows funnel stages lighting up
    // VIEWS → LEADS → PIPELINE → REVENUE
    const hudY = boardY - 12;
    const hudFontSize = Math.max(9, Math.floor(cellSize * 0.32));
    const stages = ["VIEWS", "LEADS", "PIPELINE", "REVENUE"];
    const stageColors = ["#5C514A", "#5C514A", "#5C514A", "#5C514A"];
    // Light up stages as lines clear
    for (let i = 0; i < Math.min(linesCleared / 2, 4); i++) {
      stageColors[i] = i === 3 ? "#F59E0B" : "#2DD4BF";
    }

    ctx.save();
    ctx.textBaseline = "bottom";
    ctx.font = `700 ${hudFontSize}px "JetBrains Mono", monospace`;

    const stageWidth = boardW / 4;
    for (let i = 0; i < stages.length; i++) {
      const sx = boardX + stageWidth * i + stageWidth / 2;
      ctx.textAlign = "center";
      ctx.fillStyle = stageColors[i];
      ctx.fillText(stages[i], sx, hudY);

      // Arrow between stages
      if (i < stages.length - 1) {
        const arrowX = boardX + stageWidth * (i + 1);
        ctx.fillStyle = "#3D3530";
        ctx.font = `400 ${hudFontSize}px "JetBrains Mono", monospace`;
        ctx.fillText("\u2192", arrowX, hudY);
        ctx.font = `700 ${hudFontSize}px "JetBrains Mono", monospace`;
      }
    }

    // Lines cleared counter — small, right-aligned below the stages
    ctx.textAlign = "right";
    ctx.fillStyle = linesCleared > 0 ? "#2DD4BF" : "#3D3530";
    ctx.font = `600 ${Math.max(8, Math.floor(cellSize * 0.25))}px "JetBrains Mono", monospace`;
    ctx.fillText(`${linesCleared}/8 LINES`, boardX + boardW, hudY - hudFontSize - 2);
    ctx.restore();

    // Draw static board cells (skip cleared rows and rows being animated)
    let activeScene: Scene | null = null;
    let activeLocalP = 0;
    for (const scene of SCENES) {
      if (progress >= scene.progressStart && progress < scene.progressEnd) {
        const window = scene.progressEnd - scene.progressStart;
        activeLocalP = (progress - scene.progressStart) / window;
        activeScene = scene;
        break;
      }
    }

    const animatingRows = activeScene ? new Set(activeScene.clearRows) : new Set<number>();

    // Draw board: all non-cleared, non-animating rows
    for (let r = 0; r < ROWS; r++) {
      if (clearedRows.has(r)) continue;
      if (animatingRows.has(r) && activeLocalP >= 0.45) continue; // flash/dissolve handles these
      for (let c = 0; c < COLS; c++) {
        if (INITIAL_BOARD[r][c]) {
          const bx = boardX + c * cellSize + 1;
          const by = boardY + r * cellSize + 1;
          ctx.strokeStyle = STONE;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
        }
      }
    }

    // Animate active scene
    if (activeScene) {
      const scene = activeScene;
      const localP = activeLocalP;

      // Sub-phase boundaries
      const DROP_END = 0.45;
      const FLASH_END = 0.65;
      // DISSOLVE_END = 1.0

      // Get absolute board positions for piece cells
      const pieceBoardCells = scene.pieceCells.map((cell, i) => ({
        row: scene.targetRow + cell.dr,
        col: scene.targetCol + cell.dc,
        letter: scene.keyword[i],
      }));

      // Find where piece needs to drop from (just above the board)
      // Piece drops from row -2 (above board) to its target
      const pieceMinRow = Math.min(...pieceBoardCells.map((c) => c.row));

      if (localP < DROP_END) {
        // --- DROP PHASE ---
        const dropP = easeOutCubic(localP / DROP_END);
        // Start from above the board, land at target
        const startRow = -3;
        const rowOffset = (startRow - pieceMinRow) * (1 - dropP);

        ctx.save();
        ctx.beginPath();
        ctx.rect(boardX, boardY, boardW, boardH);
        ctx.clip();

        for (const cell of pieceBoardCells) {
          const drawRow = cell.row + rowOffset;
          const bx = boardX + cell.col * cellSize + 1;
          const by = boardY + drawRow * cellSize + 1;

          ctx.strokeStyle = scene.color;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);

          ctx.fillStyle = scene.color;
          ctx.font = `600 ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            cell.letter,
            bx + (cellSize - 2) / 2,
            by + (cellSize - 2) / 2
          );
        }

        ctx.restore();
      } else if (localP < FLASH_END) {
        // --- FLASH PHASE ---
        const flashP = (localP - DROP_END) / (FLASH_END - DROP_END);
        const flashIntensity = Math.sin(flashP * Math.PI);

        // Build a lookup for piece cells
        const pieceLookup = new Map<string, string>();
        for (const cell of pieceBoardCells) {
          pieceLookup.set(`${cell.row},${cell.col}`, cell.letter);
        }

        // Draw both clear rows as complete with bloom
        for (const row of scene.clearRows) {
          for (let c = 0; c < COLS; c++) {
            const bx = boardX + c * cellSize + 1;
            const by = boardY + row * cellSize + 1;
            const key = `${row},${c}`;
            const isPieceCell = pieceLookup.has(key);
            const cellColor = isPieceCell ? scene.color : STONE;

            ctx.strokeStyle = cellColor;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);

            // Draw letter on piece cells
            if (isPieceCell) {
              ctx.fillStyle = scene.color;
              ctx.font = `600 ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(
                pieceLookup.get(key)!,
                bx + (cellSize - 2) / 2,
                by + (cellSize - 2) / 2
              );
            }

            // Bloom overlay
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = `rgba(255,255,255,${flashIntensity * 0.6})`;
            ctx.fillRect(bx, by, cellSize - 2, cellSize - 2);
            ctx.restore();
          }
        }
      } else {
        // --- DISSOLVE PHASE ---
        const dissolveP = (localP - FLASH_END) / (1 - FLASH_END);

        const pieceLookup = new Map<string, string>();
        for (const cell of pieceBoardCells) {
          pieceLookup.set(`${cell.row},${cell.col}`, cell.letter);
        }

        for (const row of scene.clearRows) {
          for (let c = 0; c < COLS; c++) {
            const stagger = c / COLS;
            const cellP = Math.min(
              1,
              Math.max(0, (dissolveP - stagger * 0.3) / 0.7)
            );
            const scale = 1 - cellP;
            const alpha = 1 - cellP;
            if (alpha <= 0) continue;

            const bx = boardX + c * cellSize + 1;
            const by = boardY + row * cellSize + 1;
            const w = cellSize - 2;
            const h = cellSize - 2;
            const cx = bx + w / 2;
            const cy = by + h / 2;
            const key = `${row},${c}`;
            const isPieceCell = pieceLookup.has(key);
            const cellColor = isPieceCell ? scene.color : STONE;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(cx, cy);
            ctx.scale(scale, scale);
            ctx.translate(-cx, -cy);

            ctx.strokeStyle = cellColor;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, by, w, h);

            if (isPieceCell) {
              ctx.fillStyle = scene.color;
              ctx.font = `600 ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(pieceLookup.get(key)!, bx + w / 2, by + h / 2);
            }

            ctx.restore();
          }
        }
      }
    }

    // Victory overlay — Revenue counter ticking up
    if (progress >= 0.82) {
      const overlayAlpha = Math.min(1, (progress - 0.82) / 0.03) * 0.5;
      ctx.fillStyle = `rgba(0,0,0,${overlayAlpha})`;
      ctx.fillRect(boardX, boardY, boardW, boardH);

      const textAlpha = Math.min(1, (progress - 0.83) / 0.03);
      if (textAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = textAlpha;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const cx = boardX + boardW / 2;
        const cy = boardY + boardH / 2;

        // Revenue counting up as you scroll (0.83 → 0.92)
        const countP = Math.min(1, Math.max(0, (progress - 0.83) / 0.09));
        const revenueTarget = 248000;
        const currentRevenue = Math.floor(revenueTarget * countP);
        const revenueStr = "$" + currentRevenue.toLocaleString("en-US");

        // Up arrow — grows with count
        const arrowSize = Math.floor(cellSize * (0.5 + countP * 0.3));
        ctx.fillStyle = "#2DD4BF";
        ctx.font = `bold ${arrowSize}px "JetBrains Mono", monospace`;
        ctx.fillText("\u25B2", cx, cy - cellSize * 1.8);

        // "REVENUE" label
        ctx.fillStyle = "#9C8E80";
        ctx.font = `600 ${Math.floor(cellSize * 0.4)}px "JetBrains Mono", monospace`;
        ctx.fillText("REVENUE", cx, cy - cellSize * 0.9);

        // Big dollar amount counting up
        ctx.fillStyle = "#2DD4BF";
        ctx.font = `bold ${Math.floor(cellSize * 1.1)}px "JetBrains Mono", monospace`;
        ctx.fillText(revenueStr, cx, cy);

        // Percentage increase
        const pctValue = Math.floor(340 * countP);
        ctx.fillStyle = "#F59E0B";
        ctx.font = `bold ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
        ctx.fillText(`+${pctValue}%`, cx, cy + cellSize * 1.1);

        ctx.restore();
      }
    }
  }, [progressRef]);

  useEffect(() => {
    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
}

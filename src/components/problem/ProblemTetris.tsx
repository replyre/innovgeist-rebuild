"use client";

import { useRef, useEffect, useCallback } from "react";

const COLS = 8;
const ROWS = 12;

type Cell = { color: string; letter: string } | null;

interface BlockDef {
  cells: [number, number][]; // [row, col] target positions on the board
  word: string;
  color: string;
  triggerStart: number;
  triggerEnd: number;
}

const STONE = "#5C514A";
const STONE_LIGHT = "#44393A";

// Every row keeps 1-2 gaps so lines never clear — realistic game-over stacking
// Row gaps: 11→[3,4] 10→[5] 9→[2,5] 8→[1,7] 7→[4] 6→[2,7] 5→[1,7] 4→[1,4] 3→[3,6] 2→[1,4] 1→[2,7] 0→[0,2,5,7]
const BLOCKS: BlockDef[] = [
  // --- Foundation fillers ---
  { cells: [[11,0],[11,1],[11,2],[10,0]], word: "", color: STONE, triggerStart: 0.04, triggerEnd: 0.06 },
  { cells: [[11,5],[11,6],[11,7],[10,7]], word: "", color: STONE_LIGHT, triggerStart: 0.06, triggerEnd: 0.08 },

  // === LEAK — I-piece horizontal ===
  { cells: [[10,1],[10,2],[10,3],[10,4]], word: "LEAK", color: "#2DD4BF", triggerStart: 0.08, triggerEnd: 0.18 },

  // --- Post-LEAK fillers ---
  { cells: [[10,6],[9,6],[9,7]], word: "", color: STONE, triggerStart: 0.18, triggerEnd: 0.195 },
  { cells: [[9,0],[9,1],[8,0]], word: "", color: STONE_LIGHT, triggerStart: 0.195, triggerEnd: 0.21 },
  { cells: [[9,3],[9,4],[8,4]], word: "", color: STONE, triggerStart: 0.21, triggerEnd: 0.225 },

  // === BUSY — O-piece ===
  { cells: [[8,2],[8,3],[7,2],[7,3]], word: "BUSY", color: "#F59E0B", triggerStart: 0.24, triggerEnd: 0.36 },

  // --- Post-BUSY fillers ---
  { cells: [[7,5],[8,5],[8,6]], word: "", color: STONE_LIGHT, triggerStart: 0.36, triggerEnd: 0.375 },
  { cells: [[7,0],[7,1],[6,1]], word: "", color: STONE, triggerStart: 0.375, triggerEnd: 0.39 },

  // === SILO — L-piece ===
  { cells: [[5,6],[6,6],[7,6],[7,7]], word: "SILO", color: "#14B8A6", triggerStart: 0.42, triggerEnd: 0.54 },

  // --- Post-SILO fillers ---
  { cells: [[6,3],[6,4],[5,4]], word: "", color: STONE, triggerStart: 0.54, triggerEnd: 0.555 },
  { cells: [[5,5],[6,5]], word: "", color: STONE_LIGHT, triggerStart: 0.555, triggerEnd: 0.57 },
  { cells: [[5,2],[5,3],[4,3]], word: "", color: STONE, triggerStart: 0.57, triggerEnd: 0.585 },
  { cells: [[4,5],[4,6],[4,7]], word: "", color: STONE_LIGHT, triggerStart: 0.585, triggerEnd: 0.60 },

  // === BLIND — I-piece vertical ===
  { cells: [[2,0],[3,0],[4,0],[5,0],[6,0]], word: "BLIND", color: "#FF5F57", triggerStart: 0.615, triggerEnd: 0.73 },

  // --- Rush fillers: messy stacking to the top ---
  { cells: [[4,2],[3,2],[3,1]], word: "", color: STONE, triggerStart: 0.73, triggerEnd: 0.745 },
  { cells: [[3,4],[3,5],[2,5]], word: "", color: STONE_LIGHT, triggerStart: 0.745, triggerEnd: 0.76 },
  { cells: [[3,7],[2,7],[2,6]], word: "", color: STONE, triggerStart: 0.76, triggerEnd: 0.775 },
  { cells: [[2,2],[2,3],[1,3]], word: "", color: STONE_LIGHT, triggerStart: 0.775, triggerEnd: 0.79 },
  { cells: [[1,0],[1,1],[0,1]], word: "", color: STONE, triggerStart: 0.79, triggerEnd: 0.805 },
  { cells: [[1,5],[1,6],[0,6]], word: "", color: STONE_LIGHT, triggerStart: 0.805, triggerEnd: 0.82 },
  { cells: [[0,3],[0,4],[1,4]], word: "", color: STONE, triggerStart: 0.82, triggerEnd: 0.835 },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface ProblemTetrisProps {
  progressRef: React.RefObject<number>;
}

export function ProblemTetris({ progressRef }: ProblemTetrisProps) {
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

    const cellSize = Math.floor(Math.min((cw - 32) / COLS, (ch - 32) / ROWS));
    const boardW = cellSize * COLS;
    const boardH = cellSize * ROWS;
    const boardX = Math.floor((cw - boardW) / 2);
    const boardY = Math.floor((ch - boardH) / 2);

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

    // Build board state from placed blocks and draw dropping blocks
    const board: Cell[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    for (const block of BLOCKS) {
      if (progress < block.triggerStart) continue;

      const dropProgress = Math.min(1, (progress - block.triggerStart) / (block.triggerEnd - block.triggerStart));
      const isDropping = dropProgress < 1;

      if (isDropping) {
        // Drop as a cohesive shape: all cells share the same vertical offset
        const minTargetRow = Math.min(...block.cells.map(([r]) => r));
        // Start position: entire block is above the board
        const dropDistance = minTargetRow + 4; // +4 so it starts well above
        const easedProgress = easeOutCubic(dropProgress);
        const yOffset = dropDistance * (1 - easedProgress); // offset in rows, decreases to 0

        for (let i = 0; i < block.cells.length; i++) {
          const [targetRow, col] = block.cells[i];
          const letter = block.word ? (block.word[i] || "") : "";
          const drawRow = targetRow - yOffset;

          // Clip to board area
          if (drawRow >= -0.5 && drawRow < ROWS) {
            const bx = boardX + col * cellSize + 1;
            const by = boardY + drawRow * cellSize + 1;

            ctx.save();
            ctx.beginPath();
            ctx.rect(boardX, boardY, boardW, boardH);
            ctx.clip();

            ctx.strokeStyle = block.color;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
            if (letter) {
              ctx.fillStyle = block.color;
              ctx.font = `600 ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(letter, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2);
            }
            ctx.restore();
          }
        }
      } else {
        // Fully placed — write to board
        for (let i = 0; i < block.cells.length; i++) {
          const [targetRow, col] = block.cells[i];
          const letter = block.word ? (block.word[i] || "") : "";
          board[targetRow][col] = { color: block.color, letter };
        }
      }
    }

    // Draw placed cells
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = board[r][c];
        if (cell) {
          const bx = boardX + c * cellSize + 1;
          const by = boardY + r * cellSize + 1;
          ctx.strokeStyle = cell.color;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
          if (cell.letter) {
            ctx.fillStyle = cell.color;
            ctx.font = `600 ${Math.floor(cellSize * 0.55)}px "JetBrains Mono", monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(cell.letter, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2);
          }
        }
      }
    }

    // Game over overlay — after blocks reach the very top
    if (progress >= 0.86) {
      const overlayAlpha = Math.min(1, (progress - 0.86) / 0.03) * 0.65;
      ctx.fillStyle = `rgba(0,0,0,${overlayAlpha})`;
      ctx.fillRect(boardX, boardY, boardW, boardH);

      const textAlpha = Math.min(1, (progress - 0.87) / 0.03);
      if (textAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = textAlpha;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // "GAME OVER" in red
        ctx.fillStyle = "#FF5F57";
        ctx.font = `bold ${Math.floor(cellSize * 1.1)}px "JetBrains Mono", monospace`;
        ctx.fillText("GAME OVER", boardX + boardW / 2, boardY + boardH / 2 - cellSize * 0.8);

        // Contextual subtext
        ctx.fillStyle = "#9C8E80";
        ctx.font = `500 ${Math.floor(cellSize * 0.42)}px "JetBrains Mono", monospace`;
        ctx.fillText("Broken systems stack up.", boardX + boardW / 2, boardY + boardH / 2 + cellSize * 0.3);
        ctx.fillText("Nothing clears. Growth stalls.", boardX + boardW / 2, boardY + boardH / 2 + cellSize * 1.0);

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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

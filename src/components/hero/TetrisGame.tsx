"use client";

import { useRef, useEffect, useCallback, useState, forwardRef, useImperativeHandle } from "react";

const COLS = 10;
const ROWS = 20;

type Cell = { color: string; letter: string; phrase?: string; col?: number } | null;

// Multiple words per piece — sales/web/SEO/agency themed
const PIECE_WORDS: string[][] = [
  // I (4 cells)
  ["SELL", "GROW", "LEAD", "SITE", "RANK", "DEAL", "RISE", "WINS"],
  // O (4 cells)
  ["SAAS", "SALE", "AUTO", "FLOW", "GOAL", "PLAN", "PAID", "CALL"],
  // T (4 cells)
  ["SEO", "WEB", "ADS", "ROI", "CRO", "CRM", "CTR", "KPI"],
  // S (4 cells)
  ["FUND", "APEX", "PUSH", "FAST", "BOLD", "LIFT", "SNAP", "MINT"],
  // Z (4 cells)
  ["COPY", "PAGE", "LINK", "FORM", "HOOK", "SEND", "PING", "SYNC"],
  // J (4 cells)
  ["PIPE", "SEED", "TIER", "LEAP", "EDGE", "FUEL", "GAIN", "PEAK"],
  // L (4 cells)
  ["TEAM", "SHIP", "SPIN", "FLIP", "RAMP", "HIRE", "DEMO", "PROS"],
];

function getWordForPiece(pieceIdx: number): string {
  const words = PIECE_WORDS[pieceIdx];
  return words[Math.floor(Math.random() * words.length)];
}

// Map a word's letters onto shape cells for all 4 rotations
function buildLettersForShape(shape: number[][][], word: string): string[][][] {
  const result: string[][][] = [];
  for (let rot = 0; rot < 4; rot++) {
    const s = shape[rot];
    const grid: string[][] = s.map((row) => row.map(() => ""));
    let idx = 0;
    for (let r = 0; r < s.length; r++) {
      for (let c = 0; c < s[r].length; c++) {
        if (s[r][c]) {
          grid[r][c] = word[idx % word.length] || "";
          idx++;
        }
      }
    }
    result.push(grid);
  }
  return result;
}

const PIECES: { shape: number[][][]; color: string }[] = [
  { // I
    shape: [
      [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
      [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
      [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
      [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ],
    color: "#2DD4BF",
  },
  { // O
    shape: [
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
    ],
    color: "#F59E0B",
  },
  { // T
    shape: [
      [[0,1,0],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,1],[0,1,0]],
      [[0,1,0],[1,1,0],[0,1,0]],
    ],
    color: "#14B8A6",
  },
  { // S
    shape: [
      [[0,1,1],[1,1,0],[0,0,0]],
      [[0,1,0],[0,1,1],[0,0,1]],
      [[0,0,0],[0,1,1],[1,1,0]],
      [[1,0,0],[1,1,0],[0,1,0]],
    ],
    color: "#28C840",
  },
  { // Z
    shape: [
      [[1,1,0],[0,1,1],[0,0,0]],
      [[0,0,1],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,0],[0,1,1]],
      [[0,1,0],[1,1,0],[1,0,0]],
    ],
    color: "#FF5F57",
  },
  { // J
    shape: [
      [[1,0,0],[1,1,1],[0,0,0]],
      [[0,1,1],[0,1,0],[0,1,0]],
      [[0,0,0],[1,1,1],[0,0,1]],
      [[0,1,0],[0,1,0],[1,1,0]],
    ],
    color: "#9C8E80",
  },
  { // L
    shape: [
      [[0,0,1],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,0],[0,1,1]],
      [[0,0,0],[1,1,1],[1,0,0]],
      [[1,1,0],[0,1,0],[0,1,0]],
    ],
    color: "#D4CBC1",
  },
];

interface ActivePiece {
  pieceIdx: number;
  rot: number;
  x: number;
  y: number;
  word: string;
  letters: string[][][]; // per-rotation letter grids
}

interface GameState {
  board: Cell[][];
  current: ActivePiece | null;
  next: { pieceIdx: number; word: string; letters: string[][][] };
  score: number;
  lines: number;
  level: number;
  gameOver: boolean;
}

// Scrolling marquee phrases for pre-filled rows
const PROBLEM_POOL = [
  "SLOW PIPELINE",
  "LEAKED LEADS",
  "MANUAL CRM",
  "BROKEN FUNNEL",
  "COLD OUTREACH",
  "SILOED DATA",
  "DEAD ENDS",
  "LOST REVENUE",
  "WEAK FOLLOW UP",
  "NO TRACKING",
  "MISSED LEADS",
  "DATA CHAOS",
];

const PROBLEM_COLORS = [
  "#FF5F57", "#F59E0B", "#9C8E80", "#D4CBC1", "#14B8A6", "#28C840",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createPrefilledBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const count = Math.random() < 0.5 ? 5 : 6;
  const picked = shuffle(PROBLEM_POOL).slice(0, count);

  for (let i = 0; i < count; i++) {
    const rowIdx = ROWS - count + i;
    const phrase = picked[i];
    const color = PROBLEM_COLORS[Math.floor(Math.random() * PROBLEM_COLORS.length)];

    // Pad phrase for seamless marquee looping
    const paddedPhrase = "  " + phrase + "  ";

    // Fill all 10 columns with carousel cells
    const row: Cell[] = [];
    for (let c = 0; c < COLS; c++) {
      const letter = paddedPhrase[c % paddedPhrase.length];
      row.push({ color, letter, phrase: paddedPhrase, col: c });
    }

    // Null out 1-2 random positions to create gaps (clearable)
    const gapCount = Math.random() < 0.5 ? 1 : 2;
    const gapCols = shuffle(Array.from({ length: COLS }, (_, i) => i)).slice(0, gapCount);
    for (const gc of gapCols) {
      row[gc] = null;
    }

    board[rowIdx] = row;
  }

  return board;
}

function randomPiece(): number {
  return Math.floor(Math.random() * PIECES.length);
}

function getShape(pieceIdx: number, rot: number): number[][] {
  return PIECES[pieceIdx].shape[rot];
}

function randomSpawnX(pieceIdx: number): number {
  const shapeW = getShape(pieceIdx, 0)[0].length;
  const center = Math.floor((COLS - shapeW) / 2);
  const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
  return Math.max(0, Math.min(COLS - shapeW, center + offset));
}

function spawnNext(): { pieceIdx: number; word: string; letters: string[][][] } {
  const pieceIdx = randomPiece();
  const word = getWordForPiece(pieceIdx);
  const letters = buildLettersForShape(PIECES[pieceIdx].shape, word);
  return { pieceIdx, word, letters };
}

function collides(board: Cell[][], pieceIdx: number, rot: number, px: number, py: number): boolean {
  const shape = getShape(pieceIdx, rot);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const bx = px + c;
      const by = py + r;
      if (bx < 0 || bx >= COLS || by >= ROWS) return true;
      if (by >= 0 && board[by][bx]) return true;
    }
  }
  return false;
}

function lockPiece(state: GameState): GameState {
  if (!state.current) return state;
  const { pieceIdx, rot, x, y, word, letters } = state.current;
  const shape = getShape(pieceIdx, rot);
  const letterGrid = letters[rot];
  const board = state.board.map((row) => [...row]);
  const color = PIECES[pieceIdx].color;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const by = y + r;
      const bx = x + c;
      if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
        board[by][bx] = { color, letter: letterGrid[r][c] };
      }
    }
  }

  // Clear lines
  let cleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every((cell) => cell !== null)) {
      board.splice(r, 1);
      board.unshift(Array(COLS).fill(null));
      cleared++;
      r++;
    }
  }

  const scoring = [0, 100, 300, 500, 800];
  const lines = state.lines + cleared;
  const level = Math.floor(lines / 10) + 1;
  const score = state.score + (scoring[cleared] || 0) * state.level;

  const { pieceIdx: nextIdx, word: nextWord, letters: nextLetters } = state.next;
  const spawnX = randomSpawnX(nextIdx);
  const gameOver = collides(board, nextIdx, 0, spawnX, 0);

  return {
    board,
    current: gameOver ? null : { pieceIdx: nextIdx, rot: 0, x: spawnX, y: 0, word: nextWord, letters: nextLetters },
    next: spawnNext(),
    score,
    lines,
    level,
    gameOver,
  };
}

function initState(): GameState {
  const first = spawnNext();
  const spawnX = randomSpawnX(first.pieceIdx);
  return {
    board: createPrefilledBoard(),
    current: { pieceIdx: first.pieceIdx, rot: 0, x: spawnX, y: 0, word: first.word, letters: first.letters },
    next: spawnNext(),
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
  };
}

export interface TetrisGameHandle {
  sendKey: (key: string) => void;
}

interface TetrisGameProps {
  mirrorCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export const TetrisGame = forwardRef<TetrisGameHandle, TetrisGameProps>(function TetrisGame({ mirrorCanvasRef }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState>(initState());
  const gravityRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number>(0);
  const [focused, setFocused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const drawLetter = useCallback((ctx: CanvasRenderingContext2D, letter: string, color: string, cx: number, cy: number, cellSize: number, alpha: number = 1) => {
    if (!letter) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.font = `600 ${Math.floor(cellSize * 0.7)}px "JetBrains Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, cx, cy);
    ctx.restore();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement!;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    ctx.scale(dpr, dpr);

    const state = stateRef.current;

    const cellSize = Math.floor(Math.min((cw * 0.65) / COLS, (ch - 8) / ROWS));
    const boardW = cellSize * COLS;
    const boardH = cellSize * ROWS;
    const boardX = 4;
    const boardY = Math.floor((ch - boardH) / 2);

    // Background
    ctx.fillStyle = "#0C0A09";
    ctx.fillRect(0, 0, cw, ch);

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

    // Scroll offset for carousel text in pre-filled rows
    const scrollOffset = Math.floor(Date.now() / 400);

    // Locked cells — border + text, no fill
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = state.board[r][c];
        if (cell) {
          const bx = boardX + c * cellSize + 1;
          const by = boardY + r * cellSize + 1;
          ctx.strokeStyle = cell.color;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
          const displayLetter = cell.phrase
            ? cell.phrase[(cell.col! + scrollOffset) % cell.phrase.length]
            : cell.letter;
          drawLetter(ctx, displayLetter, cell.color, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2, cellSize);
        }
      }
    }

    // Current piece
    if (state.current) {
      const { pieceIdx, rot, x, y, letters } = state.current;
      const shape = getShape(pieceIdx, rot);
      const letterGrid = letters[rot];
      const pieceColor = PIECES[pieceIdx].color;

      // Ghost piece
      let ghostY = y;
      while (!collides(state.board, pieceIdx, rot, x, ghostY + 1)) ghostY++;
      ctx.save();
      ctx.globalAlpha = 0.15;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (!shape[r][c]) continue;
          const drawY = ghostY + r;
          if (drawY >= 0) {
            const bx = boardX + (x + c) * cellSize + 1;
            const by = boardY + drawY * cellSize + 1;
            ctx.strokeStyle = pieceColor;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
            drawLetter(ctx, letterGrid[r][c], pieceColor, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2, cellSize, 1);
          }
        }
      }
      ctx.restore();

      // Active piece — border + text
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (!shape[r][c]) continue;
          const drawY = y + r;
          if (drawY >= 0) {
            const bx = boardX + (x + c) * cellSize + 1;
            const by = boardY + drawY * cellSize + 1;
            ctx.strokeStyle = pieceColor;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
            drawLetter(ctx, letterGrid[r][c], pieceColor, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2, cellSize);
          }
        }
      }
    }

    // Info panel (right side)
    const infoX = boardX + boardW + 6;

    // NEXT label
    ctx.fillStyle = "#9C8E80";
    ctx.font = `bold 7px "JetBrains Mono", monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("NEXT", infoX, boardY + 8);

    // Next piece preview — border + text
    const nextShape = getShape(state.next.pieceIdx, 0);
    const nextLetterGrid = state.next.letters[0];
    const previewCell = Math.floor(cellSize * 0.8);
    const nextColor = PIECES[state.next.pieceIdx].color;
    for (let r = 0; r < nextShape.length; r++) {
      for (let c = 0; c < nextShape[r].length; c++) {
        if (!nextShape[r][c]) continue;
        const px = infoX + c * previewCell;
        const py = boardY + 14 + r * previewCell;
        ctx.strokeStyle = nextColor;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, previewCell - 1, previewCell - 1);
        drawLetter(ctx, nextLetterGrid[r][c], nextColor, px + (previewCell - 1) / 2, py + (previewCell - 1) / 2, previewCell);
      }
    }

    // Score
    const scoreY = boardY + 14 + 5 * previewCell + 4;
    ctx.fillStyle = "#9C8E80";
    ctx.font = `bold 7px "JetBrains Mono", monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("SCORE", infoX, scoreY);
    ctx.fillStyle = "#F5F0EB";
    ctx.font = `bold 9px "JetBrains Mono", monospace`;
    ctx.fillText(`${state.score}`, infoX, scoreY + 11);

    // Level
    ctx.fillStyle = "#9C8E80";
    ctx.font = `bold 7px "JetBrains Mono", monospace`;
    ctx.fillText("LVL", infoX, scoreY + 26);
    ctx.fillStyle = "#2DD4BF";
    ctx.font = `bold 9px "JetBrains Mono", monospace`;
    ctx.fillText(`${state.level}`, infoX, scoreY + 37);

    // Lines
    ctx.fillStyle = "#9C8E80";
    ctx.font = `bold 7px "JetBrains Mono", monospace`;
    ctx.fillText("LINES", infoX, scoreY + 52);
    ctx.fillStyle = "#F5F0EB";
    ctx.font = `bold 9px "JetBrains Mono", monospace`;
    ctx.fillText(`${state.lines}`, infoX, scoreY + 63);

    // Controls instructions
    if (!state.gameOver) {
      const ctrlY = scoreY + 82;
      ctx.fillStyle = "#9C8E80";
      ctx.font = `bold 6px "JetBrains Mono", monospace`;
      ctx.fillText("CONTROLS", infoX, ctrlY);
      ctx.font = `6px "JetBrains Mono", monospace`;
      ctx.fillText("\u2190 \u2192 Move", infoX, ctrlY + 10);
      ctx.fillText("\u2191   Rotate", infoX, ctrlY + 19);
      ctx.fillText("\u2193   Soft drop", infoX, ctrlY + 28);
      ctx.fillText("SPC Hard drop", infoX, ctrlY + 37);
    }

    // Mirror only game elements (no dark bg) to background canvas
    if (mirrorCanvasRef?.current) {
      const mc = mirrorCanvasRef.current;
      const mcWidth = mc.clientWidth;
      const mcHeight = mc.clientHeight;
      if (mcWidth > 0 && mcHeight > 0) {
        mc.width = mcWidth * dpr;
        mc.height = mcHeight * dpr;
        const mctx = mc.getContext("2d");
        if (mctx) {
          mctx.clearRect(0, 0, mc.width, mc.height);
          // Scale up so cells are large (overflow clipped by CSS)
          const baseScaleX = mc.width / (boardW * dpr);
          const baseScaleY = mc.height / (boardH * dpr);
          const upscale = 1.5;
          mctx.scale(baseScaleX * dpr * upscale, baseScaleY * dpr * upscale);
          // Shift content up so bottom blocks aren't at the very edge
          mctx.translate(0, -cellSize * 7);
          // Locked cells
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              const cell = state.board[r][c];
              if (cell) {
                const bx = c * cellSize + 1;
                const by = r * cellSize + 1;
                mctx.strokeStyle = cell.color;
                mctx.lineWidth = 0.5;
                mctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
                const displayLetter = cell.phrase
                  ? cell.phrase[(cell.col! + scrollOffset) % cell.phrase.length]
                  : cell.letter;
                mctx.fillStyle = cell.color;
                mctx.font = `600 ${Math.floor(cellSize * 0.7)}px "JetBrains Mono", monospace`;
                mctx.textAlign = "center";
                mctx.textBaseline = "middle";
                if (displayLetter) mctx.fillText(displayLetter, bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2);
              }
            }
          }
          // Active piece
          if (state.current) {
            const { pieceIdx, rot, x, y, letters } = state.current;
            const sh = getShape(pieceIdx, rot);
            const lg = letters[rot];
            const pc = PIECES[pieceIdx].color;
            for (let r = 0; r < sh.length; r++) {
              for (let c = 0; c < sh[r].length; c++) {
                if (!sh[r][c]) continue;
                const dy = y + r;
                if (dy >= 0) {
                  const bx = (x + c) * cellSize + 1;
                  const by = dy * cellSize + 1;
                  mctx.strokeStyle = pc;
                  mctx.lineWidth = 0.5;
                  mctx.strokeRect(bx, by, cellSize - 2, cellSize - 2);
                  mctx.fillStyle = pc;
                  mctx.font = `600 ${Math.floor(cellSize * 0.7)}px "JetBrains Mono", monospace`;
                  mctx.textAlign = "center";
                  mctx.textBaseline = "middle";
                  if (lg[r][c]) mctx.fillText(lg[r][c], bx + (cellSize - 2) / 2, by + (cellSize - 2) / 2);
                }
              }
            }
          }
          mctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    }
  }, [drawLetter, mirrorCanvasRef]);

  const startGravity = useCallback(() => {
    if (gravityRef.current) clearInterval(gravityRef.current);
    gravityRef.current = setInterval(() => {
      const state = stateRef.current;
      if (state.gameOver || !state.current) return;
      const { pieceIdx, rot, x, y } = state.current;
      if (!collides(state.board, pieceIdx, rot, x, y + 1)) {
        state.current.y++;
      } else {
        stateRef.current = lockPiece(state);
        if (stateRef.current.gameOver) {
          setGameOver(true);
        }
      }
    }, Math.max(80, 500 / stateRef.current.level));
  }, []);

  const restart = useCallback(() => {
    stateRef.current = initState();
    setGameOver(false);
    startGravity();
    wrapperRef.current?.focus();
  }, [startGravity]);

  const stopGravity = useCallback(() => {
    if (gravityRef.current) {
      clearInterval(gravityRef.current);
      gravityRef.current = null;
    }
  }, []);

  useEffect(() => {
    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (gravityRef.current) clearInterval(gravityRef.current);
    };
  }, [draw]);

  useEffect(() => {
    const checkLevel = setInterval(() => {
      if (gravityRef.current && !stateRef.current.gameOver) {
        const speed = Math.max(80, 500 / stateRef.current.level);
        clearInterval(gravityRef.current);
        gravityRef.current = setInterval(() => {
          const state = stateRef.current;
          if (state.gameOver || !state.current) return;
          const { pieceIdx, rot, x, y } = state.current;
          if (!collides(state.board, pieceIdx, rot, x, y + 1)) {
            state.current.y++;
          } else {
            stateRef.current = lockPiece(state);
            if (stateRef.current.gameOver) {
              setGameOver(true);
            }
          }
        }, speed);
      }
    }, 2000);
    return () => clearInterval(checkLevel);
  }, []);

  const processKey = useCallback((key: string) => {
    const state = stateRef.current;
    if (state.gameOver || !state.current) return;

    const { pieceIdx, rot, x, y } = state.current;

    if (key === "a" || key === "arrowleft") {
      if (!collides(state.board, pieceIdx, rot, x - 1, y)) {
        state.current.x--;
      }
    } else if (key === "d" || key === "arrowright") {
      if (!collides(state.board, pieceIdx, rot, x + 1, y)) {
        state.current.x++;
      }
    } else if (key === "s" || key === "arrowdown") {
      if (!collides(state.board, pieceIdx, rot, x, y + 1)) {
        state.current.y++;
      }
    } else if (key === "w" || key === "arrowup") {
      const newRot = (rot + 1) % 4;
      const kicks = [0, -1, 1, -2, 2];
      for (const kick of kicks) {
        if (!collides(state.board, pieceIdx, newRot, x + kick, y)) {
          state.current.rot = newRot;
          state.current.x = x + kick;
          break;
        }
      }
    } else if (key === " ") {
      let dropY = y;
      while (!collides(state.board, pieceIdx, rot, x, dropY + 1)) dropY++;
      state.current.y = dropY;
      stateRef.current = lockPiece(state);
      if (stateRef.current.gameOver) {
        setGameOver(true);
      }
    }
  }, []);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (["a", "arrowleft", "d", "arrowright", "s", "arrowdown", "w", "arrowup", " "].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
    }
    processKey(key);
  }, [processKey]);

  useImperativeHandle(ref, () => ({
    sendKey: (key: string) => processKey(key.toLowerCase()),
  }), [processKey]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full outline-none"
      tabIndex={0}
      onKeyDown={handleKey}
      onFocus={() => {
        setFocused(true);
        if (!gameOver) startGravity();
      }}
      onBlur={() => {
        setFocused(false);
        stopGravity();
      }}
      onClick={() => {
        if (gameOver) {
          restart();
        } else {
          wrapperRef.current?.focus();
        }
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Click to play hint */}
      {!focused && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span
            className="font-mono uppercase tracking-widest text-center"
            style={{
              fontSize: "10px",
              color: "#F5F0EB",
              border: "1px solid rgba(245,240,235,0.25)",
              padding: "4px 8px",
              borderRadius: "3px",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            Click to<br />play
          </span>
        </div>
      )}

      {/* Game over overlay */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 gap-2">
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "9px", color: "#FF5F57", fontWeight: "bold" }}
          >
            Game Over
          </span>
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: "7px", color: "#9C8E80" }}
          >
            Click to restart
          </span>
        </div>
      )}
    </div>
  );
});

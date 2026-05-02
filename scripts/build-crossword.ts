#!/usr/bin/env node
/**
 * Crossword layout generator for the U27 Gazette back page.
 *
 * Edit the DE/EN word pools and `REQUIRED` set below, then run:
 *
 *   pnpm exec tsx scripts/build-crossword.ts
 *   # or
 *   node --experimental-strip-types scripts/build-crossword.ts
 *
 * The script enumerates every k-subset of the optional pool that can be
 * combined with the required anchors, runs a beam search to lay each subset
 * out, transposes any layout that comes out taller than wide, and prints
 * the best candidate per language as ready-to-paste TypeScript matching the
 * `CrosswordEntry` shape used in `src/lib/data/crossword.ts`.
 *
 * Tweak `BEAM`, `BEAM_WIDTH`, and `SEED_TRIES` for slower/better searches.
 * Defaults run in well under a minute.
 */

type Direction = 'A' | 'D';

interface Word {
  answer: string;
  clue: string;
}

interface Placed extends Word {
  row: number;
  col: number;
  dir: Direction;
}

interface State {
  cells: Map<string, string>;
  b: { minR: number; maxR: number; minC: number; maxC: number };
  placed: Placed[];
  remaining: Word[];
}

interface Layout {
  score: number;
  cells: Map<string, string>;
  b: { minR: number; maxR: number; minC: number; maxC: number };
  placed: Placed[];
}

interface NormalizedEntry {
  num: number;
  dir: 'across' | 'down';
  row: number;
  col: number;
  len: number;
  answer: string;
  clue: string;
}

interface Normalized {
  rows: number;
  cols: number;
  entries: NormalizedEntry[];
}

const BEAM = 3;
const BEAM_WIDTH = 60;
const SEED_TRIES = 5;

const REQUIRED = new Set(['KLAGENFURT', 'GAZETTE', 'STATION']);
const WORDS_PER_PUZZLE = 10;

const dePool: Word[] = [
  { answer: 'KLAGENFURT', clue: 'Hauptstadt Kärntens' },
  { answer: 'WOERTHERSEE', clue: 'See unweit der AAU' },
  { answer: 'LINDWURM', clue: 'Drachenfigur am Neuen Platz' },
  { answer: 'SERG', clue: 'Forschungsgruppe, die Station U27 betreute' },
  {
    answer: 'STATION',
    clue: 'Mitmachpunkt bei der Langen Nacht — unserer trug die Nummer 27'
  },
  { answer: 'FORSCHUNG', clue: 'Das F in LNF' },
  { answer: 'NACHT', clue: 'Das N in LNF' },
  { answer: 'GAZETTE', clue: 'Was Sie gerade lesen — die U27 ___' },
  { answer: 'BROWSER', clue: 'Programm, das jede Kreation öffnete' },
  { answer: 'HTML', clue: 'Auszeichnungssprache des Webs' },
  { answer: 'WEBSEITE', clue: 'Was am Abend rund 91 Mal entstand' },
  { answer: 'SCHLEIFE', clue: 'Programmstruktur, die sich wiederholt' },
  { answer: 'KREATION', clue: 'Index zeigt 39 davon' },
  { answer: 'TASTATUR', clue: 'Gerät mit Tasten' },
  { answer: 'LEERTASTE', clue: 'Häufigste gebundene Taste in den Kreationen' },
  { answer: 'ABEND', clue: 'Sechs Stunden Mitmachstation füllten ihn' }
];

const enPool: Word[] = [
  { answer: 'KLAGENFURT', clue: 'Capital of Carinthia' },
  { answer: 'WORTHERSEE', clue: 'Lake just outside Klagenfurt' },
  { answer: 'LINDWURM', clue: "Dragon statue on Klagenfurt's main square" },
  { answer: 'SERG', clue: 'Research group that ran Station U27' },
  { answer: 'STATION', clue: 'Hands-on point at the Long Night — ours was number 27' },
  { answer: 'RESEARCH', clue: 'Methodical pursuit of new knowledge — what AAU does year-round' },
  { answer: 'NIGHT', clue: 'The Long ___ of Research' },
  { answer: 'GAZETTE', clue: "What you're reading right now — the U27 ___" },
  { answer: 'BROWSER', clue: 'Where every creation opened' },
  { answer: 'HTML', clue: 'Web markup language' },
  { answer: 'WEBPAGE', clue: 'What got built about 91 times that evening' },
  { answer: 'LOOP', clue: 'Programming structure that repeats' },
  { answer: 'CREATION', clue: 'One of 39 in the public index' },
  { answer: 'KEYBOARD', clue: 'Has keys and sat at every workbench' },
  { answer: 'SPACEBAR', clue: 'Most-bound key across all creations' },
  { answer: 'EVENING', clue: 'Six hours of hands-on station filled it' }
];

function canPlace(
  cells: Map<string, string>,
  answer: string,
  row: number,
  col: number,
  dir: Direction
): number {
  let crossings = 0;
  for (let k = 0; k < answer.length; k++) {
    const r = dir === 'A' ? row : row + k;
    const c = dir === 'A' ? col + k : col;
    const existing = cells.get(`${r},${c}`);
    if (existing) {
      if (existing !== answer[k]) return -1;
      crossings++;
    } else if (dir === 'A') {
      if (cells.has(`${r - 1},${c}`) || cells.has(`${r + 1},${c}`)) return -1;
    } else if (cells.has(`${r},${c - 1}`) || cells.has(`${r},${c + 1}`)) {
      return -1;
    }
  }
  if (dir === 'A') {
    if (cells.has(`${row},${col - 1}`) || cells.has(`${row},${col + answer.length}`)) return -1;
  } else if (cells.has(`${row - 1},${col}`) || cells.has(`${row + answer.length},${col}`)) {
    return -1;
  }
  return crossings;
}

function placeCandidates(state: State, w: Word) {
  const { cells, b } = state;
  const cands: { row: number; col: number; dir: Direction; cross: number; score: number }[] = [];
  for (const [key, letter] of cells) {
    const [r, c] = key.split(',').map(Number);
    for (let k = 0; k < w.answer.length; k++) {
      if (w.answer[k] !== letter) continue;
      for (const dir of ['A', 'D'] as const) {
        const row = dir === 'A' ? r : r - k;
        const col = dir === 'A' ? c - k : c;
        const cross = canPlace(cells, w.answer, row, col, dir);
        if (cross > 0) {
          const lr = dir === 'A' ? row : row + w.answer.length - 1;
          const lc = dir === 'A' ? col + w.answer.length - 1 : col;
          const newH = Math.max(b.maxR, lr) - Math.min(b.minR, row) + 1;
          const newW = Math.max(b.maxC, lc) - Math.min(b.minC, col) + 1;
          const aspect = Math.min(newH, newW) / Math.max(newH, newW);
          cands.push({
            row,
            col,
            dir,
            cross,
            score: cross * 100 - newH * newW + aspect * 25
          });
        }
      }
    }
  }
  return cands.sort((a, b) => b.score - a.score);
}

function applyPlace(
  state: State,
  w: Word,
  cand: { row: number; col: number; dir: Direction }
): State {
  const cells = new Map(state.cells);
  for (let k = 0; k < w.answer.length; k++) {
    const r = cand.dir === 'A' ? cand.row : cand.row + k;
    const c = cand.dir === 'A' ? cand.col + k : cand.col;
    cells.set(`${r},${c}`, w.answer[k]);
  }
  const lr = cand.dir === 'A' ? cand.row : cand.row + w.answer.length - 1;
  const lc = cand.dir === 'A' ? cand.col + w.answer.length - 1 : cand.col;
  const b = {
    minR: Math.min(state.b.minR, cand.row),
    maxR: Math.max(state.b.maxR, lr),
    minC: Math.min(state.b.minC, cand.col),
    maxC: Math.max(state.b.maxC, lc)
  };
  return {
    cells,
    b,
    placed: [...state.placed, { ...w, row: cand.row, col: cand.col, dir: cand.dir }],
    remaining: state.remaining
  };
}

function partialScore(st: State): number {
  const h = st.b.maxR - st.b.minR + 1;
  const w = st.b.maxC - st.b.minC + 1;
  return -h * w + st.placed.length * 30;
}

function scoreFinal(st: State): number {
  const { b, cells, placed } = st;
  const h = b.maxR - b.minR + 1;
  const w = b.maxC - b.minC + 1;
  const area = h * w;
  const counts = new Map<string, number>();
  for (const p of placed) {
    for (let k = 0; k < p.answer.length; k++) {
      const r = p.dir === 'A' ? p.row : p.row + k;
      const c = p.dir === 'A' ? p.col + k : p.col;
      const key = `${r},${c}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  let crossings = 0;
  for (const v of counts.values()) if (v > 1) crossings++;
  const aspect = Math.min(h, w) / Math.max(h, w);
  const fill = cells.size / area;
  return crossings * 90 - area + aspect * 60 + fill * 500;
}

function search(words: Word[]): Layout | null {
  const sorted = [...words].sort((a, b) => b.answer.length - a.answer.length);
  let states: State[] = [];
  for (let s = 0; s < Math.min(words.length, SEED_TRIES); s++) {
    const w0 = sorted[s];
    const cells = new Map<string, string>();
    for (let k = 0; k < w0.answer.length; k++) cells.set(`0,${k}`, w0.answer[k]);
    const b = { minR: 0, maxR: 0, minC: 0, maxC: w0.answer.length - 1 };
    states.push({
      cells,
      b,
      placed: [{ ...w0, row: 0, col: 0, dir: 'A' }],
      remaining: sorted.filter((w) => w !== w0)
    });
  }
  let best: Layout | null = null;
  while (states.length > 0) {
    const next: State[] = [];
    for (const st of states) {
      if (st.remaining.length === 0) {
        const sc = scoreFinal(st);
        if (!best || sc > best.score) {
          best = { score: sc, cells: st.cells, b: st.b, placed: st.placed };
        }
        continue;
      }
      const w = st.remaining[0];
      const cands = placeCandidates(st, w);
      if (cands.length === 0) continue;
      for (const c of cands.slice(0, BEAM)) {
        const ns = applyPlace(st, w, c);
        ns.remaining = st.remaining.slice(1);
        next.push(ns);
      }
    }
    next.sort((a, b) => partialScore(b) - partialScore(a));
    states = next.slice(0, BEAM_WIDTH);
  }
  return best;
}

function combinations<T>(arr: T[], k: number): T[][] {
  const out: T[][] = [];
  const n = arr.length;
  if (k > n) return out;
  const idx = Array.from({ length: k }, (_, i) => i);
  while (true) {
    out.push(idx.map((i) => arr[i]));
    let i = k - 1;
    while (i >= 0 && idx[i] === n - k + i) i--;
    if (i < 0) break;
    idx[i]++;
    for (let j = i + 1; j < k; j++) idx[j] = idx[j - 1] + 1;
  }
  return out;
}

function normalize(layout: Layout): Normalized {
  const { placed, b } = layout;
  const off = placed.map((p) => ({
    ...p,
    row: p.row - b.minR,
    col: p.col - b.minC,
    dir: p.dir === 'A' ? 'across' : 'down'
  })) as (NormalizedEntry & { answer: string })[];
  const starts = new Map<string, { A?: NormalizedEntry; D?: NormalizedEntry }>();
  for (const p of off) {
    const k = `${p.row},${p.col}`;
    const v = starts.get(k) ?? {};
    if (p.dir === 'across') v.A = p;
    else v.D = p;
    starts.set(k, v);
  }
  const ordered = [...starts.entries()].sort((a, bb) => {
    const [ar, ac] = a[0].split(',').map(Number);
    const [br, bc] = bb[0].split(',').map(Number);
    return ar - br || ac - bc;
  });
  let n = 1;
  const entries: NormalizedEntry[] = [];
  for (const [, v] of ordered) {
    const num = n++;
    if (v.A) entries.push({ ...v.A, num, len: v.A.answer.length });
    if (v.D) entries.push({ ...v.D, num, len: v.D.answer.length });
  }
  return { rows: b.maxR - b.minR + 1, cols: b.maxC - b.minC + 1, entries };
}

function rotateIfTaller(d: Normalized): Normalized {
  if (d.cols >= d.rows) return d;
  const transposed = d.entries.map((e) => ({
    ...e,
    dir: e.dir === 'across' ? 'down' : 'across',
    row: e.col,
    col: e.row
  })) as NormalizedEntry[];
  const starts = new Map<string, { A?: NormalizedEntry; D?: NormalizedEntry }>();
  for (const e of transposed) {
    const k = `${e.row},${e.col}`;
    const v = starts.get(k) ?? {};
    if (e.dir === 'across') v.A = e;
    else v.D = e;
    starts.set(k, v);
  }
  const ordered = [...starts.entries()].sort((a, b) => {
    const [ar, ac] = a[0].split(',').map(Number);
    const [br, bc] = b[0].split(',').map(Number);
    return ar - br || ac - bc;
  });
  let n = 1;
  const out: NormalizedEntry[] = [];
  for (const [, v] of ordered) {
    const num = n++;
    if (v.A) out.push({ ...v.A, num });
    if (v.D) out.push({ ...v.D, num });
  }
  return { rows: d.cols, cols: d.rows, entries: out };
}

function render(d: Normalized): string {
  const grid: string[][] = [];
  for (let r = 0; r < d.rows; r++) grid.push(Array(d.cols).fill('.'));
  for (const e of d.entries) {
    for (let i = 0; i < e.len; i++) {
      const r = e.dir === 'across' ? e.row : e.row + i;
      const c = e.dir === 'across' ? e.col + i : e.col;
      grid[r][c] = e.answer[i];
    }
  }
  return grid.map((row) => row.join(' ')).join('\n');
}

function asTypescript(d: Normalized, varName: string): string {
  const lines: string[] = [];
  lines.push(`export const ${varName}: CrosswordData = {`);
  lines.push(`\trows: ${d.rows},`);
  lines.push(`\tcols: ${d.cols},`);
  lines.push(`\tentries: [`);
  for (const [i, e] of d.entries.entries()) {
    const trail = i < d.entries.length - 1 ? ',' : '';
    const clue = e.clue.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    lines.push(`\t\t{`);
    lines.push(`\t\t\tnum: ${e.num},`);
    lines.push(`\t\t\tdir: '${e.dir}',`);
    lines.push(`\t\t\trow: ${e.row},`);
    lines.push(`\t\t\tcol: ${e.col},`);
    lines.push(`\t\t\tlen: ${e.len},`);
    lines.push(`\t\t\tanswer: '${e.answer}',`);
    lines.push(`\t\t\tclue: '${clue}'`);
    lines.push(`\t\t}${trail}`);
  }
  lines.push(`\t]`);
  lines.push(`};`);
  return lines.join('\n');
}

function findBest(pool: Word[], label: string) {
  const required = pool.filter((w) => REQUIRED.has(w.answer));
  const optional = pool.filter((w) => !REQUIRED.has(w.answer));
  const k = WORDS_PER_PUZZLE - required.length;
  const combos = combinations(optional, k);
  let bestNorm: Normalized | null = null;
  let bestScore = -Infinity;
  let bestWords: Word[] | null = null;
  const t0 = Date.now();
  for (const sub of combos) {
    const words = [...required, ...sub];
    const r = search(words);
    if (!r) continue;
    if (r.score > bestScore) {
      bestScore = r.score;
      bestNorm = rotateIfTaller(normalize(r));
      bestWords = words;
    }
  }
  const ms = Date.now() - t0;
  console.log(
    `${label}: tried ${combos.length} subsets in ${ms} ms, best ${bestNorm?.rows}×${bestNorm?.cols}`
  );
  return { norm: bestNorm!, words: bestWords! };
}

const de = findBest(dePool, 'DE');
const en = findBest(enPool, 'EN');

console.log('\n=== DE words:', de.words.map((w) => w.answer).join(', '));
console.log(render(de.norm));
console.log('\n=== EN words:', en.words.map((w) => w.answer).join(', '));
console.log(render(en.norm));

console.log('\n--- ready-to-paste TypeScript ---\n');
console.log(asTypescript(de.norm, 'crosswordDe'));
console.log();
console.log(asTypescript(en.norm, 'crosswordEn'));

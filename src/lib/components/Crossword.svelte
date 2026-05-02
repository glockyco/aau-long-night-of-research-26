<script lang="ts">
  import {
    crosswordDe,
    crosswordEn,
    type CrosswordData,
    type CrosswordEntry
  } from '$lib/data/crossword';
  import type { Dict, Lang } from '$lib/i18n';
  import { SvelteMap } from 'svelte/reactivity';
  import SectionKicker from './SectionKicker.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();

  const data = $derived<CrosswordData>(lang === 'de' ? crosswordDe : crosswordEn);
  const sectionPage = $derived(dict.hero.contents[5]?.page);

  type CellInfo = {
    row: number;
    col: number;
    expected: string;
    num?: number;
    acrossNum?: number;
    downNum?: number;
  };

  const cellInfo = $derived.by(() => {
    const map = new SvelteMap<string, CellInfo>();
    for (const e of data.entries) {
      for (let i = 0; i < e.len; i++) {
        const r = e.dir === 'across' ? e.row : e.row + i;
        const c = e.dir === 'across' ? e.col + i : e.col;
        const key = `${r},${c}`;
        const existing = map.get(key) ?? { row: r, col: c, expected: e.answer[i] };
        if (e.dir === 'across') existing.acrossNum = e.num;
        else existing.downNum = e.num;
        map.set(key, existing);
      }
    }
    for (const e of data.entries) {
      const cell = map.get(`${e.row},${e.col}`);
      if (cell && (cell.num == null || e.num < cell.num)) cell.num = e.num;
    }
    return map;
  });

  let inputs = $state<Record<string, string>>({});
  let activeNum = $state<number>(1);
  let activeDir = $state<'across' | 'down'>('across');
  let revealed = $state(false);
  let pointerOnFocused = false;

  $effect(() => {
    void data;
    inputs = {};
    revealed = false;
    const first = data.entries[0];
    if (first) {
      activeNum = first.num;
      activeDir = first.dir;
    }
  });

  const activeEntry = $derived(
    data.entries.find((e) => e.num === activeNum && e.dir === activeDir) ?? data.entries[0]
  );

  function entryCells(e: CrosswordEntry): string[] {
    const out: string[] = [];
    for (let i = 0; i < e.len; i++) {
      const r = e.dir === 'across' ? e.row : e.row + i;
      const c = e.dir === 'across' ? e.col + i : e.col;
      out.push(`${r},${c}`);
    }
    return out;
  }

  const activeCellSet = $derived(new Set(entryCells(activeEntry)));

  const solved = $derived.by(() => {
    if (cellInfo.size === 0) return false;
    for (const [key, info] of cellInfo) {
      if ((inputs[key] ?? '').toUpperCase() !== info.expected) return false;
    }
    return true;
  });

  function cellId(r: number, c: number): string {
    return `xc-${lang}-${r}-${c}`;
  }

  function focusCell(r: number, c: number) {
    const el = document.getElementById(cellId(r, c)) as HTMLInputElement | null;
    el?.focus();
    el?.select();
  }

  function setActiveFromCell(r: number, c: number, preferDir?: 'across' | 'down') {
    const info = cellInfo.get(`${r},${c}`);
    if (!info) return;
    let dir = preferDir ?? activeDir;
    if (dir === 'across' && info.acrossNum == null) dir = 'down';
    if (dir === 'down' && info.downNum == null) dir = 'across';
    activeDir = dir;
    const num = dir === 'across' ? info.acrossNum : info.downNum;
    if (num != null) activeNum = num;
  }

  function nextCellInDir(
    r: number,
    c: number,
    dir: 'across' | 'down',
    step = 1
  ): { r: number; c: number } | null {
    const nr = dir === 'across' ? r : r + step;
    const nc = dir === 'across' ? c + step : c;
    return cellInfo.has(`${nr},${nc}`) ? { r: nr, c: nc } : null;
  }

  function onPointerDownCell(r: number, c: number) {
    pointerOnFocused = document.activeElement?.id === cellId(r, c);
  }

  function onClickCell(r: number, c: number) {
    const info = cellInfo.get(`${r},${c}`);
    if (!info) return;
    if (pointerOnFocused && info.acrossNum != null && info.downNum != null) {
      activeDir = activeDir === 'across' ? 'down' : 'across';
    }
    setActiveFromCell(r, c, activeDir);
    pointerOnFocused = false;
  }

  function onFocusCell(r: number, c: number) {
    setActiveFromCell(r, c);
    const el = document.getElementById(cellId(r, c)) as HTMLInputElement | null;
    el?.select();
  }

  function onInputCell(r: number, c: number, ev: Event) {
    const target = ev.target as HTMLInputElement;
    const raw = target.value.toUpperCase().replace(/[^A-Z]/g, '');
    const letter = raw.slice(-1);
    const key = `${r},${c}`;
    inputs[key] = letter;
    target.value = letter;
    if (letter) {
      const next = nextCellInDir(r, c, activeDir, 1);
      if (next) focusCell(next.r, next.c);
    }
  }

  function onKeydownCell(r: number, c: number, ev: KeyboardEvent) {
    const key = `${r},${c}`;
    const info = cellInfo.get(key);
    switch (ev.key) {
      case 'Backspace': {
        if (!inputs[key]) {
          const prev = nextCellInDir(r, c, activeDir, -1);
          if (prev) {
            inputs[`${prev.r},${prev.c}`] = '';
            focusCell(prev.r, prev.c);
          }
        } else {
          inputs[key] = '';
        }
        ev.preventDefault();
        break;
      }
      case 'Delete': {
        inputs[key] = '';
        ev.preventDefault();
        break;
      }
      case 'ArrowRight':
      case 'ArrowLeft': {
        if (activeDir !== 'across') {
          activeDir = 'across';
          if (info?.acrossNum != null) activeNum = info.acrossNum;
        } else {
          const step = ev.key === 'ArrowRight' ? 1 : -1;
          const n = nextCellInDir(r, c, 'across', step);
          if (n) focusCell(n.r, n.c);
        }
        ev.preventDefault();
        break;
      }
      case 'ArrowDown':
      case 'ArrowUp': {
        if (activeDir !== 'down') {
          activeDir = 'down';
          if (info?.downNum != null) activeNum = info.downNum;
        } else {
          const step = ev.key === 'ArrowDown' ? 1 : -1;
          const n = nextCellInDir(r, c, 'down', step);
          if (n) focusCell(n.r, n.c);
        }
        ev.preventDefault();
        break;
      }
      case ' ': {
        if (info && info.acrossNum != null && info.downNum != null) {
          activeDir = activeDir === 'across' ? 'down' : 'across';
          const num = activeDir === 'across' ? info.acrossNum : info.downNum;
          if (num != null) activeNum = num;
        }
        ev.preventDefault();
        break;
      }
      case 'Tab': {
        const linear = [
          ...data.entries.filter((x) => x.dir === 'across').sort((a, b) => a.num - b.num),
          ...data.entries.filter((x) => x.dir === 'down').sort((a, b) => a.num - b.num)
        ];
        const cur = linear.findIndex((x) => x.num === activeNum && x.dir === activeDir);
        const offset = ev.shiftKey ? -1 : 1;
        const target = linear[(cur + offset + linear.length) % linear.length];
        if (target) {
          activeNum = target.num;
          activeDir = target.dir;
          focusCell(target.row, target.col);
        }
        ev.preventDefault();
        break;
      }
      case 'Enter': {
        ev.preventDefault();
        break;
      }
    }
  }

  function focusEntry(entry: CrosswordEntry) {
    activeNum = entry.num;
    activeDir = entry.dir;
    focusCell(entry.row, entry.col);
  }

  function reveal() {
    const next: Record<string, string> = {};
    for (const [key, info] of cellInfo) next[key] = info.expected;
    inputs = next;
    revealed = true;
  }

  function reset() {
    inputs = {};
    revealed = false;
  }

  const acrossClues = $derived(
    data.entries.filter((e) => e.dir === 'across').sort((a, b) => a.num - b.num)
  );
  const downClues = $derived(
    data.entries.filter((e) => e.dir === 'down').sort((a, b) => a.num - b.num)
  );

  const rowsArray = $derived(Array.from({ length: data.rows }, (_, i) => i));
  const colsArray = $derived(Array.from({ length: data.cols }, (_, i) => i));
</script>

<section class="section" id="crossword">
  <div class="container">
    <SectionKicker section="§ 6" label={dict.crossword.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.crossword.heading}</h2>
    </div>

    <p class="cw-intro">{dict.crossword.intro}</p>

    <div class="cw-board">
      <div class="cw-grid-wrap">
        <div
          class="cw-grid"
          style="--cols: {data.cols}; --rows: {data.rows};"
          role="grid"
          aria-label={dict.crossword.sectionLabel}
        >
          {#each rowsArray as r (r)}
            {#each colsArray as c (c)}
              {@const info = cellInfo.get(`${r},${c}`)}
              {#if info}
                <div
                  class="cw-cell"
                  class:cw-active={activeCellSet.has(`${r},${c}`)}
                  role="gridcell"
                >
                  {#if info.num != null}
                    <span class="cw-num" aria-hidden="true">{info.num}</span>
                  {/if}
                  <input
                    id={cellId(r, c)}
                    class="cw-input"
                    class:cw-revealed={revealed}
                    type="text"
                    inputmode="text"
                    autocomplete="off"
                    autocapitalize="characters"
                    spellcheck="false"
                    maxlength="1"
                    aria-label={dict.crossword.cellAriaLabel}
                    value={inputs[`${r},${c}`] ?? ''}
                    oninput={(ev) => onInputCell(r, c, ev)}
                    onkeydown={(ev) => onKeydownCell(r, c, ev)}
                    onfocus={() => onFocusCell(r, c)}
                    onpointerdown={() => onPointerDownCell(r, c)}
                    onclick={() => onClickCell(r, c)}
                  />
                </div>
              {:else}
                <div class="cw-void" aria-hidden="true"></div>
              {/if}
            {/each}
          {/each}
        </div>
      </div>

      <div class="cw-clues">
        <div class="cw-clue-col">
          <h3>{dict.crossword.acrossLabel}</h3>
          <ol>
            {#each acrossClues as entry (entry.num)}
              <li>
                <button
                  type="button"
                  class="cw-clue-btn"
                  class:cw-clue-active={activeNum === entry.num && activeDir === 'across'}
                  onclick={() => focusEntry(entry)}
                >
                  <span class="cw-clue-num">{entry.num}.</span>
                  <span class="cw-clue-text">{entry.clue}</span>
                </button>
              </li>
            {/each}
          </ol>
        </div>
        <div class="cw-clue-col">
          <h3>{dict.crossword.downLabel}</h3>
          <ol>
            {#each downClues as entry (entry.num)}
              <li>
                <button
                  type="button"
                  class="cw-clue-btn"
                  class:cw-clue-active={activeNum === entry.num && activeDir === 'down'}
                  onclick={() => focusEntry(entry)}
                >
                  <span class="cw-clue-num">{entry.num}.</span>
                  <span class="cw-clue-text">{entry.clue}</span>
                </button>
              </li>
            {/each}
          </ol>
        </div>
      </div>
    </div>

    <div class="cw-toolbar">
      {#if revealed}
        <button type="button" class="cw-btn" onclick={reset}
          >{dict.crossword.hideAnswersLabel}</button
        >
      {:else}
        <button type="button" class="cw-btn" onclick={reveal}>{dict.crossword.revealLabel}</button>
      {/if}
      <button type="button" class="cw-btn cw-btn-ghost" onclick={reset}
        >{dict.crossword.resetLabel}</button
      >
      {#if solved}
        <span class="cw-status" role="status">{dict.crossword.successLabel}</span>
      {/if}
    </div>
  </div>
</section>

<style>
  .section-title-row {
    padding: 0.84rem 0 0.7rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .cw-intro {
    margin: 0.9rem 0 1.4rem;
    color: var(--fg-muted);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .cw-board {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .cw-grid-wrap {
    overflow-x: auto;
    max-width: 100%;
    padding: 0.4rem;
    margin: 0 -0.4rem;
  }

  .cw-grid {
    --cell: clamp(28px, 4.4vw, 42px);
    display: grid;
    grid-template-columns: repeat(var(--cols), var(--cell));
    grid-auto-rows: var(--cell);
    width: max-content;
    margin: 0 auto;
    border: 1.5px solid var(--fg);
    background: var(--fg);
  }

  .cw-cell {
    position: relative;
    background: var(--surface);
    border-right: 1px solid var(--fg);
    border-bottom: 1px solid var(--fg);
  }

  .cw-cell.cw-active {
    background: var(--surface-2);
  }

  .cw-void {
    background: var(--fg);
  }

  .cw-num {
    position: absolute;
    top: 1px;
    left: 2px;
    color: var(--fg);
    font-family: var(--font-sans);
    font-size: calc(var(--cell) * 0.32);
    font-weight: 600;
    line-height: 1;
    pointer-events: none;
  }

  .cw-input {
    appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: calc(var(--cell) * 0.6);
    font-weight: 600;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    caret-color: var(--accent);
  }

  .cw-input:focus {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    background: rgba(122, 29, 29, 0.12);
  }

  .cw-input.cw-revealed {
    color: var(--accent);
  }

  .cw-clues {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.2rem;
    min-width: 0;
  }

  .cw-clue-col h3 {
    margin: 0 0 0.5rem;
    padding-bottom: 0.32rem;
    border-bottom: 1px solid var(--fg);
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .cw-clue-col ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cw-clue-col li + li {
    border-top: 1px dotted var(--hair);
  }

  .cw-clue-btn {
    display: grid;
    grid-template-columns: 1.8rem minmax(0, 1fr);
    gap: 0.4rem;
    width: 100%;
    padding: 0.32rem 0.2rem;
    border: 0;
    background: transparent;
    color: var(--fg);
    font-family: inherit;
    font-size: 0.88rem;
    line-height: 1.4;
    text-align: left;
    cursor: pointer;
  }

  .cw-clue-num {
    color: var(--fg-muted);
    font-feature-settings: 'tnum';
    font-weight: 600;
    text-align: right;
  }

  .cw-clue-text {
    min-width: 0;
  }

  .cw-clue-btn:hover {
    background: rgba(122, 29, 29, 0.05);
  }

  .cw-clue-btn.cw-clue-active {
    background: rgba(122, 29, 29, 0.12);
    color: var(--fg);
  }

  .cw-clue-btn.cw-clue-active .cw-clue-num {
    color: var(--accent);
  }

  .cw-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 0.9rem;
    align-items: center;
    margin-top: 1.3rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--hair);
  }

  .cw-btn {
    padding: 0.42rem 0.85rem;
    border: 1px solid var(--fg);
    background: var(--fg);
    color: var(--surface);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .cw-btn:hover,
  .cw-btn:focus-visible {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--surface);
  }

  .cw-btn-ghost {
    background: transparent;
    color: var(--fg);
  }

  .cw-btn-ghost:hover,
  .cw-btn-ghost:focus-visible {
    background: var(--surface-2);
    border-color: var(--fg);
    color: var(--fg);
  }

  .cw-status {
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-style: italic;
  }

  @media (min-width: 720px) {
    .cw-clues {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 2rem;
    }
  }

  @media (max-width: 560px) {
    .cw-grid {
      --cell: clamp(20px, 5.4vw, 28px);
    }

    .cw-clue-btn {
      grid-template-columns: 1.5rem minmax(0, 1fr);
      padding: 0.36rem 0.1rem;
      font-size: 0.86rem;
    }
  }
</style>

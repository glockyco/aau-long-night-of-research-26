<script lang="ts">
  import {
    crosswordDe,
    crosswordEn,
    type CrosswordData,
    type CrosswordEntry
  } from '$lib/data/crossword';
  import type { Dict, Lang } from '$lib/i18n';
  import { SvelteMap, SvelteSet } from 'svelte/reactivity';
  import SectionKicker from './SectionKicker.svelte';
  import { formatPage, pageNumbers } from '$lib/state/page-numbers.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();

  const data = $derived<CrosswordData>(lang === 'de' ? crosswordDe : crosswordEn);
  const sectionPage = $derived(formatPage(dict.hero.pageLabelTemplate, pageNumbers.crossword));

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
  let revealedCells = new SvelteSet<string>();
  let pointerOnFocused = false;

  $effect(() => {
    void data;
    inputs = {};
    revealedCells.clear();
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
    for (const [key, info] of cellInfo) {
      inputs[key] = info.expected;
      revealedCells.add(key);
    }
  }

  function revealWord() {
    if (!activeEntry) return;
    for (let i = 0; i < activeEntry.len; i++) {
      const r = activeEntry.dir === 'across' ? activeEntry.row : activeEntry.row + i;
      const c = activeEntry.dir === 'across' ? activeEntry.col + i : activeEntry.col;
      const key = `${r},${c}`;
      const info = cellInfo.get(key);
      if (!info) continue;
      inputs[key] = info.expected;
      revealedCells.add(key);
    }
  }

  function reset() {
    inputs = {};
    revealedCells.clear();
  }

  const acrossClues = $derived(
    data.entries.filter((e) => e.dir === 'across').sort((a, b) => a.num - b.num)
  );
  const downClues = $derived(
    data.entries.filter((e) => e.dir === 'down').sort((a, b) => a.num - b.num)
  );

  const clueColumns = $derived.by(() => {
    const across = {
      dir: 'across' as const,
      label: dict.crossword.acrossLabel,
      clues: acrossClues
    };
    const down = { dir: 'down' as const, label: dict.crossword.downLabel, clues: downClues };
    const acrossFirst = (across.clues[0]?.num ?? Infinity) <= (down.clues[0]?.num ?? Infinity);
    return acrossFirst ? [across, down] : [down, across];
  });

  const keywordIndexByCell = $derived.by(() => {
    const m = new SvelteMap<string, number>();
    for (const cell of data.keyword.cells) {
      m.set(`${cell.row},${cell.col}`, cell.index);
    }
    return m;
  });

  const keywordSlots = $derived.by(() => {
    const ordered = [...data.keyword.cells].sort((a, b) => a.index - b.index);
    return ordered.map((cell) => {
      const key = `${cell.row},${cell.col}`;
      const expected = cellInfo.get(key)?.expected ?? '';
      const typed = (inputs[key] ?? '').toUpperCase();
      return {
        index: cell.index,
        expected,
        typed,
        correct: expected !== '' && typed === expected
      };
    });
  });

  const keywordSolved = $derived(keywordSlots.length > 0 && keywordSlots.every((s) => s.correct));

  const rowsArray = $derived(Array.from({ length: data.rows }, (_, i) => i));
  const colsArray = $derived(Array.from({ length: data.cols }, (_, i) => i));
</script>

<section class="section" id="crossword">
  <div class="container">
    <SectionKicker section="§ 5" label={dict.crossword.sectionLabel} page={sectionPage} />

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
              {@const keyIdx = keywordIndexByCell.get(`${r},${c}`)}
              {#if info}
                <div
                  class="cw-cell"
                  class:cw-active={activeCellSet.has(`${r},${c}`)}
                  class:cw-keyword-cell={keyIdx != null}
                  role="gridcell"
                >
                  {#if info.num != null}
                    <span class="cw-num" aria-hidden="true">{info.num}</span>
                  {/if}
                  {#if keyIdx != null}
                    <span class="cw-key-badge" aria-hidden="true">{keyIdx}</span>
                  {/if}
                  <input
                    id={cellId(r, c)}
                    class="cw-input"
                    class:cw-revealed={revealedCells.has(`${r},${c}`)}
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

      <div class="cw-keyword" aria-label={dict.crossword.keywordLabel}>
        <span class="cw-keyword-label">{dict.crossword.keywordLabel}</span>
        <ol class="cw-keyword-track">
          {#each keywordSlots as slot (slot.index)}
            <li
              class="cw-keyword-slot"
              class:cw-keyword-correct={slot.correct}
              class:cw-keyword-filled={slot.typed !== ''}
            >
              <span class="cw-keyword-index" aria-hidden="true">{slot.index}</span>
              <span class="cw-keyword-letter">{slot.typed}</span>
            </li>
          {/each}
        </ol>
        {#if keywordSolved}
          <span class="cw-keyword-success" role="status">
            {dict.crossword.keywordSolvedLabel}
          </span>
        {/if}
      </div>
      <div class="cw-clues">
        {#each clueColumns as col (col.dir)}
          <div class="cw-clue-col">
            <h3>{col.label}</h3>
            <ol>
              {#each col.clues as entry (entry.num)}
                <li>
                  <button
                    type="button"
                    class="cw-clue-btn"
                    class:cw-clue-active={activeNum === entry.num && activeDir === col.dir}
                    onclick={() => focusEntry(entry)}
                  >
                    <span class="cw-clue-num">{entry.num}.</span>
                    <span class="cw-clue-text">{entry.clue}</span>
                  </button>
                </li>
              {/each}
            </ol>
          </div>
        {/each}
      </div>
    </div>

    <div class="cw-toolbar">
      <button type="button" class="cw-btn cw-btn-ghost" onclick={revealWord}
        >{dict.crossword.revealWordLabel}</button
      >
      <button type="button" class="cw-btn cw-btn-ghost" onclick={reveal}
        >{dict.crossword.revealAllLabel}</button
      >
      <button type="button" class="cw-btn cw-btn-ghost" onclick={reset}
        >{dict.crossword.resetLabel}</button
      >
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

  .cw-cell.cw-keyword-cell:not(.cw-active) {
    background: #ead9cf;
  }

  .cw-key-badge {
    position: absolute;
    top: 1px;
    right: 1px;
    display: grid;
    place-items: center;
    width: calc(var(--cell) * 0.34);
    height: calc(var(--cell) * 0.34);
    border-radius: 50%;
    background: var(--accent);
    color: var(--surface);
    font-family: var(--font-sans);
    font-size: calc(var(--cell) * 0.22);
    font-weight: 700;
    line-height: 1;
    pointer-events: none;
    z-index: 1;
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

  .cw-keyword {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.85rem;
    padding-top: 0.2rem;
  }

  .cw-keyword-label {
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .cw-keyword-track {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cw-keyword-slot {
    position: relative;
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border: 1.5px solid var(--fg);
    background: var(--surface);
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .cw-keyword-slot.cw-keyword-filled:not(.cw-keyword-correct) {
    color: var(--fg-muted);
  }

  .cw-keyword-slot.cw-keyword-correct {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--surface);
  }

  .cw-keyword-index {
    position: absolute;
    top: 1px;
    left: 3px;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.55rem;
    font-weight: 600;
    line-height: 1;
  }

  .cw-keyword-slot.cw-keyword-correct .cw-keyword-index {
    color: rgba(243, 238, 226, 0.78);
  }

  .cw-keyword-letter {
    line-height: 1;
  }

  .cw-keyword-success {
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-style: italic;
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

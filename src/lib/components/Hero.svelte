<script lang="ts">
  import type { Dict } from '$lib/i18n';

  let { dict }: { dict: Dict } = $props();

  const sectionAnchors = ['#station', '#creations', '#tasks', '#how', '#team'];

  const rhythmHours = [
    { hour: 17, saves: 22 },
    { hour: 18, saves: 19 },
    { hour: 19, saves: 15 },
    { hour: 20, saves: 17 },
    { hour: 21, saves: 9 },
    { hour: 22, saves: 9 }
  ];
  const rhythmMax = Math.max(...rhythmHours.map((r) => r.saves));
</script>

<section class="hero">
  <div class="container front-page">
    <article class="lede">
      <p class="section-label">{dict.hero.kicker}</p>
      <h1>
        {#each dict.hero.headlineLines as line (line)}<span>{line}</span>{/each}
      </h1>
      <p class="deck">{dict.hero.deck}</p>
      <div class="lede-spacer" aria-hidden="true"></div>
      <div class="facts" aria-label={dict.hero.metaWhen}>
        {#each dict.hero.facts as fact (fact.label)}
          <div class="fact">
            <b>
              <span class="fact-value">{fact.value}</span>
              {#if fact.swatch}
                <span class="fact-swatch" style="background: {fact.swatch}" aria-hidden="true"
                ></span>
              {:else if fact.keycap}
                <kbd class="fact-keycap">{fact.keycap}</kbd>
              {/if}
            </b>
            <span>{fact.label}</span>
          </div>
        {/each}
      </div>
    </article>

    <aside class="rail">
      <section class="rail-block contents" aria-labelledby="contents-title">
        <h2 id="contents-title">{dict.hero.contentsLabel}</h2>
        <ol>
          {#each dict.hero.contents as item, index (item.label)}
            <li>
              <a class="contents-row" href={sectionAnchors[index] ?? '#'}>
                <span class="contents-no">{String(index + 1).padStart(2, '0')}</span>
                <span class="contents-title">{item.label}</span>
                <span class="page-no">{item.page}</span>
              </a>
            </li>
          {/each}
        </ol>
      </section>

      <div class="rail-spacer" aria-hidden="true"></div>

      <section class="rail-block rhythm" aria-labelledby="rhythm-title">
        <h2 id="rhythm-title">{dict.hero.rhythmLabel}</h2>
        <ol class="rhythm-rows" aria-label={dict.hero.rhythmAxisLabel}>
          {#each rhythmHours as row (row.hour)}
            <li>
              <span class="rhythm-hour">{row.hour}h</span>
              <span
                class="rhythm-bar"
                style="--w: {(row.saves / rhythmMax) * 100}%"
                aria-hidden="true"
              ></span>
              <span class="rhythm-count">{row.saves}</span>
            </li>
          {/each}
        </ol>
      </section>
    </aside>
  </div>
</section>

<style>
  .hero {
    padding: 1.45rem 0 0;
  }

  .front-page {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: clamp(1.35rem, 3vw, 2.6rem);
    padding-bottom: 2.15rem;
    border-bottom: 1px solid var(--fg);
  }

  .lede {
    display: flex;
    flex-direction: column;
    grid-column: span 8;
    min-width: 0;
  }

  .lede-spacer {
    flex: 1 0 1.45rem;
  }

  .section-label {
    margin-bottom: 0.65rem;
    color: var(--accent);
  }

  h1 {
    max-width: 820px;
    margin-bottom: 1rem;
    font-size: clamp(2.35rem, 5.15vw, 4.35rem);
    letter-spacing: -0.018em;
    line-height: 1.25;
  }

  h1 span {
    display: block;
  }

  .deck {
    max-width: 70ch;
    color: #2a241e;
    font-size: clamp(1.08rem, 1.7vw, 1.3rem);
    line-height: 1.42;
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 0.95rem 0 0.78rem;
    border-top: 1px solid var(--hair);
    border-bottom: 1px solid var(--hair);
  }

  .fact b {
    display: flex;
    align-items: center;
    gap: 0.32em;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: clamp(1.65rem, 2.8vw, 2.35rem);
    font-weight: 700;
    line-height: 1;
  }

  .fact-swatch {
    display: inline-block;
    width: 0.62em;
    height: 0.62em;
    border: 1px solid var(--border);
    border-radius: 0.12em;
  }

  .fact-keycap {
    display: inline-block;
    min-width: 1.1em;
    padding: 0.08em 0.3em 0.04em;
    border: 1px solid var(--fg);
    border-bottom-width: 2px;
    border-radius: 0.22em;
    background: var(--surface);
    color: var(--fg);
    font-family: var(--font-sans);
    font-size: 0.6em;
    font-weight: 600;
    line-height: 1;
    text-align: center;
  }

  .fact > span {
    display: block;
    margin-top: 0.32rem;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .rail {
    display: flex;
    flex-direction: column;
    grid-column: 9 / -1;
  }

  .rail-spacer {
    flex: 1 0 1.4rem;
  }

  .rail-block {
    padding: 0.82rem 0 0.35rem;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--fg);
  }

  .rail-block h2 {
    margin-bottom: 0.75rem;
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .rhythm-rows {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rhythm-rows li {
    display: grid;
    grid-template-columns: 2.4em minmax(0, 1fr) auto;
    gap: 0.7rem;
    align-items: center;
    padding: 0.32rem 0;
    border-bottom: 1px dotted var(--border);
  }

  .rhythm-rows li:last-child {
    border-bottom: 0;
  }

  .rhythm-hour {
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
  }

  .rhythm-bar {
    display: block;
    width: var(--w);
    min-width: 2px;
    height: 0.5em;
    background: var(--accent);
  }

  .rhythm-count {
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .contents ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .contents li {
    padding: 0;
    border-bottom: 1px dotted var(--border);
    line-height: 1.3;
  }

  .contents li:last-child {
    border-bottom: 0;
  }

  .contents-row {
    display: grid;
    grid-template-columns: 2.4em minmax(0, 1fr) auto;
    gap: 0.7rem;
    align-items: baseline;
    padding: 0.32rem 0;
    color: inherit;
    text-decoration: none;
  }

  .contents-row:hover .contents-title,
  .contents-row:focus-visible .contents-title {
    color: var(--accent);
  }

  .contents-title {
    overflow: hidden;
    font-size: 1.06rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .contents-no,
  .page-no {
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .contents-no {
    color: var(--accent);
  }

  .page-no {
    font-family: var(--font-mono);
  }

  @media (max-width: 900px) {
    .front-page {
      grid-template-columns: 1fr;
    }

    .lede,
    .rail {
      grid-column: auto;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: clamp(2.65rem, 13vw, 4.15rem);
    }

    .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>

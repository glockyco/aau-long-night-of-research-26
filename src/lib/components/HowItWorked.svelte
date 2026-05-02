<script lang="ts">
  import { systemPrompt } from '$lib/content/system-prompt';
  import type { Dict } from '$lib/i18n';
  import SectionKicker from './SectionKicker.svelte';

  let { dict }: { dict: Dict } = $props();

  const sectionPage = $derived(dict.hero.contents[3]?.page);
</script>

<section class="section" id="how">
  <div class="container">
    <SectionKicker section="§ 4" label={dict.how.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.how.heading}</h2>
    </div>

    <p class="how-intro">{dict.how.intro}</p>

    <div class="process" aria-label={dict.how.sectionLabel}>
      {#each dict.how.process as step (step.label)}
        <div>
          <b>{step.label}</b>
          <span>{step.text}</span>
        </div>
      {/each}
    </div>

    <div class="prompt-source">
      <div class="prompt-bar">
        <span>Source material</span>
        <strong>{dict.how.promptLabel}</strong>
      </div>
      <pre class="claude-md"><code>{systemPrompt}</code></pre>
    </div>

    <p class="how-tools">
      <a href="https://www.jetbrains.com/webstorm/">WebStorm</a>
      ·
      <a href="https://www.anthropic.com/claude-code">Claude Code</a>
      ·
      <a href="https://plugins.jetbrains.com/plugin/27310-claude-code">JetBrains plugin</a>
    </p>
  </div>
</section>

<style>
  .section-title-row {
    display: block;
    padding: 0.84rem 0 0.7rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .how-intro {
    max-width: 82ch;
    margin-top: 0.9rem;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .process {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 1.25rem 0;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--hair);
  }

  .process div {
    padding: 0.78rem 0.9rem 0.86rem;
    border-right: 1px solid var(--hair);
    background: rgba(255, 255, 255, 0.08);
  }

  .process div:last-child {
    border-right: 0;
  }

  .process b {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .process span {
    display: block;
    line-height: 1.38;
  }

  .prompt-source {
    border: 1px solid var(--fg);
    background:
      repeating-linear-gradient(135deg, transparent 0 14px, rgba(122, 29, 29, 0.035) 14px 16px),
      rgba(255, 255, 255, 0.14);
  }

  .prompt-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.52rem 0.75rem;
    border-bottom: 1px solid var(--fg);
    background: var(--surface-2);
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .prompt-bar strong {
    color: var(--accent);
    font-weight: 600;
  }

  .claude-md {
    overflow: auto;
    max-height: 430px;
    margin: 0;
    padding: 1rem 1.1rem;
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .claude-md code {
    color: inherit;
    font-family: inherit;
  }

  .how-tools {
    margin-top: 0.9rem;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
    .section-title-row {
      grid-template-columns: 1fr;
    }

    .process {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .process div:nth-child(2) {
      border-right: 0;
    }

    .process div:nth-child(-n + 2) {
      border-bottom: 1px solid var(--hair);
    }
  }

  @media (max-width: 560px) {
    .process {
      grid-template-columns: 1fr;
    }

    .process div,
    .process div:nth-child(2) {
      border-right: 0;
      border-bottom: 1px solid var(--hair);
    }

    .process div:last-child {
      border-bottom: 0;
    }
  }
</style>

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

    <figure class="setup-photo">
      <img
        src="/images/station-development-setup.webp"
        alt={dict.how.processPhoto.alt}
        width="2400"
        height="1560"
        loading="lazy"
      />
      <figcaption>{dict.how.processPhoto.caption}</figcaption>
    </figure>

    <p class="prompt-intro">{dict.how.promptIntro}</p>

    <figure class="prompt-source">
      <figcaption class="prompt-bar">
        <span>{dict.how.promptDocument.label}</span>
        <strong>{dict.how.promptDocument.stamp}</strong>
      </figcaption>
      <pre class="claude-md"><code>{systemPrompt}</code></pre>
      <div class="prompt-foot">
        <span>{dict.how.promptDocument.footerLeft}</span>
        <span>{dict.how.promptDocument.footerMiddle}</span>
        <span>{dict.how.promptDocument.footerRight}</span>
      </div>
    </figure>

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

  .how-intro,
  .prompt-intro {
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

  .setup-photo {
    margin: 1.15rem 0 1.25rem;
  }

  .setup-photo img {
    width: 100%;
    border: 1px solid var(--fg);
    background: #141414;
    filter: grayscale(0.05) contrast(1.03) sepia(0.04);
  }

  .setup-photo figcaption {
    margin-top: 0.45rem;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
  }

  .prompt-intro {
    margin-top: 1.35rem;
  }

  .prompt-source {
    margin: 1.25rem 0 0;
    border: 1px solid var(--fg);
    background:
      repeating-linear-gradient(135deg, transparent 0 14px, rgba(122, 29, 29, 0.035) 14px 16px),
      rgba(255, 255, 255, 0.14);
  }

  .prompt-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.6rem 1rem;
    margin: 0;
    padding: 0.55rem 0.85rem;
    border-top: 1px solid var(--accent-deep);
    border-bottom: 1px solid var(--accent-deep);
    background: var(--accent);
    color: var(--surface);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .prompt-bar strong {
    color: var(--surface);
    font-family: var(--font-masthead);
    font-style: italic;
    font-weight: 400;
    text-transform: none;
  }

  .claude-md {
    overflow: auto;
    max-height: 430px;
    margin: 0;
    padding: 1.2rem 1.25rem 1.35rem;
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

  .prompt-foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.6rem 1rem;
    padding: 0.48rem 0.85rem 0.52rem;
    border-top: 1px solid var(--fg);
    background: var(--fg);
    color: var(--surface);
    font-family: var(--font-sans);
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .prompt-foot span:first-child::first-letter {
    color: var(--accent);
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

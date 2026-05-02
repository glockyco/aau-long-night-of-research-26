<script lang="ts">
  import { tasksByDifficulty } from '$lib/data/tasks';
  import type { Difficulty } from '$lib/data/tasks';
  import type { Dict, Lang } from '$lib/i18n';
  import SectionKicker from './SectionKicker.svelte';
  import TaskRow from './TaskRow.svelte';

  interface Props {
    lang: Lang;
    dict: Dict;
  }

  const { lang, dict }: Props = $props();

  let active: Difficulty = $state('easy');

  const tiers: { id: Difficulty; label: string; color: string }[] = $derived([
    { id: 'easy', label: dict.tasks.tierEasy, color: 'var(--accent-easy)' },
    { id: 'medium', label: dict.tasks.tierMedium, color: 'var(--accent-medium)' },
    { id: 'hard', label: dict.tasks.tierHard, color: 'var(--accent-hard)' }
  ]);

  const activeTasks = $derived(tasksByDifficulty(active));
  const pdfHref = $derived(`/tasks/${active}.pdf`);
  const sectionPage = $derived(dict.hero.contents[2]?.page);
</script>

<section class="section" id="tasks">
  <div class="container">
    <SectionKicker section="§ 3" label={dict.tasks.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.tasks.heading}</h2>
      <div class="print-meta">{dict.tasks.meta}</div>
    </div>

    <p class="tasks-intro">{dict.tasks.intro}</p>

    <div class="tier-toolbar">
      <div class="tier-toggle" role="tablist" aria-label={dict.tasks.sectionLabel}>
        {#each tiers as tier (tier.id)}
          <button
            role="tab"
            aria-selected={active === tier.id}
            class="tier-btn"
            class:active={active === tier.id}
            style="--tier-color: {tier.color};"
            onclick={() => (active = tier.id)}
          >
            <span class="tier-dot" style="background: {tier.color};"></span>
            {tier.label}
          </button>
        {/each}
      </div>
      <a class="pdf-link" href={pdfHref} download>{dict.tasks.pdfDownload}</a>
    </div>

    <div class="task-rows">
      {#each activeTasks as task, i (task.id)}
        <TaskRow {task} {lang} {dict} index={i + 1} />
      {/each}
    </div>
  </div>
</section>

<style>
  .section-title-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.25rem;
    align-items: end;
    padding: 0.84rem 0 0.7rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .tasks-intro {
    max-width: 78ch;
    margin-top: 0.9rem;
    color: var(--fg);
    font-size: 1.05rem;
    line-height: 1.5;
  }

  .tier-toolbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.9rem;
    margin-top: 1.2rem;
    padding: 0.58rem 0;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--hair);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .tier-toggle {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .tier-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 0;
    border-bottom: 1px solid transparent;
    padding: 0;
    background: transparent;
    color: var(--fg-muted);
    text-transform: inherit;
  }

  .tier-btn.active {
    border-bottom-color: var(--tier-color);
    color: var(--tier-color);
    font-weight: 600;
  }

  .tier-dot {
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
  }

  .pdf-link {
    border-bottom: 1px dotted currentColor;
    color: var(--fg-muted);
    text-decoration: none;
  }

  .pdf-link:hover {
    color: var(--accent);
  }

  .task-rows {
    margin-top: 0.2rem;
  }

  @media (max-width: 760px) {
    .section-title-row {
      grid-template-columns: 1fr;
    }
  }
</style>

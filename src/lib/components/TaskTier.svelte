<script lang="ts">
  import { tasksByDifficulty } from '$lib/data/tasks';
  import type { Difficulty } from '$lib/data/tasks';
  import type { Dict, Lang } from '$lib/i18n';
  import TaskRow from './TaskRow.svelte';

  interface Props {
    lang: Lang;
    dict: Dict;
  }

  const { lang, dict }: Props = $props();

  let active: Difficulty = $state('easy');

  const tiers: { id: Difficulty; label: string; color: string }[] = $derived([
    { id: 'easy', label: dict.tasks.tierEasy, color: '#22c55e' },
    { id: 'medium', label: dict.tasks.tierMedium, color: '#eab308' },
    { id: 'hard', label: dict.tasks.tierHard, color: '#ef4444' }
  ]);

  const activeTasks = $derived(tasksByDifficulty(active));
  const pdfHref = $derived(`/tasks/${active}.pdf`);
</script>

<section class="section" id="tasks">
  <div class="container">
    <div class="section-label">{dict.tasks.sectionLabel}</div>
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
      <a class="pdf-link" href={pdfHref} download>⤓ {dict.tasks.pdfDownload}</a>
    </div>

    <div class="task-rows">
      {#each activeTasks as task, i (task.id)}
        <TaskRow {task} {lang} {dict} index={i + 1} />
      {/each}
    </div>
  </div>
</section>

<style>
  .tasks-intro {
    max-width: 60ch;
    margin-bottom: 1.5rem;
    color: var(--fg-muted);
  }

  .tier-toolbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .tier-toggle {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
  }

  .tier-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    border-radius: var(--radius-sm);
    padding: 0.4rem 0.9rem;
    background: transparent;
    color: var(--fg);
    font: inherit;
    cursor: pointer;
  }

  .tier-btn.active {
    background: var(--surface-2);
    box-shadow: inset 0 0 0 1px var(--tier-color);
  }

  .tier-dot {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }

  .pdf-link {
    border-bottom: 1px dotted var(--fg-muted);
    color: var(--fg-muted);
    font-size: 0.9rem;
    text-decoration: none;
  }

  .pdf-link:hover {
    border-bottom-color: var(--accent);
    color: var(--accent);
  }
</style>

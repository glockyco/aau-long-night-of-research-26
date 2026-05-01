<script lang="ts">
  import type { Task } from '$lib/data/tasks';
  import type { Dict, Lang } from '$lib/i18n';

  interface Props {
    task: Task;
    lang: Lang;
    dict: Dict;
    index: number;
  }

  const { task, lang, dict, index }: Props = $props();
  const localized = $derived(lang === 'de' ? task.de : task.en);
</script>

<article class="task-row" style="--tier-color: {task.color};">
  <div class="task-image">
    <img src={task.image} alt={localized.title} loading="lazy" width="600" height="450" />
  </div>
  <div class="task-body">
    <h3 class="task-title"><span class="task-index">{index}.</span> {localized.title}</h3>
    <p class="task-goal">{localized.goal}</p>

    <div class="task-checklist">
      <div class="task-section-label">{dict.tasks.checklistLabel}</div>
      <ul>
        {#each localized.checklist as item (item)}
          <li>{item}</li>
        {/each}
      </ul>
    </div>

    <div class="task-extensions">
      <div class="task-section-label">{dict.tasks.extensionsLabel}</div>
      <ul>
        {#each localized.extensions as ext (ext.text)}
          <li>{ext.text}</li>
        {/each}
      </ul>
    </div>
  </div>
</article>

<style>
  .task-row {
    display: grid;
    grid-template-columns: 35% 1fr;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
  }

  .task-row:first-of-type {
    border-top: none;
  }

  .task-image img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    background: var(--surface);
    object-fit: contain;
  }

  .task-body {
    border-left: 3px solid var(--tier-color);
    padding-left: 1rem;
  }

  .task-title {
    margin-bottom: 0.25rem;
    font-size: 1.15rem;
  }

  .task-index {
    margin-right: 0.25rem;
    color: var(--fg-muted);
    font-weight: 600;
  }

  .task-goal {
    margin-bottom: 1rem;
    color: var(--fg-muted);
  }

  .task-section-label {
    margin: 0.75rem 0 0.4rem;
    color: var(--fg-muted);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .task-checklist,
  .task-extensions {
    margin-bottom: 0.5rem;
  }

  .task-checklist ul,
  .task-extensions ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .task-checklist li,
  .task-extensions li {
    position: relative;
    margin-bottom: 0.25rem;
    padding-left: 1rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .task-checklist li::before {
    position: absolute;
    left: 0;
    color: var(--tier-color);
    content: '☐';
  }

  .task-extensions li::before {
    position: absolute;
    left: 0;
    color: var(--fg-muted);
    font-weight: 700;
    content: '·';
  }

  @media (max-width: 640px) {
    .task-row {
      grid-template-columns: 1fr;
    }

    .task-body {
      border-top: 3px solid var(--tier-color);
      border-left: none;
      padding-top: 1rem;
      padding-left: 0;
    }
  }
</style>

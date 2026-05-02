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
  const number = $derived(String(index).padStart(2, '0'));
</script>

<article class="task-row" style="--tier-color: {task.color};">
  <div class="task-image">
    <img src={task.image} alt={localized.title} loading="lazy" width="600" height="450" />
  </div>
  <div class="task-body">
    <h3 class="task-title"><span class="task-index">№ {number}</span> {localized.title}</h3>
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
    grid-template-columns: minmax(230px, 32%) minmax(0, 1fr);
    gap: clamp(1.25rem, 3vw, 2.1rem);
    align-items: start;
    padding: 1.35rem 0;
    border-bottom: 1px solid var(--hair);
  }

  .task-row:last-of-type {
    border-bottom: none;
  }

  .task-image {
    padding: 3px;
    border: 1px solid rgba(24, 20, 16, 0.52);
    background: var(--surface-2);
  }

  .task-image img {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: #132012;
    object-fit: contain;
    filter: grayscale(0.14) contrast(1.05) sepia(0.04);
  }

  .task-body {
    padding-left: 1.05rem;
    border-left: 1px solid var(--hair);
    box-shadow: inset 3px 0 0 color-mix(in srgb, var(--tier-color), transparent 15%);
  }

  .task-title {
    display: flex;
    gap: 0.55rem;
    align-items: baseline;
    margin-bottom: 0.35rem;
    font-size: clamp(1.55rem, 2.7vw, 2.2rem);
    letter-spacing: -0.01em;
    line-height: 1.04;
  }

  .task-index {
    flex: 0 0 auto;
    color: var(--tier-color);
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
  }

  .task-goal {
    margin-bottom: 1rem;
    color: var(--fg);
    font-size: 1.08rem;
    line-height: 1.44;
  }

  .task-section-label {
    margin: 0.82rem 0 0.45rem;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1.3;
    text-transform: uppercase;
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
    margin-bottom: 0.38rem;
    padding-left: 1.15rem;
    line-height: 1.42;
  }

  .task-checklist li::before {
    position: absolute;
    left: 0;
    color: var(--tier-color);
    font-family: var(--font-mono);
    content: '□';
  }

  .task-extensions {
    margin-top: 0.8rem;
    color: var(--fg-muted);
  }

  .task-extensions li::before {
    position: absolute;
    left: 0.18rem;
    color: var(--accent);
    font-weight: 700;
    content: '·';
  }

  @media (max-width: 760px) {
    .task-row {
      grid-template-columns: 1fr;
    }

    .task-body {
      padding-top: 1rem;
      padding-left: 0;
      border-top: 1px solid var(--hair);
      border-left: none;
      box-shadow: inset 0 3px 0 color-mix(in srgb, var(--tier-color), transparent 15%);
    }
  }
</style>

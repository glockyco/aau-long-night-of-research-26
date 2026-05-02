<script lang="ts">
  let {
    section,
    label,
    page
  }: {
    section: string;
    label: string;
    page?: string;
  } = $props();
</script>

<div class="newspaper-kicker">
  <span class="kicker-left">
    <span class="sect">{section}</span>
    <span>{label}</span>
  </span>
  {#if page}
    <span class="pgno">{page}</span>
  {/if}
</div>

<style>
  .newspaper-kicker {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.72rem 0 0.52rem;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--hair);
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .kicker-left {
    display: inline-flex;
    min-width: 0;
    align-items: baseline;
    gap: 0.62rem;
  }

  .sect {
    flex: 0 0 auto;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 0.98rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
  }

  .pgno {
    flex: 0 0 auto;
    color: var(--fg-muted);
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    white-space: nowrap;
  }

  @media (max-width: 560px) {
    .newspaper-kicker {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.2rem;
    }
  }
</style>

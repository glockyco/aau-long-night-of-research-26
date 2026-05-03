<script lang="ts">
  import type { Creation, MobileState } from '$lib/data/creations';
  import type { Dict } from '$lib/i18n';

  interface Props {
    creation: Creation;
    dict: Dict;
  }

  const { creation, dict }: Props = $props();

  const mobileLabel = $derived.by(() => {
    const map: Record<MobileState, string> = {
      yes: dict.creations.tagMobileYes,
      limited: dict.creations.tagMobileLimited,
      no: dict.creations.tagMobileNo
    };
    return map[creation.mobile];
  });

  const playersLabel = $derived(
    creation.players === 1
      ? dict.creations.tagPlayersSolo
      : dict.creations.tagPlayersMany.replace('{count}', String(creation.players))
  );
</script>

<ul class="creation-tags">
  <li class="tag tag-mobile tag-mobile-{creation.mobile}">{mobileLabel}</li>
  <li class="tag tag-players">{playersLabel}</li>
</ul>

<style>
  .creation-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tag {
    padding: 1px 6px 2px;
    border: 1px solid;
    background: var(--bg);
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.25;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Affirmative: solid accent fill, cream text — "go play" */
  .tag-mobile-yes {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--bg);
  }

  /* Neutral: outlined accent — "yes-but" */
  .tag-mobile-limited {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Blocked: muted outline — "doesn't play here" */
  .tag-mobile-no {
    border-color: var(--border);
    color: var(--fg-muted);
  }

  /* Player count is always informational, never the visual lead */
  .tag-players {
    border-color: var(--border);
    color: var(--fg-muted);
  }
</style>

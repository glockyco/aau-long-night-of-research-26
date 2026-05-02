<script lang="ts">
  import type { Dict } from '$lib/i18n';

  let { dict }: { dict: Dict } = $props();
</script>

<footer class="site-footer">
  <div class="container footer-inner">
    <ul class="footer-links">
      <li>
        <a href="https://langenachtderforschung.at/station/7459">{dict.footer.officialPage}</a>
      </li>
      <li>
        <a href="https://github.com/glockyco/aau-long-night-of-research-26">{dict.footer.repo}</a>
      </li>
    </ul>
    <span class="footer-folio"><span aria-hidden="true">✥</span> U27 Gazette · 2026</span>
  </div>
</footer>

<style>
  .site-footer {
    margin-top: 1.25rem;
    padding: 0 0 3rem;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .footer-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem 2rem;
    padding-top: 0.85rem;
    border-top: 3px solid var(--fg);
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem 1.15rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .footer-links a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }

  .footer-links a:hover {
    color: var(--accent);
  }

  .footer-folio {
    color: var(--accent);
    white-space: nowrap;
  }

  .footer-folio span {
    margin-right: 0.4em;
  }
</style>

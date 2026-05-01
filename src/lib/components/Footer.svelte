<script lang="ts">
  import type { Dict } from '$lib/i18n';

  let { dict }: { dict: Dict } = $props();
</script>

<footer class="site-footer">
  <div class="container">
    <ul class="footer-links">
      <li>
        <a href="https://langenachtderforschung.at/station/7459">{dict.footer.officialPage}</a>
      </li>
      <li>
        <a href="https://github.com/glockyco/aau-long-night-of-research-26">{dict.footer.repo}</a>
      </li>
      <li>
        <a
          href="https://github.com/glockyco/aau-long-night-of-research-26/blob/main/src/lib/content/system-prompt.md"
          >{dict.footer.systemPrompt}</a
        >
      </li>
      <li class="footer-built">
        <a href="https://www.anthropic.com/claude-code">{dict.footer.builtWith}</a>
      </li>
    </ul>
  </div>
</footer>

<style>
  .site-footer {
    margin-top: 3rem;
    border-top: 1px solid var(--border);
    padding: 2rem 0 3rem;
    color: var(--fg-muted);
    font-size: 0.85rem;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .footer-links a {
    border-bottom: 1px dotted var(--fg-muted);
    color: inherit;
    text-decoration: none;
  }

  .footer-links a:hover {
    border-bottom-color: var(--accent);
    color: var(--accent);
  }

  .footer-built {
    margin-left: auto;
  }

  @media (max-width: 640px) {
    .footer-built {
      margin-left: 0;
    }
  }
</style>

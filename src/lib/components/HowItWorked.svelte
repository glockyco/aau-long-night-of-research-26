<script lang="ts">
  import { systemPrompt } from '$lib/content/system-prompt';
  import type { Dict } from '$lib/i18n';

  let { dict }: { dict: Dict } = $props();
</script>

<section class="section" id="how">
  <div class="container">
    <div class="section-label">{dict.how.sectionLabel}</div>
    <p class="how-intro">{dict.how.intro}</p>
    <p class="how-prompt-label">{dict.how.promptLabel}</p>
    <pre class="claude-md"><code>{systemPrompt}</code></pre>
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
  .how-intro,
  .how-prompt-label {
    max-width: 65ch;
    line-height: 1.65;
  }

  .how-intro {
    margin-bottom: 1.25rem;
  }

  .how-prompt-label {
    margin-bottom: 0.75rem;
    color: var(--fg-muted);
    font-size: 0.95rem;
  }

  .claude-md {
    overflow-x: auto;
    margin-bottom: 1.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    background: var(--surface);
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.55;
    white-space: pre;
  }

  .claude-md code {
    color: inherit;
    font-family: inherit;
  }

  .how-tools {
    color: var(--fg-muted);
    font-size: 0.9rem;
  }
</style>

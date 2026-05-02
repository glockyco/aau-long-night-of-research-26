import type { Dict } from './types';

export const en: Dict = {
  nav: {
    langSwitch: 'DE',
    folio: 'The U27 Gazette',
    nameplatePrefix: 'The U27',
    nameplateMiddle: '',
    nameplateTitle: 'Gazette',
    runningHead: '¶ The U27 Gazette · Night edition · Sheet I',
    archiveLine: 'Page 1 · 24.IV.MMXXVI · Archive No. 7459',
    dateline: ['Klagenfurt, Friday', '24 April 2026'],
    editionLines: ['Issue 1 · № I', 'Special issue · free'],
    standfirst: [
      'Long Night of Research',
      'Station U27',
      'University of Klagenfurt',
      '17:00 to 23:00'
    ],
    pressBannerLead: 'Visitors brought the ideas. The AI helped build them.',
    pressBannerTrail: 'Issue 39 · Sheet I · press time 23:45'
  },
  hero: {
    metaWhen: 'Long Night of Research 2026 · Station U27',
    kicker: 'Filed from the lab floor',
    headlineLines: ['One evening.', 'Over 90 webpages.'],
    deck: 'Six hours of hands-on station — what came out were dice rollers, platform games, racing games, drawing tools, weather dashboards, quizzes, and more.',
    facts: [
      { value: '4', label: 'AI workbenches' },
      { value: '9', label: 'task cards' },
      { value: '39', label: 'creations archived' },
      { value: '37 889', label: 'lines of source' },
      { value: '64', label: 'most-used color', swatch: '#1a1a2e' },
      { value: '43 ⭐', label: 'most-used emoji' },
      { value: '21', label: 'most-bound key', keycap: 'Space' },
      { value: '∞', label: 'creative ideas' }
    ],
    contentsLabel: 'In this issue',
    contents: [
      { label: 'From room S.2.42', page: 'p. 1' },
      { label: 'Creation index', page: 'p. 2' },
      { label: 'Task cards', page: 'p. 6' },
      { label: 'Behind the scenes', page: 'p. 7' },
      { label: 'Crossword', page: 'p. 8' },
      { label: 'Team and credits', page: 'p. 9' }
    ],
    rhythmLabel: 'Webpages per hour · 91 total',
    rhythmAxisLabel: 'webpages per hour'
  },
  context: {
    sectionLabel: 'From room S.2.42',
    heading: 'A hands-on station about AI and code',
    paragraphs: [
      'At the Long Night of Research 2026, the Software Engineering Research Group hosted Station U27 in room S.2.42 at the University of Klagenfurt. Clemens Bauer, Johann Glock, and Martin Pinzger were on hand — answering questions, untangling ideas, and helping visitors turn what they had in mind into webpages they could open, play with, and refine.',
      'The goal: make today’s AI programming tools tangible. Every computer ran the same simple loop. Visitors described what they wanted in plain language. The AI wrote the HTML, CSS, and JavaScript, saved it as one file, and opened it in the browser. If something was off, the visitor just said so — and the conversation kept going, like any other.',
      'Some things worked impressively fast. Others showed the limits just as plainly. The room stayed active and curious, especially when kids realised that a passing idea — a dice game, a quiz, a small tool of their own — could become a working webpage within minutes. By the end of the evening over ninety such pages had been built.'
    ]
  },
  creations: {
    sectionLabel: 'What got built',
    sectionTitle: 'The creation index',
    intro:
      'Over the evening, 91 webpages were created. This index gathers 39 creations that open well, feel distinct, and tell the story of the night. Very similar drafts, problematic topics, and shaky attempts stayed off the page.',
    sectionMeta: '39 creations · 13:23–22:22',
    trialLabel: 'Trial runs before doors opened',
    trialMeta: '4 checks · before 17:00',
    eventLabel: 'Built during the event',
    eventMeta: '35 visitor creations · from 17:06',
    builtAt: 'built at'
  },
  tasks: {
    sectionLabel: 'Task cards',
    heading: 'Ideas to take with you',
    meta: 'PDF available',
    intro:
      'Three stacks of task cards sat on the table: easy, medium, hard. Each card gave visitors a concrete starting point and a short checklist for judging the result. And if you came with your own idea, you could of course just start with that.',
    tierEasy: 'Easy',
    tierMedium: 'Medium',
    tierHard: 'Hard',
    pdfDownload: 'Download PDF',
    checklistLabel: 'Check your result',
    extensionsLabel: 'Want more?'
  },
  how: {
    sectionLabel: 'How it worked',
    heading: 'Plain language in, webpage out',
    intro:
      'Each computer ran WebStorm{1} with the Claude Code plugin{2}. Visitors typed what they wanted in plain language. Claude{3} wrote HTML, CSS, and JavaScript, saved everything to a file, and opened it in the browser. If something was off, changes were discussed with Claude in plain language — or visitors took a look behind the scenes at the source code.',
    footnotes: [
      {
        term: 'WebStorm',
        body: 'Program for writing code.',
        href: 'https://www.jetbrains.com/webstorm/',
        hrefLabel: 'jetbrains.com/webstorm'
      },
      {
        term: 'Claude Code plugin',
        body: 'Connects WebStorm to the AI.',
        href: 'https://plugins.jetbrains.com/plugin/27310-claude-code',
        hrefLabel: 'plugins.jetbrains.com/plugin/27310-claude-code'
      },
      {
        term: 'Claude',
        body: 'The AI that writes the code.',
        href: 'https://www.anthropic.com/claude-code',
        hrefLabel: 'anthropic.com/claude-code'
      }
    ],
    footnotesLabel: 'Footnotes',
    footnoteBackLabel: 'Back to text',
    processPhoto: {
      alt: 'A development setup showing WebStorm with Claude Code on the left and a live browser preview of a weather page on the right.',
      caption:
        'The table setup in miniature: source code, Claude Code conversation, and live browser preview side by side.'
    },
    process: [
      { label: '1 · Describe', text: 'A person describes their idea.' },
      { label: '2 · Generate', text: 'Claude creates a webpage.' },
      { label: '3 · Open', text: 'The result opens in the browser.' },
      { label: '4 · Revise', text: 'Changes get discussed.' }
    ],
    promptIntro:
      'Before visitors arrived, Claude got a little instruction sheet: what kind of event this was, how to name files, and how to keep the experience friendly for people without programming experience. In developer terms this was a CLAUDE.md file. At the station it was simply the house rules for the assistant.',
    promptDocument: {
      label: 'Document — house rules, handed to the assistant',
      stamp: 'Confidential · internal',
      footerLeft: '¶ Page 1 of 1 · House rules, unabridged',
      footerMiddle: 'Countersigned JG ✓',
      footerRight: 'Print clearance · 24. IV. MMXXVI · 12:55'
    }
  },
  team: {
    sectionLabel: 'Who we are',
    heading: 'The people at the station',
    colophon:
      'This Gazette gathers what Station U27 tried, discarded, repaired, and saved between 17:00 and 23:00.'
  },
  crossword: {
    sectionLabel: 'Crossword',
    heading: 'A puzzle break',
    intro:
      'Ten words inspired by Klagenfurt and the Long Night of Research. The cells flagged in red, read in the numbered order, spell a hidden word.',
    acrossLabel: 'Across',
    downLabel: 'Down',
    resetLabel: 'Reset',
    revealWordLabel: 'Reveal word',
    revealAllLabel: 'Reveal all',
    keywordLabel: 'Hidden word',
    keywordSolvedLabel: 'Eureka!',
    cellAriaLabel: 'Letter'
  },
  footer: {
    officialPage: 'Official station page',
    repo: 'Source code',
    folio: 'The U27 Gazette · Issue I · 24.IV.MMXXVI'
  },
  creationPage: {
    backToIndex: '← Back to creation index',
    previous: '← Previous creation',
    next: 'Next creation →',
    firstEntry: 'First creation',
    lastEntry: 'Last creation',
    entryLabel: 'No.',
    openStandalone: 'Open standalone page'
  }
};

import type { Dict } from './types';

export const en: Dict = {
  nav: {
    langSwitch: 'DE',
    folio: 'The U27 Gazette',
    nameplatePrefix: 'The U27',
    nameplateMiddle: '',
    nameplateTitle: 'Gazette',
    edition: 'Special issue · 39 playable webpages · 24 April 2026',
    runningHead: '¶ The U27 Gazette · Station U27 · Sheet I',
    archiveLine: 'Page 1 · 24.IV.MMXXVI · Archive No. 7459',
    dateline: ['Klagenfurt, Friday', '24 April 2026'],
    editionLines: ['Issue 1 · № I', 'Special issue · free'],
    standfirst: [
      'Long Night of Research',
      'Station U27',
      'University of Klagenfurt',
      '17:00 to 23:00'
    ],
    pressBannerLead: 'Webpages built by visitors, written by an AI.',
    pressBannerTrail: 'Issue 39 · Sheet I · final save 22:22'
  },
  hero: {
    line1: 'Visitors described a webpage.',
    line2: 'Claude built it in the browser.',
    line3: 'Here is the archive.',
    metaWhen: 'Long Night of Research 2026 · Station U27',
    metaWhere: 'University of Klagenfurt · 24 April · 17:00–23:00',
    kicker: 'Filed from the lab floor',
    headline: 'One evening. 100+ webpages.',
    headlineLines: ['One evening.', '100+ webpages.'],
    deck: 'Visitors described what they wanted in plain language. Claude Code turned those requests into complete webpages: dice, platformers, racing games, drawing tools, weather, quizzes, and more.',
    facts: [
      { value: '39', label: 'creations archived' },
      { value: '13:23', label: 'first saved page' },
      { value: '22:22', label: 'last saved page' },
      { value: '1', label: 'HTML file each' }
    ],
    contentsLabel: 'In this issue',
    contents: [
      { label: 'Station report', page: 'p. 1' },
      { label: 'Creation index', page: 'p. 2' },
      { label: 'Task cards', page: 'p. 6' },
      { label: 'How it worked', page: 'p. 7' },
      { label: 'Team and links', page: 'p. 8' }
    ]
  },
  context: {
    sectionLabel: 'From room S.2.42',
    heading: 'A hands-on station about AI and code.',
    paragraphs: [
      'At the Long Night of Research 2026, the Software Engineering Research Group (SERG) hosted Station U27 at the University of Klagenfurt in room S.2.42. Clemens Bauer, Johann Glock, and Martin Pinzger supported visitors, answered questions, and helped turn ideas into working webpages.',
      'The goal was to make today’s AI programming tools tangible. Visitors described games, tools, quizzes, and experiments in everyday language; Claude Code generated the HTML, CSS, and JavaScript; then everyone could test, revise, break, fix, and improve the result. Some things worked impressively fast. Some things showed the limits just as clearly.',
      'More than anything, the station was meant to make programming feel approachable. For much of the evening the room was active and curious, especially when kids discovered that their ideas could become playable little webpages.'
    ]
  },
  creations: {
    sectionLabel: 'What got built',
    sectionTitle: 'The creation index.',
    intro:
      'More than 100 webpages were created over the evening. This index shows 39 curated works: playable, distinct, and suitable for presentation. Close duplicates, problematic topics, and attempts that did not run reliably are left out.',
    sectionMeta: '39 entries · 13:23–22:22',
    trialLabel: 'Trial runs before doors opened',
    trialMeta: '4 checks · before 17:00',
    eventLabel: 'Built during the event',
    eventMeta: '35 visitor creations · from 17:06',
    builtAt: 'built at'
  },
  tasks: {
    sectionLabel: 'Task cards',
    heading: 'Ideas to take with you.',
    meta: 'PDF available',
    intro:
      'Three stacks of task cards sat on the table: easy, medium, hard. Each card gave visitors a concrete starting point and a short checklist for judging the result. Beyond this, they were highly encouraged to explore their own ideas.',
    tierEasy: 'Easy',
    tierMedium: 'Medium',
    tierHard: 'Hard',
    pdfDownload: 'Download PDF',
    checklistLabel: 'Check your result',
    extensionsLabel: 'Want more?'
  },
  how: {
    sectionLabel: 'How it worked',
    heading: 'Plain language in, webpage out.',
    intro:
      'No programming knowledge. No typing code. Each computer ran WebStorm with the Claude Code plugin. Visitors typed what they wanted in plain language. Claude wrote HTML, CSS, and JavaScript, saved everything to a file, and opened it in the browser. If something was off, changes were discussed with Claude in plain language — or visitors took a look behind the scenes at the source code.',
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
      'Before visitors arrived, Claude got a little instruction sheet: what kind of event this was, how to name files, what not to use, and how to keep the experience friendly for people without programming experience. In developer terms this was a CLAUDE.md file; at the station it was simply the house rules for the assistant.',
    promptDocument: {
      label: 'Document — house rules, handed to the assistant',
      stamp: 'Confidential · internal',
      footerLeft: '¶ Page 1 of 1 · House rules, unabridged',
      footerMiddle: 'Countersigned JG ✓',
      footerRight: 'Print clearance · 24. IV. MMXXVI · 12:55'
    },
    promptLabel: 'House rules given to Claude before visitors arrived'
  },
  team: {
    sectionLabel: 'Who we are',
    heading: 'The people at the station.',
    affiliation:
      'We are with the Software Engineering Research Group (SERG) at the University of Klagenfurt.'
  },
  footer: {
    officialPage: 'Official station page',
    repo: 'Repository',
    systemPrompt: 'System prompt',
    builtWith: 'Built with Claude Code'
  },
  creationPage: {
    backToIndex: '← Back to creation index',
    previous: '← Previous',
    next: 'Next →',
    firstEntry: 'First entry',
    lastEntry: 'Last entry',
    entryLabel: 'No.',
    openStandalone: 'Open in new tab'
  }
};

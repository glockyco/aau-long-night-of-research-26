export type Lang = 'de' | 'en';

export const LANGS: Lang[] = ['de', 'en'];
export const DEFAULT_LANG: Lang = 'de';

interface HeroFact {
  value: string;
  label: string;
  /** Optional: render a small color swatch next to the value (CSS color string). */
  swatch?: string;
  /** Optional: render a keycap-styled glyph next to the value. */
  keycap?: string;
}

interface IssueEntry {
  label: string;
}

interface ProcessStep {
  label: string;
  text: string;
}

interface Footnote {
  term: string;
  body: string;
  href: string;
  hrefLabel: string;
}

interface SeoBlock {
  /** Brand name; used in og:site_name and as the suffix on inner page titles. */
  siteName: string;
  /** Full <title> for the landing page. */
  homeTitle: string;
  /** <meta name="description"> for the landing page. */
  homeDescription: string;
  /** Path to the OG card for this locale. */
  ogImagePath: string;
  /** Descriptive alt text for the OG card. */
  ogImageAlt: string;
}

export interface Dict {
  seo: SeoBlock;
  nav: {
    langSwitch: string;
    folio: string;
    nameplatePrefix: string;
    nameplateMiddle: string;
    nameplateTitle: string;
    runningHead: string;
    archiveLine: string;
    dateline: string[];
    editionLines: string[];
    standfirst: string[];
    pressBannerLead: string;
    pressBannerTrail: string;
  };
  hero: {
    metaWhen: string;
    kicker: string;
    headlineLines: string[];
    deck: string;
    facts: HeroFact[];
    contentsLabel: string;
    contents: IssueEntry[];
    /** Template for the print-style page label. `{n}` is replaced with the computed page number. */
    pageLabelTemplate: string;
    rhythmLabel: string;
    rhythmAxisLabel: string;
    /** A11y label for the floating navigation lens (TOC + language). */
    sectionLensLabel: string;
    /** Heading inside the lens menu for the language switcher. */
    languageSwitchLabel: string;
    /** Label for the lens menu jump back to the page top. */
    topLinkLabel: string;
  };
  context: {
    sectionLabel: string;
    heading: string;
    paragraphs: string[];
  };
  creations: {
    sectionLabel: string;
    sectionTitle: string;
    intro: string;
    sectionMeta: string;
    trialLabel: string;
    trialMeta: string;
    eventLabel: string;
    eventMeta: string;
    builtAt: string;
    tagMobileYes: string;
    tagMobileLimited: string;
    tagMobileNo: string;
    tagPlayersSolo: string;
    /** Template with `{count}` placeholder for 2/3/4-player entries. */
    tagPlayersMany: string;
    filterLabel: string;
    filterMobile: string;
    filterMultiplayer: string;
    /** Template with `{shown}` and `{total}` placeholders. */
    filterCount: string;
    filterEmpty: string;
  };
  tasks: {
    sectionLabel: string;
    heading: string;
    meta: string;
    intro: string;
    tierEasy: string;
    tierMedium: string;
    tierHard: string;
    pdfDownload: string;
    checklistLabel: string;
    extensionsLabel: string;
  };
  how: {
    sectionLabel: string;
    heading: string;
    intro: string;
    footnotes: Footnote[];
    footnotesLabel: string;
    footnoteBackLabel: string;
    processPhoto: {
      alt: string;
      caption: string;
    };
    process: ProcessStep[];
    promptIntro: string;
    promptDocument: {
      label: string;
      stamp: string;
      footerLeft: string;
      footerMiddle: string;
      footerRight: string;
    };
  };
  team: {
    sectionLabel: string;
    heading: string;
    colophon: string;
  };
  crossword: {
    sectionLabel: string;
    heading: string;
    intro: string;
    acrossLabel: string;
    downLabel: string;
    resetLabel: string;
    revealWordLabel: string;
    revealAllLabel: string;
    keywordLabel: string;
    keywordSolvedLabel: string;
    cellAriaLabel: string;
  };
  footer: {
    officialPage: string;
    repo: string;
    folio: string;
  };
  creationPage: {
    backToIndex: string;
    previous: string;
    next: string;
    firstEntry: string;
    lastEntry: string;
    entryLabel: string;
    openStandalone: string;
    /** Note shown only on touch viewports for `mobile: 'limited'` entries. */
    mobileNoteLimited: string;
    /** Note shown only on touch viewports for `mobile: 'no'` entries. */
    mobileNoteNo: string;
  };
}

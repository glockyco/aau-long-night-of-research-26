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
  page: string;
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

export interface Dict {
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
    rhythmLabel: string;
    rhythmAxisLabel: string;
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
    revealLabel: string;
    hideAnswersLabel: string;
    successLabel: string;
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
  };
}

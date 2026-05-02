export type Lang = 'de' | 'en';

export const LANGS: Lang[] = ['de', 'en'];
export const DEFAULT_LANG: Lang = 'de';

interface HeroFact {
  value: string;
  label: string;
}

interface IssueEntry {
  label: string;
  page: string;
}

interface ProcessStep {
  label: string;
  text: string;
}

export interface Dict {
  nav: {
    langSwitch: string;
    folio: string;
    nameplatePrefix: string;
    nameplateMiddle: string;
    nameplateTitle: string;
    edition: string;
    runningHead: string;
    archiveLine: string;
    dateline: string[];
    editionLines: string[];
    standfirst: string[];
    pressBannerLead: string;
    pressBannerTrail: string;
  };
  hero: {
    line1: string;
    line2: string;
    line3: string;
    metaWhen: string;
    metaWhere: string;
    kicker: string;
    headline: string;
    headlineLines: string[];
    deck: string;
    facts: HeroFact[];
    contentsLabel: string;
    contents: IssueEntry[];
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
    promptLabel: string;
  };
  team: {
    sectionLabel: string;
    heading: string;
    affiliation: string;
  };
  footer: {
    officialPage: string;
    repo: string;
    systemPrompt: string;
    builtWith: string;
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

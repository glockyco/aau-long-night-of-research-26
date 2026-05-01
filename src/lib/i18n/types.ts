export type Lang = 'de' | 'en';

export const LANGS: Lang[] = ['de', 'en'];
export const DEFAULT_LANG: Lang = 'de';

export interface Dict {
  nav: {
    langSwitch: string;
  };
  hero: {
    line1: string;
    line2: string;
    line3: string;
    metaWhen: string;
    metaWhere: string;
  };
  creations: {
    sectionLabel: string;
    builtAt: string;
  };
  tasks: {
    sectionLabel: string;
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
    intro: string;
    promptLabel: string;
  };
  team: {
    sectionLabel: string;
    affiliation: string;
  };
  footer: {
    officialPage: string;
    repo: string;
    systemPrompt: string;
    builtWith: string;
  };
  creationPage: {
    back: string;
    openStandalone: string;
  };
}

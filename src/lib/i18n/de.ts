import type { Dict } from './types';

export const de: Dict = {
  nav: {
    langSwitch: 'EN',
    folio: 'Die U27 Gazette',
    nameplatePrefix: 'Die U27',
    nameplateMiddle: '',
    nameplateTitle: 'Gazette',
    edition: 'Sonderausgabe · 39 spielbare Webseiten · 24. April 2026',
    runningHead: '¶ Die U27 Gazette · Nachtdruck · Bogen I',
    archiveLine: 'Seite 1 · 24.IV.MMXXVI · Archiv-Nr. 7459',
    dateline: ['Klagenfurt, Freitag', '24. April 2026'],
    editionLines: ['Ausgabe 1 · № I', 'Nachtausgabe · Gratis'],
    standfirst: [
      'Lange Nacht der Forschung',
      'Station U27',
      'Universität Klagenfurt',
      '17 bis 23 Uhr'
    ],
    pressBannerLead: 'Webseiten, gebaut von Besucher:innen, geschrieben von einer KI.',
    pressBannerTrail: 'Heft 39 · Bogen I · Druckschluss 22:22'
  },
  hero: {
    line1: 'Besucher:innen beschrieben eine Webseite.',
    line2: 'Claude baute sie im Browser.',
    line3: 'Hier ist das Archiv.',
    metaWhen: 'Lange Nacht der Forschung 2026 · Station U27',
    metaWhere: 'Universität Klagenfurt · 24. April · 17:00–23:00',
    kicker: 'Von Station U27',
    headline: 'Ein Abend. 100+ Webseiten.',
    headlineLines: ['Ein Abend.', '100+ Webseiten.'],
    deck: 'Besucher:innen beschrieben in Alltagssprache, was sie bauen wollten. Claude Code machte daraus vollständige Webseiten: Würfel, Jump-and-Runs, Rennspiele, Zeichenwerkzeuge, Wetter, Quizze und mehr.',
    facts: [
      { value: '39', label: 'archivierte Arbeiten' },
      { value: '13:23', label: 'erste gespeicherte Seite' },
      { value: '22:22', label: 'letzte gespeicherte Seite' },
      { value: '1', label: 'HTML-Datei pro Arbeit' }
    ],
    contentsLabel: 'In dieser Ausgabe',
    contents: [
      { label: 'Aus Raum S.2.42', page: 'S. 1' },
      { label: 'Index der Arbeiten', page: 'S. 2' },
      { label: 'Aufgabenkarten', page: 'S. 6' },
      { label: 'Ablauf', page: 'S. 7' },
      { label: 'Team und Links', page: 'S. 8' }
    ]
  },
  context: {
    sectionLabel: 'Aus Raum S.2.42',
    heading: 'Eine Mitmachstation über KI und Code.',
    paragraphs: [
      'Bei der Langen Nacht der Forschung 2026 betreute die Software Engineering Research Group (SERG) die Station U27 an der Universität Klagenfurt in Raum S.2.42. Clemens Bauer, Johann Glock und Martin Pinzger unterstützten Besucher:innen, beantworteten Fragen und halfen dabei, Ideen in funktionierende Webseiten zu verwandeln.',
      'Das Ziel war, aktuelle KI-Werkzeuge fürs Programmieren greifbar zu machen. Besucher:innen beschrieben Spiele, Werkzeuge, Quizze und Experimente in Alltagssprache; Claude Code erzeugte HTML, CSS und JavaScript; danach wurde getestet, angepasst, kaputtgemacht, repariert und verbessert. Manches funktionierte beeindruckend schnell. Manches zeigte die Grenzen genauso deutlich.',
      'Vor allem sollte die Station zeigen, dass Programmieren zugänglich sein kann. Über weite Strecken war der Raum aktiv und neugierig, besonders wenn Kinder merkten, dass aus ihren Ideen spielbare kleine Webseiten werden konnten.'
    ]
  },
  creations: {
    sectionLabel: 'Was entstanden ist',
    sectionTitle: 'Der Index der Arbeiten.',
    intro:
      'Insgesamt entstanden über 100 Webseiten. Dieser Index zeigt 39 kuratierte Arbeiten: spielbar, unterscheidbar und für die Präsentation geeignet. Enge Duplikate, problematische Themen und Versuche, die nicht zuverlässig liefen, bleiben draußen.',
    sectionMeta: '39 Einträge · 13:23–22:22',
    trialLabel: 'Probeläufe vor Beginn',
    trialMeta: '4 Checks · vor 17:00',
    eventLabel: 'Während der Veranstaltung gebaut',
    eventMeta: '35 Arbeiten · ab 17:06',
    builtAt: 'gebaut um'
  },
  tasks: {
    sectionLabel: 'Aufgabenkarten',
    heading: 'Ideen zum Mitnehmen.',
    meta: 'PDF verfügbar',
    intro:
      'Auf dem Tisch lagen drei Stapel Aufgabenkarten: einfach, mittel und schwer. Jede Karte gab einen Startpunkt und eine kurze Checkliste für das Ergebnis. Darüber hinaus wurden Besucher:innen ermutigt, eigene Ideen zu probieren.',
    tierEasy: 'Einfach',
    tierMedium: 'Mittel',
    tierHard: 'Schwer',
    pdfDownload: 'PDF herunterladen',
    checklistLabel: 'Prüfe dein Ergebnis',
    extensionsLabel: 'Noch mehr Ideen'
  },
  how: {
    sectionLabel: 'Ablauf',
    heading: 'Alltagssprache rein, Webseite raus.',
    intro:
      'Kein Programmierwissen. Kein Code tippen. Auf jedem Rechner lief WebStorm mit dem Claude-Code-Plugin. Besucher:innen beschrieben in Alltagssprache, was sie wollten. Claude schrieb HTML, CSS und JavaScript, speicherte alles in eine Datei und öffnete sie im Browser. Wenn etwas nicht passte, wurden Änderungswünsche wieder in Alltagssprache mit Claude diskutiert — oder ein Blick hinter die Kulissen auf den Source Code gewagt.',
    process: [
      { label: '1 · Beschreiben', text: 'Eine Person beschreibt ihre Idee.' },
      { label: '2 · Generieren', text: 'Claude erstellt eine Webseite.' },
      { label: '3 · Öffnen', text: 'Das Ergebnis gibt’s im Browser.' },
      { label: '4 · Ändern', text: 'Änderungen werden diskutiert.' }
    ],
    promptLabel: 'Hausregeln für Claude vor Beginn der Veranstaltung'
  },
  team: {
    sectionLabel: 'Wer wir sind',
    heading: 'Das Team an der Station.',
    affiliation:
      'Wir gehören zur Software Engineering Research Group (SERG) an der Universität Klagenfurt.'
  },
  footer: {
    officialPage: 'Offizielle Stations-Seite',
    repo: 'Repository',
    systemPrompt: 'System-Prompt',
    builtWith: 'Gebaut mit Claude Code'
  },
  creationPage: {
    back: '← zurück',
    openStandalone: 'Im neuen Tab öffnen'
  }
};

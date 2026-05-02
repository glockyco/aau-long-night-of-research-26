import type { Dict } from './types';

export const de: Dict = {
  nav: {
    langSwitch: 'EN',
    folio: 'Die U27 Gazette',
    nameplatePrefix: 'Die U27',
    nameplateMiddle: '',
    nameplateTitle: 'Gazette',
    runningHead: '¶ Die U27 Gazette · Nachtausgabe · Bogen I',
    archiveLine: 'Seite 1 · 24.IV.MMXXVI · Archiv-Nr. 7459',
    dateline: ['Klagenfurt, Freitag', '24. April 2026'],
    editionLines: ['Ausgabe 1 · № I', 'Nachtausgabe · Gratis'],
    standfirst: [
      'Lange Nacht der Forschung',
      'Station U27',
      'Universität Klagenfurt',
      '17 bis 23 Uhr'
    ],
    pressBannerLead: 'Besucher:innen hatten die Ideen. Die KI half beim Bauen.',
    pressBannerTrail: 'Heft 39 · Bogen I · Druckschluss 22:22'
  },
  hero: {
    metaWhen: 'Lange Nacht der Forschung 2026 · Station U27',
    kicker: 'Von Station U27',
    headlineLines: ['Ein Abend.', 'Über 100 Webseiten.'],
    deck: 'Besucher:innen beschrieben in Alltagssprache, was sie bauen wollten. Die KI machte daraus vollständige Webseiten: Würfel, Jump-and-Runs, Rennspiele, Zeichenwerkzeuge, Wetter, Quizze und mehr.',
    facts: [
      { value: '39', label: 'archivierte Kreationen' },
      { value: '13:23', label: 'erste gespeicherte Seite' },
      { value: '22:22', label: 'letzte gespeicherte Seite' },
      { value: '1', label: 'HTML-Datei pro Kreation' }
    ],
    contentsLabel: 'In dieser Ausgabe',
    contents: [
      { label: 'Aus Raum S.2.42', page: 'S. 1' },
      { label: 'Index der Kreationen', page: 'S. 2' },
      { label: 'Aufgabenkarten', page: 'S. 6' },
      { label: 'Hinter den Kulissen', page: 'S. 7' },
      { label: 'Team und Impressum', page: 'S. 8' }
    ]
  },
  context: {
    sectionLabel: 'Aus Raum S.2.42',
    heading: 'Eine Mitmachstation über KI und Code',
    paragraphs: [
      'Bei der Langen Nacht der Forschung 2026 betreute die Software Engineering Research Group die Station U27 in Raum S.2.42 an der Universität Klagenfurt. Clemens Bauer, Johann Glock und Martin Pinzger waren vor Ort — beantworteten Fragen, sortierten Ideen und halfen Besucher:innen dabei, das, was sie im Kopf hatten, in spielbare Webseiten zu verwandeln.',
      'Das Ziel: aktuelle KI-Werkzeuge fürs Programmieren greifbar machen. Auf jedem Rechner lief dieselbe einfache Schleife. Besucher:innen sagten in Alltagssprache, was sie sich vorstellten. Claude Code schrieb HTML, CSS und JavaScript, speicherte alles in eine Datei und öffnete sie im Browser. Stimmte etwas nicht, sagte man es Claude — wie in jedem Gespräch.',
      'Manches funktionierte beeindruckend schnell. Manches zeigte die Grenzen genauso deutlich. Im Raum blieb es lebendig und neugierig, besonders wenn Kinder merkten, dass aus einer Idee — einem Würfelspiel, einem Quiz, einem kleinen Werkzeug — innerhalb weniger Minuten eine spielbare Webseite werden konnte. Am Ende des Abends waren über hundert Seiten entstanden.'
    ]
  },
  creations: {
    sectionLabel: 'Was entstanden ist',
    sectionTitle: 'Der Index der Kreationen',
    intro:
      'Insgesamt entstanden über 100 Webseiten. Dieser Index zeigt 39 ausgewählte Kreationen: spielbar, gut unterscheidbar und geeignet für den öffentlichen Blick ins Archiv. Enge Duplikate, heikle Themen und Versuche, die keine zuverlässigen Ergebnisse lieferten, wurden nicht aufgenommen.',
    sectionMeta: '39 Kreationen · 13:23–22:22',
    trialLabel: 'Probeläufe vor Beginn',
    trialMeta: '4 Checks · vor 17:00',
    eventLabel: 'Während der Veranstaltung gebaut',
    eventMeta: '35 Kreationen · ab 17:06',
    builtAt: 'gebaut um'
  },
  tasks: {
    sectionLabel: 'Aufgabenkarten',
    heading: 'Ideen zum Mitnehmen',
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
    heading: 'Alltagssprache rein, Webseite raus',
    intro:
      'Auf jedem Rechner lief WebStorm{1} mit dem Claude-Code-Plugin{2}. Besucher:innen beschrieben in Alltagssprache, was sie wollten. Claude{3} schrieb HTML, CSS und JavaScript, speicherte alles in eine Datei und öffnete sie im Browser. Wenn etwas nicht passte, wurden Änderungswünsche wieder in Alltagssprache mit Claude diskutiert — oder ein Blick hinter die Kulissen auf den Quellcode gewagt.',
    footnotes: [
      {
        term: 'WebStorm',
        body: 'JetBrains’ Editor für Webentwicklung.',
        href: 'https://www.jetbrains.com/webstorm/',
        hrefLabel: 'jetbrains.com/webstorm'
      },
      {
        term: 'Claude-Code-Plugin',
        body: 'Anthropics Plugin für JetBrains-IDEs.',
        href: 'https://plugins.jetbrains.com/plugin/27310-claude-code',
        hrefLabel: 'plugins.jetbrains.com/plugin/27310-claude-code'
      },
      {
        term: 'Claude',
        body: 'Anthropics Claude Code — das KI-Werkzeug, das im Plugin steckt.',
        href: 'https://www.anthropic.com/claude-code',
        hrefLabel: 'anthropic.com/claude-code'
      }
    ],
    footnotesLabel: 'Anmerkungen',
    footnoteBackLabel: 'Zurück zum Text',
    processPhoto: {
      alt: 'Eine Entwicklungsumgebung mit WebStorm und Claude Code links und einer Live-Vorschau einer Wetter-Webseite rechts.',
      caption:
        'Der Stationsaufbau im Kleinen: Quellcode, Claude-Code-Gespräch und Browser-Vorschau nebeneinander.'
    },
    process: [
      { label: '1 · Beschreiben', text: 'Eine Person beschreibt ihre Idee.' },
      { label: '2 · Generieren', text: 'Claude erstellt eine Webseite.' },
      { label: '3 · Öffnen', text: 'Das Ergebnis gibt’s im Browser.' },
      { label: '4 · Ändern', text: 'Änderungen werden diskutiert.' }
    ],
    promptIntro:
      'Bevor Besucher:innen kamen, bekam Claude einen kleinen Spickzettel: Was für eine Veranstaltung das war, wie Dateien heißen sollten und wie die Arbeit für Menschen ohne Programmiererfahrung angenehm bleibt. Technisch war das eine CLAUDE.md-Datei. An der Station waren es einfach die Hausregeln für den Assistenten.',
    promptDocument: {
      label: 'Dokument — Hausregeln, an den Assistenten ausgehändigt',
      stamp: 'Vertraulich · Intern',
      footerLeft: '¶ Seite 1 von 1 · Hausregeln, ungekürzt',
      footerMiddle: 'Gegenzeichnung JG ✓',
      footerRight: 'Druckfreigabe · 24. IV. MMXXVI · 12:55 Uhr'
    }
  },
  team: {
    sectionLabel: 'Wer wir sind',
    heading: 'Das Team an der Station',
    colophon:
      'Diese Gazette sammelt, was an Station U27 zwischen 17 und 23 Uhr ausprobiert, verworfen, repariert und gespeichert wurde.'
  },
  footer: {
    officialPage: 'Offizielle Stationsseite',
    repo: 'Quellcode',
    folio: 'Die U27 Gazette · Ausgabe I · 24.IV.MMXXVI'
  },
  creationPage: {
    backToIndex: '← Zurück zum Index',
    previous: '← Vorige Kreation',
    next: 'Nächste Kreation →',
    firstEntry: 'Erste Kreation',
    lastEntry: 'Letzte Kreation',
    entryLabel: 'Nr.',
    openStandalone: 'Eigenständige Seite öffnen'
  }
};

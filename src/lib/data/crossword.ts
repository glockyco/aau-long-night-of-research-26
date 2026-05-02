/**
 * Crossword layouts for the U27 Gazette back page.
 * Words and clues are hand-picked; positions were generated locally
 * via beam search and committed verbatim so the puzzle is reproducible.
 */

export type Direction = 'across' | 'down';

export interface CrosswordEntry {
  num: number;
  dir: Direction;
  row: number;
  col: number;
  len: number;
  answer: string;
  clue: string;
}

export interface KeywordCell {
  index: number;
  row: number;
  col: number;
}

export interface CrosswordKeyword {
  word: string;
  cells: readonly KeywordCell[];
}

export interface CrosswordData {
  rows: number;
  cols: number;
  entries: readonly CrosswordEntry[];
  keyword: CrosswordKeyword;
}

export const crosswordDe: CrosswordData = {
  rows: 10,
  cols: 15,
  entries: [
    {
      num: 1,
      dir: 'down',
      row: 0,
      col: 6,
      len: 10,
      answer: 'KLAGENFURT',
      clue: 'Hauptstadt Kärntens'
    },
    {
      num: 2,
      dir: 'down',
      row: 1,
      col: 11,
      len: 9,
      answer: 'LEERTASTE',
      clue: 'Häufigste gebundene Taste in den Kreationen'
    },
    {
      num: 3,
      dir: 'down',
      row: 2,
      col: 0,
      len: 7,
      answer: 'BROWSER',
      clue: 'Programm, das jede Kreation öffnete'
    },
    {
      num: 4,
      dir: 'down',
      row: 2,
      col: 4,
      len: 8,
      answer: 'WEBSEITE',
      clue: 'Was am Abend rund 91 Mal entstand'
    },
    {
      num: 5,
      dir: 'down',
      row: 2,
      col: 9,
      len: 8,
      answer: 'TASTATUR',
      clue: 'Gerät mit Tasten'
    },
    {
      num: 6,
      dir: 'across',
      row: 3,
      col: 3,
      len: 4,
      answer: 'SERG',
      clue: 'Forschungsgruppe, die Station U27 betreute'
    },
    {
      num: 7,
      dir: 'across',
      row: 3,
      col: 8,
      len: 7,
      answer: 'GAZETTE',
      clue: 'Was Sie gerade lesen — die U27 ___'
    },
    {
      num: 8,
      dir: 'across',
      row: 5,
      col: 8,
      len: 7,
      answer: 'STATION',
      clue: 'Mitmachpunkt bei der Langen Nacht — unserer trug die Nummer 27'
    },
    {
      num: 9,
      dir: 'across',
      row: 6,
      col: 0,
      len: 8,
      answer: 'SCHLEIFE',
      clue: 'Programmstruktur, die sich wiederholt'
    },
    {
      num: 10,
      dir: 'across',
      row: 9,
      col: 2,
      len: 11,
      answer: 'WOERTHERSEE',
      clue: 'See unweit der AAU'
    }
  ],
  keyword: {
    word: 'HEUREKA',
    cells: [
      { index: 1, row: 6, col: 2 },
      { index: 2, row: 3, col: 4 },
      { index: 3, row: 7, col: 6 },
      { index: 4, row: 8, col: 0 },
      { index: 5, row: 3, col: 11 },
      { index: 6, row: 0, col: 6 },
      { index: 7, row: 5, col: 10 }
    ]
  }
};

export const crosswordEn: CrosswordData = {
  rows: 9,
  cols: 15,
  entries: [
    {
      num: 1,
      dir: 'down',
      row: 0,
      col: 3,
      len: 7,
      answer: 'GAZETTE',
      clue: "What you're reading right now — the U27 ___"
    },
    {
      num: 2,
      dir: 'down',
      row: 0,
      col: 5,
      len: 8,
      answer: 'KEYBOARD',
      clue: 'Has keys and sat at every workbench'
    },
    {
      num: 3,
      dir: 'down',
      row: 0,
      col: 9,
      len: 8,
      answer: 'CREATION',
      clue: 'One of 39 in the public index'
    },
    {
      num: 4,
      dir: 'across',
      row: 1,
      col: 1,
      len: 10,
      answer: 'KLAGENFURT',
      clue: 'Capital of Carinthia'
    },
    {
      num: 5,
      dir: 'down',
      row: 2,
      col: 11,
      len: 7,
      answer: 'WEBPAGE',
      clue: 'What got built about 91 times that evening'
    },
    {
      num: 6,
      dir: 'across',
      row: 3,
      col: 7,
      len: 8,
      answer: 'SPACEBAR',
      clue: 'Most-bound key across all creations'
    },
    {
      num: 7,
      dir: 'across',
      row: 4,
      col: 0,
      len: 7,
      answer: 'STATION',
      clue: 'Hands-on point at the Long Night — ours was number 27'
    },
    {
      num: 7,
      dir: 'down',
      row: 4,
      col: 0,
      len: 4,
      answer: 'SERG',
      clue: 'Research group that ran Station U27'
    },
    {
      num: 8,
      dir: 'across',
      row: 6,
      col: 0,
      len: 8,
      answer: 'RESEARCH',
      clue: 'Methodical pursuit of new knowledge — what AAU does year-round'
    },
    {
      num: 9,
      dir: 'across',
      row: 7,
      col: 9,
      len: 5,
      answer: 'NIGHT',
      clue: 'The Long ___ of Research'
    }
  ],
  keyword: {
    word: 'EUREKA',
    cells: [
      { index: 1, row: 3, col: 11 },
      { index: 2, row: 1, col: 8 },
      { index: 3, row: 6, col: 0 },
      { index: 4, row: 8, col: 11 },
      { index: 5, row: 0, col: 5 },
      { index: 6, row: 4, col: 2 }
    ]
  }
};

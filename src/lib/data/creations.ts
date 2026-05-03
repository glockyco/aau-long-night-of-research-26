import { z } from 'zod';

export const MOBILE_STATES = ['yes', 'limited', 'no'] as const;
export type MobileState = (typeof MOBILE_STATES)[number];

export const PLAYER_COUNTS = [1, 2, 3, 4] as const;
export type PlayerCount = (typeof PLAYER_COUNTS)[number];

export const creationSchema = z.object({
  /** Stable URL slug — typically `<filename-stem>-<HHMM>`. */
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Source filename in `creations/`. Spaces allowed (some files have them). */
  filename: z.string().regex(/\.html$/),
  /** The visitor's chosen title — left in its original language. */
  titleNative: z.string(),
  /** Time of day from filename, formatted as HH:MM. */
  builtAt: z.string().regex(/^\d{2}:\d{2}$/),
  /** Path under /creations/ — produced by the thumbnail capture script. */
  thumbnail: z.string().regex(/^\/creations\/[a-z0-9-]+\.webp$/),
  /**
   * How well the creation plays on a phone:
   * - `yes`     — touch-native or has a real touch fallback (swipe / on-screen buttons).
   * - `limited` — opens and runs but the input mismatch makes it awkward
   *               (e.g. mouse-precision aiming with no touch alternative).
   * - `no`      — keyboard required, no fallback; the page loads but you can't play.
   */
  mobile: z.enum(MOBILE_STATES),
  /** Maximum number of humans the creation supports on a single device. */
  players: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
});

export type Creation = z.infer<typeof creationSchema>;

/** Returns true when the entry is comfortable on a phone (filter rule). */
export function isMobileFriendly(creation: Creation): boolean {
  return creation.mobile !== 'no';
}

/** Returns true when at least two humans are needed/supported. */
export function isMultiplayer(creation: Creation): boolean {
  return creation.players > 1;
}

export const creations: Creation[] = [
  {
    slug: 'wuerfelspiel-1323',
    filename: '20260424-1323-wuerfelspiel.html',
    titleNative: 'Würfelspiel',
    builtAt: '13:23',
    thumbnail: '/creations/wuerfelspiel-1323.webp',
    mobile: 'yes',
    players: 2
  },
  {
    slug: 'osterhase-1332',
    filename: '20260424-1332-osterhase.html',
    titleNative: 'Osterhase',
    builtAt: '13:32',
    thumbnail: '/creations/osterhase-1332.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'oesterreich-quiz-1333',
    filename: '20260424-1333-oesterreich-quiz.html',
    titleNative: 'Österreich-Quiz',
    builtAt: '13:33',
    thumbnail: '/creations/oesterreich-quiz-1333.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'jump-and-run-1350',
    filename: '20260424-1350-jump-and-run.html',
    titleNative: 'Jump & Run',
    builtAt: '13:50',
    thumbnail: '/creations/jump-and-run-1350.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'reaktionstest-1706',
    filename: '20260424-1706-reaktionstest.html',
    titleNative: 'Reaktionstest',
    builtAt: '17:06',
    thumbnail: '/creations/reaktionstest-1706.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'jump-and-run-1714',
    filename: '20260424-1714-jump-and-run.html',
    titleNative: 'Jump & Run – 2 Spieler',
    builtAt: '17:14',
    thumbnail: '/creations/jump-and-run-1714.webp',
    mobile: 'no',
    players: 2
  },
  {
    slug: 'wetter-klagenfurt-1720',
    filename: '20260424-1720-wetter-klagenfurt.html',
    titleNative: 'Wetter Klagenfurt',
    builtAt: '17:20',
    thumbnail: '/creations/wetter-klagenfurt-1720.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'wuerfelquiz-1723',
    filename: '20260424-1723-wuerfelquiz.html',
    titleNative: 'Würfelquiz – Höher oder Tiefer?',
    builtAt: '17:23',
    thumbnail: '/creations/wuerfelquiz-1723.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'koalabear-1744',
    filename: '20260424-1744-koalabear.html',
    titleNative: 'Koalabär',
    builtAt: '17:44',
    thumbnail: '/creations/koalabear-1744.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'monopoly-1746',
    filename: '20260424-1746-monopoly.html',
    titleNative: 'Monopoly',
    builtAt: '17:46',
    thumbnail: '/creations/monopoly-1746.webp',
    mobile: 'yes',
    players: 4
  },
  {
    slug: 'snake-1750',
    filename: '20260424-1750-snake.html',
    titleNative: 'Snake',
    builtAt: '17:50',
    thumbnail: '/creations/snake-1750.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'zeichenprogramm-1755',
    filename: '20260424-1755-zeichenprogramm.html',
    titleNative: 'Zeichenprogramm',
    builtAt: '17:55',
    thumbnail: '/creations/zeichenprogramm-1755.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'reaktionstest-1803',
    filename: '20260424-1803-reaktionstest.html',
    titleNative: 'Reaktionstest',
    builtAt: '18:03',
    thumbnail: '/creations/reaktionstest-1803.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'hundespiel-1813',
    filename: '20260424-1813-hundespiel.html',
    titleNative: 'Hundespiel',
    builtAt: '18:13',
    thumbnail: '/creations/hundespiel-1813.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'memoryspiel-1820',
    filename: '20260424-1820-memoryspiel.html',
    titleNative: 'Memory Spiel',
    builtAt: '18:20',
    thumbnail: '/creations/memoryspiel-1820.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'jump-and-run-1826',
    filename: '20260424-1826-jump-and-run.html',
    titleNative: 'Jump & Run',
    builtAt: '18:26',
    thumbnail: '/creations/jump-and-run-1826.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'tiere-quiz-1844',
    filename: '20260424-1844-tiere-quiz.html',
    titleNative: 'Tiere Quiz',
    builtAt: '18:44',
    thumbnail: '/creations/tiere-quiz-1844.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'weihnachtsbaum-1850',
    filename: '20260424-1850-weihnachtsbaum.html',
    titleNative: 'Frohe Weihnachten!',
    builtAt: '18:50',
    thumbnail: '/creations/weihnachtsbaum-1850.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'wuerfelspiel-1928',
    filename: '20260424-1928-wuerfelspiel.html',
    titleNative: 'Würfelspiel',
    builtAt: '19:28',
    thumbnail: '/creations/wuerfelspiel-1928.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'slot-maschine-1932',
    filename: '20260424-1932-slot-maschine.html',
    titleNative: 'Slot Maschine',
    builtAt: '19:32',
    thumbnail: '/creations/slot-maschine-1932.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'memory-spiel-1934',
    filename: '20260424-1934-memory-spiel.html',
    titleNative: 'Memory Spiel',
    builtAt: '19:34',
    thumbnail: '/creations/memory-spiel-1934.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'platformer-1955',
    filename: '20260424-1955-platformer.html',
    titleNative: 'Jump & Run',
    builtAt: '19:55',
    thumbnail: '/creations/platformer-1955.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'autorennspiel-2018',
    filename: '20260424-2018-autorennspiel.html',
    titleNative: 'Autorennspiel',
    builtAt: '20:18',
    thumbnail: '/creations/autorennspiel-2018.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'autorennspiel-2022',
    filename: '20260424-2022-autorennspiel.html',
    titleNative: 'Autorennen',
    builtAt: '20:22',
    thumbnail: '/creations/autorennspiel-2022.webp',
    mobile: 'yes',
    players: 3
  },
  {
    slug: 'lamborghini-racer-2026',
    filename: '20260424-2026-lamborghini-racer.html',
    titleNative: 'Lamborghini Racer',
    builtAt: '20:26',
    thumbnail: '/creations/lamborghini-racer-2026.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'tron-lightcycle-2034',
    filename: '20260424-2034-tron-lightcycle.html',
    titleNative: 'TRON Lightcycle Race',
    builtAt: '20:34',
    thumbnail: '/creations/tron-lightcycle-2034.webp',
    mobile: 'no',
    players: 2
  },
  {
    slug: 'casino-2036',
    filename: '20260424-2036-casino.html',
    titleNative: 'Casino Royale',
    builtAt: '20:36',
    thumbnail: '/creations/casino-2036.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'space-blaster-2039',
    filename: '20260424-2039-space-blaster.html',
    titleNative: 'Space Blaster 2P',
    builtAt: '20:39',
    thumbnail: '/creations/space-blaster-2039.webp',
    mobile: 'no',
    players: 2
  },
  {
    slug: 'fangspiel-2043',
    filename: '20260424-2043-fangspiel.html',
    titleNative: 'Fangspiel – 3 Spieler',
    builtAt: '20:43',
    thumbnail: '/creations/fangspiel-2043.webp',
    mobile: 'no',
    players: 3
  },
  {
    slug: 'darts-301-2104',
    filename: '20260424-2104-darts-301.html',
    titleNative: 'Darts 301 – Harpunen Edition',
    builtAt: '21:04',
    thumbnail: '/creations/darts-301-2104.webp',
    mobile: 'yes',
    players: 2
  },
  {
    slug: 'candy-crush-2106',
    filename: '20260424-2106-candy-crush.html',
    titleNative: 'Candy Crush',
    builtAt: '21:06',
    thumbnail: '/creations/candy-crush-2106.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'defender-highway-2113',
    filename: '20260424-2113-defender-highway.html',
    titleNative: 'Defender Highway',
    builtAt: '21:13',
    thumbnail: '/creations/defender-highway-2113.webp',
    mobile: 'limited',
    players: 1
  },
  {
    slug: 'weihnachtsbaum-deko-2115',
    filename: '20260424-2115-weihnachtsbaum-deko.html',
    titleNative: 'Weihnachtsbaum Zeichenprogramm',
    builtAt: '21:15',
    thumbnail: '/creations/weihnachtsbaum-deko-2115.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'verstecken-spiel-2135',
    filename: '20260424-2135-verstecken-spiel.html',
    titleNative: 'Versteckspiel',
    builtAt: '21:35',
    thumbnail: '/creations/verstecken-spiel-2135.webp',
    mobile: 'yes',
    players: 1
  },
  {
    slug: 'billard-2143',
    filename: '20260424-2143-billard.html',
    titleNative: 'Billard',
    builtAt: '21:43',
    thumbnail: '/creations/billard-2143.webp',
    mobile: 'limited',
    players: 1
  },
  {
    slug: 'jump-and-run-2201',
    filename: '20260424-2201-jump-and-run.html',
    titleNative: 'Jump & Run',
    builtAt: '22:01',
    thumbnail: '/creations/jump-and-run-2201.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'space-shooter-2208',
    filename: '20260424-2208-space-shooter.html',
    titleNative: 'Space Shooter — R-Type Style',
    builtAt: '22:08',
    thumbnail: '/creations/space-shooter-2208.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'tetris-2208',
    filename: '20260424-2208-tetris.html',
    titleNative: 'Tetris',
    builtAt: '22:08',
    thumbnail: '/creations/tetris-2208.webp',
    mobile: 'no',
    players: 1
  },
  {
    slug: 'pulse-roguelike-2222',
    filename: '20260424-2222-pulse-roguelike.html',
    titleNative: 'PULSE — Roguelike',
    builtAt: '22:22',
    thumbnail: '/creations/pulse-roguelike-2222.webp',
    mobile: 'no',
    players: 1
  }
];

import { z } from 'zod';

const localizedSchema = z.object({
  title: z.string(),
  goal: z.string(),
  checklist: z.array(z.string()),
  extensions: z.array(z.object({ text: z.string() }))
});

export const taskSchema = z.object({
  id: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  color: z.string(),
  image: z.string(),
  de: localizedSchema,
  en: localizedSchema
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
export type Difficulty = Task['difficulty'];

export const tasks: Task[] = [
  {
    id: 'e1',
    difficulty: 'easy',
    color: '#22c55e',
    image: '/tasks/screenshots/e1-dice-roller.png',
    de: {
      title: 'Würfelspiel',
      goal: 'Erstelle eine Webseite, auf der man würfeln kann.',
      checklist: [
        'Zeigt der Würfel Punkte wie ein echter Würfel (nicht nur eine Zahl)?',
        'Gibt es eine Animation beim Würfeln?',
        'Kann man auswählen, mit wie vielen Würfeln man würfelt?'
      ],
      extensions: [
        { text: 'Füge einen Wett-Modus hinzu: Rate ob der nächste Wurf höher oder niedriger wird' },
        { text: 'Konfetti-Explosion wenn man die höchste Zahl würfelt' },
        { text: 'Mach die Würfel dreidimensional mit einer echten Wurf-Animation' }
      ]
    },
    en: {
      title: 'Dice Roller',
      goal: 'Build a webpage where you can roll dice.',
      checklist: [
        'Does the die show dots arranged like a real die (not just a number)?',
        'Is there an animation when you roll?',
        'Can you choose how many dice to roll?'
      ],
      extensions: [
        { text: 'Add a betting mode: guess if the next roll will be higher or lower' },
        { text: 'Confetti explosion when you roll the highest number' },
        { text: 'Make the dice 3D with a real tumbling animation' }
      ]
    }
  },
  {
    id: 'e2',
    difficulty: 'easy',
    color: '#22c55e',
    image: '/tasks/screenshots/e2-reaction-time.png',
    de: {
      title: 'Reaktionstest',
      goal: 'Erstelle ein Spiel, das testet, wie schnell du klicken kannst, wenn sich die Farbe ändert.',
      checklist: [
        'Ändert sich die Farbe zu einem zufälligen Zeitpunkt (nicht vorhersehbar)?',
        'Endet das Spiel nach einer festen Rundenanzahl (z.B. 5) mit einem Endergebnis?',
        'Erkennt es, wenn du zu früh klickst (Schummeln)?'
      ],
      extensions: [
        { text: 'Füge einen Farb-Modus hinzu: Nur bei Grün klicken, bei Rot NICHT klicken' },
        { text: 'Zeige nach jeder Runde einen Tier-Vergleich ("So schnell wie eine Katze!")' },
        {
          text: 'Zeige nach allen Runden deine Reaktionszeiten als Grafik (wirst du schneller oder langsamer?)'
        }
      ]
    },
    en: {
      title: 'Reaction Time Test',
      goal: 'Build a game that tests how fast you can click when a color changes.',
      checklist: [
        'Does the screen change color at a random time (not predictable)?',
        'Does the game end after a set number of rounds (e.g. 5) with a final score?',
        'Does it catch you if you click too early (cheating)?'
      ],
      extensions: [
        { text: 'Add a go/no-go mode — click on green, but do NOT click on red' },
        { text: 'Show an animal speed comparison after each round ("Fast as a cat!")' },
        {
          text: 'After all rounds, show your reaction times as a graph (are you getting faster?)'
        }
      ]
    }
  },
  {
    id: 'e3',
    difficulty: 'easy',
    color: '#22c55e',
    image: '/tasks/screenshots/e3-quiz-game.png',
    de: {
      title: 'Quizspiel',
      goal: 'Erstelle ein Quiz zu einem Thema deiner Wahl (Österreich, Tiere, Sport, Filme...).',
      checklist: [
        'Stimmen die Fragen tatsächlich? (Schau nach!)',
        'Gibt es einen Countdown-Timer pro Frage?',
        'Wird die richtige Antwort angezeigt, wenn man falsch liegt?'
      ],
      extensions: [
        {
          text: 'Füge einen 50:50-Joker hinzu, der zwei falsche Antworten entfernt (einmal pro Spiel)'
        },
        {
          text: 'Zeige am Ende eine Übersicht aller Fragen mit deinen und den richtigen Antworten'
        },
        { text: 'Die Fragen werden immer schwieriger — leichte am Anfang, schwere am Ende' }
      ]
    },
    en: {
      title: 'Quiz Game',
      goal: 'Build a quiz about a topic you like (Austria, animals, sports, movies...).',
      checklist: [
        'Are the questions actually correct? (Look them up!)',
        'Is there a countdown timer for each question?',
        'Does it tell you the right answer when you guess wrong?'
      ],
      extensions: [
        { text: 'Add a 50:50 lifeline that removes two wrong answers (usable once)' },
        {
          text: 'At the end, show a summary of all questions with your answers and the correct ones'
        },
        { text: 'Questions get harder as you go — easy ones first, hard ones at the end' }
      ]
    }
  },
  {
    id: 'm1',
    difficulty: 'medium',
    color: '#eab308',
    image: '/tasks/screenshots/m1-christmas-tree.png',
    de: {
      title: 'Weihnachtsbaum',
      goal: 'Lass die KI einen geschmückten Weihnachtsbaum zeichnen.',
      checklist: [
        'Gibt es einen Stern an der Spitze?',
        'Kannst du selbst Kugeln an den Baum hängen (z.B. durch Klicken)?',
        'Gibt es Animationen (blinkende Lichter, fallender Schnee...)?',
        'Kannst du eine persönliche Nachricht unter dem Baum anzeigen lassen?'
      ],
      extensions: [
        { text: 'Klicke auf den Baum um ihn zu schütteln — alle Kugeln fallen herunter' },
        {
          text: 'Füge einen "Mehr Schnee!"-Knopf hinzu, der die Schneeflocken jedes Mal verdoppelt'
        },
        {
          text: 'Füge einen Knopf hinzu, der jedes Mal einen komplett neuen, zufälligen Baum erzeugt'
        }
      ]
    },
    en: {
      title: 'Christmas Tree',
      goal: 'Get the AI to draw a decorated Christmas tree.',
      checklist: [
        'Is there a star on top?',
        'Can you place ornaments yourself by clicking on the tree?',
        'Are there animations (blinking lights, falling snow...)?',
        'Can you write a personal greeting that appears below the tree?'
      ],
      extensions: [
        { text: 'Click the tree to shake it — all the ornaments fall off' },
        { text: 'Add a "more snow!" button that doubles the snowflakes each press' },
        { text: 'Add a button that generates a completely new random tree each time' }
      ]
    }
  },
  {
    id: 'm2',
    difficulty: 'medium',
    color: '#eab308',
    image: '/tasks/screenshots/m2-memory-game.png',
    de: {
      title: 'Memory-Spiel',
      goal: 'Erstelle das klassische Memory-Kartenspiel.',
      checklist: [
        'Drehen sich die Karten mit einer Animation um, wenn man sie anklickt?',
        'Werden die Züge gezählt und wird angezeigt, wenn man gewonnen hat?',
        'Kann man ein Kartenthema wählen (Tiere, Flaggen, Essen...)?',
        'Merkt sich das Spiel deine beste Runde (wenigste Züge)?'
      ],
      extensions: [
        {
          text: 'Chaos-Modus: Nicht gefundene Karten tauschen nach jedem Aufdecken ihre Positionen'
        },
        { text: 'Füge einen "Spicken"-Knopf hinzu, der alle Karten für 1 Sekunde aufdeckt' },
        { text: 'Gefundene Paare machen eine kleine Tanz-Animation bevor sie verschwinden' }
      ]
    },
    en: {
      title: 'Memory Game',
      goal: 'Build the classic Memory card-matching game.',
      checklist: [
        'Do the cards flip with an animation when you click them?',
        'Does it count your moves and tell you when you win?',
        'Can you pick a card theme (animals, flags, food...)?',
        'Does it remember your best round (fewest moves)?'
      ],
      extensions: [
        { text: 'Chaos mode: unmatched cards swap positions after every guess' },
        { text: 'Add a "peek" button that flips all cards face-up for 1 second' },
        { text: 'Matched pairs do a little victory dance before disappearing' }
      ]
    }
  },
  {
    id: 'm3',
    difficulty: 'medium',
    color: '#eab308',
    image: '/tasks/screenshots/m3-weather-display.png',
    de: {
      title: 'Wetteranzeige',
      goal: 'Erstelle eine Webseite, die das aktuelle Wetter für Klagenfurt anzeigt.',
      checklist: [
        'Zeigt es echte, aktuelle Daten (keine erfundenen Zahlen)?',
        'Zeigt es eine Vorhersage für die nächsten Tage?',
        'Gibt es eine Empfehlung was man anziehen soll (z.B. "Nimm eine Jacke mit!")?',
        'Ändert sich der Hintergrund passend zum Wetter (blau bei Sonne, grau bei Wolken)?'
      ],
      extensions: [
        {
          text: 'Zeige eine Figur, die sich passend zum Wetter anzieht (Sonnenbrille, Regenjacke, Schal...)'
        },
        {
          text: 'Füge einen Zeitreise-Schieberegler hinzu: Sieh wie das Wetter gestern war und morgen wird'
        },
        {
          text: 'Zeige animierte Wetter-Szenen (fallender Regen, ziehende Wolken) statt nur Emoji-Symbole'
        }
      ]
    },
    en: {
      title: 'Weather Display',
      goal: 'Build a webpage that shows the current weather for Klagenfurt.',
      checklist: [
        'Does it show real current data (not made-up numbers)?',
        'Does it show a forecast for the next days?',
        'Does it recommend what to wear (e.g. "Bring a jacket!")?',
        'Does the background change to match the weather (blue for sunny, grey for cloudy)?'
      ],
      extensions: [
        {
          text: 'Show a character that changes clothes based on the weather (sunglasses, raincoat, scarf...)'
        },
        { text: 'Add a "time travel" slider to explore yesterday\'s and tomorrow\'s weather' },
        {
          text: 'Add animated weather scenes (falling rain, moving clouds) instead of just emoji icons'
        }
      ]
    }
  },
  {
    id: 'h1',
    difficulty: 'hard',
    color: '#ef4444',
    image: '/tasks/screenshots/h1-snake-game.png',
    de: {
      title: 'Snake-Spiel',
      goal: 'Erstelle das klassische Snake-Spiel, steuerbar mit den Pfeiltasten.',
      checklist: [
        'Wächst die Schlange, wenn sie Futter frisst?',
        'Endet das Spiel, wenn man gegen die Wand oder sich selbst stößt?',
        'Wird die Schlange schneller, je länger sie wird?',
        'Gibt es einen Highscore, der über mehrere Runden erhalten bleibt?'
      ],
      extensions: [
        {
          text: 'Portal-Modus: Zwei Portale auf dem Feld — die Schlange geht rein und kommt am anderen raus'
        },
        { text: 'Regenbogen-Schlange: Jedes Segment hat eine andere Farbe des Regenbogens' },
        { text: 'Verwirr-Futter: Ein spezielles Futter dreht die Steuerung für 10 Sekunden um' }
      ]
    },
    en: {
      title: 'Snake Game',
      goal: 'Build the classic Snake game, playable with arrow keys.',
      checklist: [
        'Does the snake grow when it eats food?',
        'Does the game end when you hit the wall or yourself?',
        'Does the snake speed up as it gets longer?',
        'Does it remember your high score across multiple rounds?'
      ],
      extensions: [
        {
          text: 'Portal mode: two portals on the field — the snake enters one and exits the other'
        },
        { text: 'Rainbow snake: each segment is a different color of the rainbow' },
        { text: 'Poison food: a special food that flips your controls for 10 seconds' }
      ]
    }
  },
  {
    id: 'h2',
    difficulty: 'hard',
    color: '#ef4444',
    image: '/tasks/screenshots/h2-drawing-tool.png',
    de: {
      title: 'Zeichenprogramm',
      goal: 'Erstelle ein einfaches Zeichenprogramm, das im Browser funktioniert.',
      checklist: [
        'Kann man Farbe und Pinselgröße ändern?',
        'Gibt es einen Radierer?',
        'Kann man Stempel platzieren (Sterne, Herzen, Smileys)?',
        'Kann man Text in die Zeichnung schreiben?'
      ],
      extensions: [
        {
          text: 'Füge einen Regenbogen-Pinsel hinzu, der beim Zeichnen automatisch die Farbe wechselt'
        },
        {
          text: 'Füge einen Zeitraffer hinzu, der zeigt wie die Zeichnung Schritt für Schritt entstanden ist'
        },
        { text: 'Schwerkraft-Farbe: Deine Pinselstriche tropfen langsam nach unten' }
      ]
    },
    en: {
      title: 'Drawing Tool',
      goal: 'Build a simple drawing program that works in the browser.',
      checklist: [
        'Can you change color and brush size?',
        'Is there an eraser?',
        'Can you place stamps or stickers (stars, hearts, smiley faces)?',
        'Can you write text on the drawing?'
      ],
      extensions: [
        { text: 'Add a rainbow brush that automatically cycles through colors as you draw' },
        { text: 'Add a time-lapse replay that shows how the drawing was created step by step' },
        { text: 'Gravity paint: your brush strokes slowly drip downward after you draw them' }
      ]
    }
  },
  {
    id: 'h3',
    difficulty: 'hard',
    color: '#ef4444',
    image: '/tasks/screenshots/h3-platformer.png',
    de: {
      title: 'Jump-and-Run',
      goal: 'Erstelle ein einfaches Jump-and-Run-Spiel, in dem eine Figur zwischen Plattformen springt.',
      checklist: [
        'Kann die Figur laufen und springen?',
        'Gibt es etwas zu sammeln (Münzen, Sterne)?',
        'Gibt es ein klar erkennbares Ziel am Ende (Flagge, Tür, Ausgang)?',
        'Gibt es bewegliche Plattformen, bei denen man den Sprung timen muss?'
      ],
      extensions: [
        {
          text: 'Schwerkraft-Knopf: Drücke einen Knopf und die Schwerkraft dreht sich um — du läufst an der Decke'
        },
        {
          text: 'Taschenlampen-Modus: Das Level ist dunkel, nur der Bereich um deine Figur ist sichtbar'
        },
        {
          text: 'Der Boden ist Lava: Plattformen sinken langsam ab, nachdem du darauf gelandet bist'
        }
      ]
    },
    en: {
      title: 'Platformer',
      goal: 'Build a simple jump-and-run game where a character jumps between platforms.',
      checklist: [
        'Can the character run and jump?',
        'Is there something to collect (coins, stars)?',
        'Is there a clear finish at the end (flag, door, goal)?',
        'Are there moving platforms you need to time your jumps for?'
      ],
      extensions: [
        { text: 'Gravity flip: press a button to flip gravity and walk on the ceiling' },
        {
          text: 'Flashlight mode: the level is dark, only the area around your character is visible'
        },
        { text: 'The floor is lava: platforms slowly sink after you land on them' }
      ]
    }
  }
];

export function tasksByDifficulty(diff: Difficulty): Task[] {
  return tasks.filter((task) => task.difficulty === diff);
}

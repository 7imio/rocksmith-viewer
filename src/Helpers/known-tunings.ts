export const KNOWN_TUNINGS: Record<string, string> = {
  // Guitar standard
  "E A D G B E": "E Standard",
  "D# G# C# F# A# D#": "D# Standard",
  "D G C F A D": "D Standard",
  "C# F# B E G# C#": "C# Standard",
  "C F A# D# G C": "C Standard",
  "B E A D F# B": "B Standard",
  "A# D# G# C# F A#": "A# Standard",
  "A D G C F A": "A Standard",

  // Guitar drop
  "D A D G B E": "E Drop D",
  "C# G# C# F# A# D#": "D# Drop C#",
  "C G C F A D": "D Drop C",
  "B F# B E G# C#": "C# Drop B",
  "A# F A# D# G C": "C Drop A#",
  "A E A D F# B": "B Drop A",
  "G# D# G# C# F A#": "A# Drop G#",
  "G D G C F A": "A Drop G",

  // Special guitar case
  "A G C F A D": "D Drop A (Mastodon alt)",

  // Bass standard
  "E A D G": "Bass E Standard",
  "D# G# C# F#": "Bass D# Standard",
  "D G C F": "Bass D Standard",
  "C# F# B E": "Bass C# Standard",
  "C F A# D#": "Bass C Standard",
  "B E A D": "Bass B Standard",
  "A# D# G# C#": "Bass A# Standard",

  // Bass drop
  "D A D G": "Bass E Drop D",
  "C# G# C# F#": "Bass D# Drop C#",
  "C G C F": "Bass D Drop C",
  "B F# B E": "Bass C# Drop B",
  "A# F A# D#": "Bass C Drop A#",
  "A E A D": "Bass B Drop A",
  "G# D# G# C#": "Bass A# Drop G#",

  // Open tunings
  "E B E G# B E": "Open E",
  "D A D F# A D": "Open D",
  "E A E A C# E": "Open A",
};

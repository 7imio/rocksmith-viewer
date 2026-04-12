export type Tuning = {
  string0: number;
  string1: number;
  string2: number;
  string3: number;
  string4: number;
  string5: number;
};

const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const getNoteIndex = (note: string): number => {
  return NOTES.indexOf(note);
};

const shiftNote = (note: string, semitoneShift: number): string => {
  const baseIndex = getNoteIndex(note);

  if (baseIndex === -1) return note;

  let newIndex = (baseIndex + semitoneShift) % 12;

  if (newIndex < 0) {
    newIndex += 12;
  }

  return NOTES[newIndex];
};

/**
 * Convert Rocksmith tuning to readable format
 * Example: "C# F# B E G# C#"
 */
export const formatTuning = (tuning: Tuning | null | undefined): string => {
  if (!tuning) return "Unknown tuning";

  const shifts = [
    tuning.string0,
    tuning.string1,
    tuning.string2,
    tuning.string3,
    tuning.string4,
    tuning.string5,
  ];

  const result = STANDARD_TUNING.map((note, index) => {
    const shift = shifts[index] ?? 0;
    return shiftNote(note, shift);
  });

  return result.join(" ");
};

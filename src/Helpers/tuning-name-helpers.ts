import type { CatalogArrangement } from "../types/catalog.types";
import { formatTuning } from "./tuning-helpers";
import { KNOWN_TUNINGS } from "./known-tunings";

export const getDisplayedTuningNotes = (
  arrangement: CatalogArrangement,
): string[] => {
  const formatted = formatTuning(arrangement.tuning);

  if (!formatted || formatted === "Unknown tuning") {
    return [];
  }

  const notes = formatted.split(" ");

  return arrangement.type === "bass" ? notes.slice(0, 4) : notes.slice(0, 6);
};

export const getTuningName = (arrangement: CatalogArrangement): string => {
  const displayedNotes = getDisplayedTuningNotes(arrangement);

  if (displayedNotes.length === 0) {
    return "Accordage Personnalisé";
  }

  const key = displayedNotes.join(" ");

  return KNOWN_TUNINGS[key] ?? key;
};

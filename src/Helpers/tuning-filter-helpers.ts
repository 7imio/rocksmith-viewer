import type { CatalogSong, CatalogArrangement } from "../types/catalog.types";
import { getTuningFilterName } from "./tuning-name-helpers";

export const SONG_SORT_FIELDS = [
  "songName",
  "artistName",
  "albumName",
  "tuning",
] as const;

export type SongSortField = (typeof SONG_SORT_FIELDS)[number];
export type SongSortDirection = "asc" | "desc";

export interface SongsFilterState {
  search: string;
  sortField: SongSortField;
  sortDirection: SongSortDirection;
  selectedTunings: string[];
}

const normalizeText = (value: string | null | undefined): string => {
  return (value ?? "").trim().toLowerCase();
};

export const getArrangementTuningName = (
  arrangement: CatalogArrangement,
): string => {
  return getTuningFilterName(arrangement);
};

export const getSongTuningNames = (song: CatalogSong): string[] => {
  return [...new Set(song.arrangements.map(getArrangementTuningName))];
};

export const getSongPrimaryTuningName = (song: CatalogSong): string => {
  const tunings = getSongTuningNames(song);
  return tunings[0] ?? "Unknown tuning";
};

export interface AvailableTuningOption {
  name: string;
  instrument: "guitar" | "bass";
}

export const getAvailableTunings = (
  songs: CatalogSong[] | null,
): AvailableTuningOption[] => {
  if (!songs || songs.length === 0) {
    return [];
  }

  const map = new Map<string, AvailableTuningOption>();

  for (const song of songs) {
    for (const arrangement of song.arrangements) {
      const name = getArrangementTuningName(arrangement);
      const instrument = arrangement.type === "bass" ? "bass" : "guitar";
      const key = `${instrument}::${name}`;

      if (!map.has(key)) {
        map.set(key, {
          name,
          instrument,
        });
      }
    }
  }

  return [...map.values()].sort((a, b) => {
    if (a.instrument !== b.instrument) {
      return a.instrument.localeCompare(b.instrument);
    }

    return a.name.localeCompare(b.name);
  });
};

export const getTuningNamesForInstrument = (
  songs: CatalogSong[] | null,
  instrument: "guitar" | "bass",
): string[] => {
  return getAvailableTunings(songs)
    .filter((tuning) => tuning.instrument === instrument)
    .map((tuning) => tuning.name);
};

export const songMatchesSearch = (
  song: CatalogSong,
  search: string,
): boolean => {
  const normalizedSearch = normalizeText(search);

  if (!normalizedSearch) {
    return true;
  }

  const title = normalizeText(song.songName);
  const artist = normalizeText(song.artistName);

  return title.includes(normalizedSearch) || artist.includes(normalizedSearch);
};

export const songMatchesSelectedTunings = (
  song: CatalogSong,
  selectedTunings: string[],
): boolean => {
  if (selectedTunings.length === 0) {
    return true;
  }

  const songTunings = getSongTuningNames(song);

  return songTunings.some((tuning) => selectedTunings.includes(tuning));
};

export const compareSongs = (
  a: CatalogSong,
  b: CatalogSong,
  sortField: SongSortField,
  sortDirection: SongSortDirection,
): number => {
  let aValue = "";
  let bValue = "";

  switch (sortField) {
    case "songName":
      aValue = normalizeText(a.songName);
      bValue = normalizeText(b.songName);
      break;
    case "artistName":
      aValue = normalizeText(a.artistName);
      bValue = normalizeText(b.artistName);
      break;
    case "albumName":
      aValue = normalizeText(a.albumName);
      bValue = normalizeText(b.albumName);
      break;
    case "tuning":
      aValue = normalizeText(getSongPrimaryTuningName(a));
      bValue = normalizeText(getSongPrimaryTuningName(b));
      break;
  }

  const comparison = aValue.localeCompare(bValue);

  return sortDirection === "asc" ? comparison : -comparison;
};

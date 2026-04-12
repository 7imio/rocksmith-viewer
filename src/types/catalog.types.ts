/* ----------------------------------
 * ROOT RESPONSE
 * ---------------------------------- */

export interface CatalogResponse {
  generatedAt: string;
  sourceRoot: string;
  stats: CatalogStats;
  songs: CatalogSong[];
  errors: CatalogError[];
}

/* ----------------------------------
 * STATS
 * ---------------------------------- */

export interface CatalogStats {
  psarcFilesScanned: number;
  songsCount: number;
  skippedNoSongData: number;
  errorCount: number;
}

/* ----------------------------------
 * SONG
 * ---------------------------------- */

export interface CatalogSong {
  /** Unique numeric ID (for !sr command) */
  id: number;

  /** Internal normalized ID (artist::song) */
  catalogId: string;

  songName: string | null;
  artistName: string | null;
  albumName: string | null;
  albumYear: number | null;

  /** Length in seconds */
  songLength: number | null;

  /** Available arrangement types */
  arrangementTypes: ArrangementType[];

  /** Total arrangements count */
  arrangementsCount: number;

  /** Detailed arrangements */
  arrangements: CatalogArrangement[];
}

/* ----------------------------------
 * ARRANGEMENT
 * ---------------------------------- */

export interface CatalogArrangement {
  type: ArrangementType;

  /** Guitar tuning (relative offsets) */
  tuning: GuitarTuning | null;

  /** Capo position */
  capo: number | null;
}

/* ----------------------------------
 * ENUMS / TYPES
 * ---------------------------------- */

export type ArrangementType = "lead" | "rhythm" | "bass" | "vocals" | "unknown";

/* ----------------------------------
 * TUNING
 * ---------------------------------- */

export interface GuitarTuning {
  string0: number;
  string1: number;
  string2: number;
  string3: number;
  string4: number;
  string5: number;
}

/* ----------------------------------
 * ERRORS
 * ---------------------------------- */

export interface CatalogError {
  psarcPath: string;
  error: string;
}

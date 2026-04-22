import { useMemo, useState } from "react";
import type { CatalogSong } from "../../types/catalog.types";
import Pagination from "./Pagination";
import SongCard from "./SongCard";
import SongsToolbar from "./SongsToolbar";
import {
  compareSongs,
  getAvailableTunings,
  getTuningNamesForInstrument,
  songMatchesSearch,
  songMatchesSelectedTunings,
  type SongsFilterState,
} from "../../Helpers/tuning-filter-helpers";

interface SongsListProps {
  songs: CatalogSong[] | null;
}

const SongsList = ({ songs }: SongsListProps) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<SongsFilterState>({
    search: "",
    sortField: "artistName",
    sortDirection: "asc",
    selectedTunings: [],
  });

  const availableTunings = useMemo(() => getAvailableTunings(songs), [songs]);

  const filteredSongs = useMemo(() => {
    if (!songs || songs.length === 0) {
      return [];
    }

    return songs
      .filter((song) => songMatchesSearch(song, filters.search))
      .filter((song) =>
        songMatchesSelectedTunings(song, filters.selectedTunings),
      )
      .sort((a, b) =>
        compareSongs(a, b, filters.sortField, filters.sortDirection),
      );
  }, [songs, filters]);

  const totalSongs = filteredSongs.length;
  const totalPages = totalSongs > 0 ? Math.ceil(totalSongs / displayCount) : 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedSongs = useMemo(() => {
    if (filteredSongs.length === 0) {
      return [];
    }

    const startIndex = (safeCurrentPage - 1) * displayCount;
    const endIndex = startIndex + displayCount;

    return filteredSongs.slice(startIndex, endIndex);
  }, [filteredSongs, safeCurrentPage, displayCount]);

  const handlePageChange = (page: number) => {
    const clampedPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clampedPage);
  };

  const updateFilters = (next: Partial<SongsFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...next,
    }));
    setCurrentPage(1);
  };

  const handleToggleTuning = (tuningName: string) => {
    const isSelected = filters.selectedTunings.includes(tuningName);

    updateFilters({
      selectedTunings: isSelected
        ? filters.selectedTunings.filter((tuning) => tuning !== tuningName)
        : [...filters.selectedTunings, tuningName],
    });
  };

  const handleSelectAllInstrumentTunings = (instrument: "guitar" | "bass") => {
    const tuningNames = getTuningNamesForInstrument(songs, instrument);

    updateFilters({
      selectedTunings: [
        ...new Set([...filters.selectedTunings, ...tuningNames]),
      ],
    });
  };

  const handleClearTunings = () => {
    updateFilters({
      selectedTunings: [],
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative z-20">
        <SongsToolbar
          search={filters.search}
          onSearchChange={(value) => updateFilters({ search: value })}
          totalResults={filteredSongs.length}
          sortField={filters.sortField}
          sortDirection={filters.sortDirection}
          onSortFieldChange={(value) => updateFilters({ sortField: value })}
          onSortDirectionChange={(value) =>
            updateFilters({ sortDirection: value })
          }
          availableTunings={availableTunings}
          selectedTunings={filters.selectedTunings}
          onToggleTuning={handleToggleTuning}
          onSelectAllGuitarTunings={() =>
            handleSelectAllInstrumentTunings("guitar")
          }
          onSelectAllBassTunings={() =>
            handleSelectAllInstrumentTunings("bass")
          }
          onClearTunings={handleClearTunings}
        />
      </div>

      {!songs || songs.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          No songs found in catalog.
        </div>
      ) : filteredSongs.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          No results found with the current filters.
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {paginatedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>

          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItemsPerPage={displayCount}
            setTotalItemsPerPage={(count) => {
              setDisplayCount(count);
              setCurrentPage(1);
            }}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SongsList;

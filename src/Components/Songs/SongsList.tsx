import { useMemo, useState } from "react";
import type { CatalogSong } from "../../types/catalog.types";
import SongCard from "./SongCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

interface SongsListProps {
  songs: CatalogSong[] | null;
}

const normalizeSearchText = (value: string | null | undefined): string => {
  return (value ?? "").trim().toLowerCase();
};

const SongsList = ({ songs }: SongsListProps) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = useMemo(() => {
    if (!songs || songs.length === 0) {
      return [];
    }

    const normalizedSearch = normalizeSearchText(searchTerm);

    if (!normalizedSearch) {
      return songs;
    }

    return songs.filter((song) => {
      const title = normalizeSearchText(song.songName);
      const artist = normalizeSearchText(song.artistName);

      return (
        title.includes(normalizedSearch) || artist.includes(normalizedSearch)
      );
    });
  }, [songs, searchTerm]);

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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDisplayCountChange = (count: number) => {
    setDisplayCount(count);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        totalResults={filteredSongs.length}
      />

      {!songs || songs.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          No songs found in catalog.
        </div>
      ) : filteredSongs.length === 0 ? (
        <div className="flex min-h-50 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
          No results for{" "}
          <span className="ml-1 font-semibold text-white">"{searchTerm}"</span>.
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
            setTotalItemsPerPage={handleDisplayCountChange}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SongsList;

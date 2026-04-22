import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  AvailableTuningOption,
  SongSortDirection,
  SongSortField,
} from "../../Helpers/tuning-filter-helpers";
import TuningDropdown from "./TuningDropdown";

interface SongsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
  sortField: SongSortField;
  sortDirection: SongSortDirection;
  onSortFieldChange: (value: SongSortField) => void;
  onSortDirectionChange: (value: SongSortDirection) => void;
  availableTunings: AvailableTuningOption[];
  selectedTunings: string[];
  onToggleTuning: (tuningName: string) => void;
  onSelectAllGuitarTunings: () => void;
  onSelectAllBassTunings: () => void;
  onClearTunings: () => void;
}

type InstrumentTab = "guitar" | "bass";

const SongsToolbar = ({
  search,
  onSearchChange,
  totalResults,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  availableTunings,
  selectedTunings,
  onToggleTuning,
  onSelectAllGuitarTunings,
  onSelectAllBassTunings,
  onClearTunings,
}: SongsToolbarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeInstrument, setActiveInstrument] =
    useState<InstrumentTab>("guitar");

  const guitarTunings = useMemo(
    () => availableTunings.filter((tuning) => tuning.instrument === "guitar"),
    [availableTunings],
  );

  const bassTunings = useMemo(
    () => availableTunings.filter((tuning) => tuning.instrument === "bass"),
    [availableTunings],
  );

  const displayedTunings =
    activeInstrument === "guitar" ? guitarTunings : bassTunings;

  const selectedTuningsCountForActiveInstrument = displayedTunings.filter(
    (tuning) => selectedTunings.includes(tuning.name),
  ).length;

  const tuningSummary =
    selectedTuningsCountForActiveInstrument === 0
      ? `All ${activeInstrument} tunings`
      : `${selectedTuningsCountForActiveInstrument} ${activeInstrument} tuning${
          selectedTuningsCountForActiveInstrument > 1 ? "s" : ""
        } selected`;

  return (
    <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:w-auto"
          >
            <Filter size={16} />
            {isFiltersOpen ? "Hide filters" : "Show filters"}
          </button>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-400">
            {totalResults} result{totalResults > 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 lg:flex lg:w-auto lg:flex-wrap lg:items-end">
          <div className="w-full min-w-0 lg:min-w-45">
            <label className="mb-1 block text-xs uppercase tracking-wide text-zinc-400">
              Sort by
            </label>
            <select
              value={sortField}
              onChange={(e) =>
                onSortFieldChange(e.target.value as SongSortField)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500"
            >
              <option value="artistName">Artist</option>
              <option value="songName">Song name</option>
              <option value="albumName">Album</option>
              <option value="tuning">Tuning</option>
            </select>
          </div>

          <div className="w-full min-w-0 lg:min-w-55">
            <label className="mb-1 block text-xs uppercase tracking-wide text-zinc-400">
              Order
            </label>
            <select
              value={sortDirection}
              onChange={(e) =>
                onSortDirectionChange(e.target.value as SongSortDirection)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500"
            >
              <option value="asc">Ascending (A → Z)</option>
              <option value="desc">Descending (Z → A)</option>
            </select>
          </div>
        </div>
      </div>

      {isFiltersOpen && (
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
            <div className="min-w-0">
              <label className="mb-2 block text-sm text-zinc-300">Search</label>

              <div className="relative min-w-0">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by song title or artist..."
                  className="w-full min-w-0 rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="min-w-0 space-y-2">
              <label className="block text-sm text-zinc-300">Tunings</label>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="inline-flex w-fit rounded-lg border border-zinc-700 bg-zinc-900 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveInstrument("guitar")}
                    className={`rounded-md px-3 py-1.5 text-sm transition ${
                      activeInstrument === "guitar"
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Guitar
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveInstrument("bass")}
                    className={`rounded-md px-3 py-1.5 text-sm transition ${
                      activeInstrument === "bass"
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Bass
                  </button>
                </div>

                <div className="w-full min-w-0 md:w-auto md:flex-1">
                  <TuningDropdown
                    label={tuningSummary}
                    tunings={displayedTunings}
                    selectedTunings={selectedTunings}
                    onToggleTuning={onToggleTuning}
                    onSelectAll={() => {
                      if (activeInstrument === "guitar") {
                        onSelectAllGuitarTunings();
                      } else {
                        onSelectAllBassTunings();
                      }
                    }}
                    onClear={onClearTunings}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <SlidersHorizontal size={14} />
            Filters are applied before pagination.
          </div>
        </div>
      )}
    </div>
  );
};

export default SongsToolbar;

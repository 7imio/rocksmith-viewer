import { ChevronDown, Copy, Disc3, Guitar, Timer } from "lucide-react";
import type { CatalogSong } from "../../types/catalog.types";
import { useMemo, useState } from "react";
import {
  getDisplayedTuningNotes,
  getTuningName,
} from "../../Helpers/tuning-name-helpers";

interface SongCardProps {
  song: CatalogSong;
}

const TUNING_COLORS = [
  "bg-red-600",
  "bg-yellow-400 text-black",
  "bg-blue-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-purple-500",
];

const formatSongLength = (lengthInSeconds: number | null): string => {
  if (lengthInSeconds === null) return "N/A";

  const minutes = Math.floor(lengthInSeconds / 60);
  const seconds = Math.floor(lengthInSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SongCard = ({ song }: SongCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commandCopied, setCommandCopied] = useState(false);

  const songLength = formatSongLength(song.songLength);
  const command = `!sr ${song.id}`;

  const arrangementsWithTuning = useMemo(() => {
    return song.arrangements.map((arrangement) => {
      const tuningNotes = getDisplayedTuningNotes(arrangement);
      const tuningName = getTuningName(arrangement);

      return {
        ...arrangement,
        tuningNotes,
        tuningName,
      };
    });
  }, [song.arrangements]);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCommandCopied(true);

      setTimeout(() => {
        setCommandCopied(false);
      }, 1200);
    } catch (error) {
      console.error("Failed to copy command:", error);
    }
  };

  return (
    <div className="overflow-visible rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-sm transition hover:border-zinc-700">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-zinc-800/40"
      >
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-[1.4fr_1.2fr_0.8fr_0.8fr] md:items-center">
          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-400">Artist</p>
            <p className="truncate font-semibold text-white">
              {song.artistName ?? "Unknown artist"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-400">Song</p>
            <p className="truncate font-bold text-white">
              {song.songName ?? "Unknown song"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-400">Album</p>
            <p className="truncate text-zinc-200">
              {song.albumName ?? "Unknown album"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-400">Length</p>
            <p className="text-zinc-200">{songLength}</p>
          </div>
        </div>

        <ChevronDown
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          size={20}
        />
      </button>
      {isExpanded && (
        <div className="border-t border-zinc-800 px-4 py-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoBlock
                  icon={<Disc3 size={16} />}
                  label="Album"
                  value={song.albumName ?? "Unknown album"}
                />

                <InfoBlock
                  icon={<Timer size={16} />}
                  label="Length"
                  value={songLength}
                />

                <InfoBlock
                  icon={<Guitar size={16} />}
                  label="Arrangements"
                  value={song.arrangementTypes.join(", ")}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Arrangement details
                </p>

                <div className="grid gap-3">
                  {arrangementsWithTuning.map((arrangement, index) => {
                    return (
                      <div
                        key={`${song.id}-${arrangement.type}-${index}`}
                        className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[120px_80px_minmax(0,1fr)] sm:items-start">
                          {/* TYPE */}
                          <div>
                            <p className="text-xs text-zinc-400 uppercase">
                              Type
                            </p>
                            <p className="font-medium capitalize text-white">
                              {arrangement.type ?? "Unknown"}
                            </p>
                          </div>

                          {/* CAPO */}
                          <div>
                            <p className="text-xs text-zinc-400 uppercase">
                              Capo
                            </p>
                            <p className="font-medium text-white">
                              {arrangement.capo ?? 0}
                            </p>
                          </div>

                          {/* TUNING */}
                          <div>
                            <p className="text-xs text-zinc-400 uppercase">
                              Tuning
                            </p>

                            {arrangement.tuningNotes.length > 0 ? (
                              <div className="mt-1 space-y-2">
                                <p className="text-sm font-semibold text-white">
                                  {arrangement.tuningName}
                                </p>

                                <div className="flex flex-wrap gap-1">
                                  {arrangement.tuningNotes.map(
                                    (note, noteIndex) => (
                                      <span
                                        key={`${note}-${noteIndex}`}
                                        className={`inline-flex min-w-9 items-center justify-center rounded-md px-2 py-1 text-xs font-bold text-white ${
                                          TUNING_COLORS[noteIndex] ??
                                          "bg-zinc-700"
                                        }`}
                                      >
                                        {note}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-zinc-300">
                                Unknown tuning
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-start justify-start lg:justify-end">
              <button
                type="button"
                disabled
                onClick={handleCopyCommand}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Copy size={16} />
                {commandCopied
                  ? "Command copied!"
                  : `Command: ${command} (disabled)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface InfoBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoBlock = ({ icon, label, value }: InfoBlockProps) => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
      <div className="mb-2 flex items-center gap-2 text-zinc-400">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
};

export default SongCard;

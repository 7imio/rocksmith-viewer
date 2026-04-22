import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AvailableTuningOption } from "../../Helpers/tuning-filter-helpers";

interface TuningDropdownProps {
  label: string;
  tunings: AvailableTuningOption[];
  selectedTunings: string[];
  onToggleTuning: (tuningName: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const TuningDropdown = ({
  label,
  tunings,
  selectedTunings,
  onToggleTuning,
  onSelectAll,
  onClear,
}: TuningDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative min-w-70">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-left text-sm text-white transition hover:bg-zinc-700"
      >
        <span className="truncate">{label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-100 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800 p-3">
            <button
              type="button"
              onClick={onSelectAll}
              className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
            >
              Select all
            </button>

            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
            >
              <RotateCcw size={12} />
              Clear
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {tunings.length === 0 ? (
              <p className="px-2 py-3 text-sm text-zinc-500">
                No tunings available.
              </p>
            ) : (
              tunings.map((tuning) => {
                const isChecked = selectedTunings.includes(tuning.name);

                return (
                  <button
                    key={`${tuning.instrument}-${tuning.name}`}
                    type="button"
                    onClick={() => onToggleTuning(tuning.name)}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-zinc-800"
                  >
                    <span className="truncate">{tuning.name}</span>

                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
                        isChecked
                          ? "border-zinc-300 bg-zinc-200 text-black"
                          : "border-zinc-600 bg-transparent text-transparent"
                      }`}
                    >
                      <Check size={12} />
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TuningDropdown;

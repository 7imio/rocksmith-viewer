import { Search } from "lucide-react";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalResults: number;
}

const SearchBar = ({ value, onChange, totalResults }: SearchBarProps) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by song title or artist..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
          />
        </div>

        <p className="text-sm text-zinc-400">
          {totalResults} result{totalResults > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default SearchBar;

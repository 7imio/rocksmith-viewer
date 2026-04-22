import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItemsPerPage: number;
  setTotalItemsPerPage: (count: number) => void;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  setTotalItemsPerPage,
  totalItemsPerPage,
}: PaginationProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-neutral-900/60 p-4 md:flex-row md:gap-0 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <label htmlFor="items-per-page" className="text-sm text-zinc-300">
          Songs per page
        </label>

        <select
          id="items-per-page"
          value={totalItemsPerPage}
          onChange={(e) => {
            const newDisplayCount = parseInt(e.target.value, 10);
            setTotalItemsPerPage(newDisplayCount);
            onPageChange(1);
          }}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none transition focus:border-zinc-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
          className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="First page"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <p className="min-w-25 text-center text-sm text-zinc-300">
          Page <span className="font-semibold text-white">{currentPage}</span> /{" "}
          <span className="font-semibold text-white">{totalPages}</span>
        </p>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
          className="rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

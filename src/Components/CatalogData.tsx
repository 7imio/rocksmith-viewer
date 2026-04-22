import type { CatalogStats } from "../types/catalog.types";

interface CatalogDataProps {
  stats: CatalogStats | null;
}
const CatalogData = ({ stats }: CatalogDataProps) => {
  console.log("Catalog stats:", stats);

  return (
    <div>
      <h1
        className="
    text-xl
    sm:text-2xl
    md:text-3xl
    font-bold
    text-white
    mb-4
  "
        style={{
          textShadow: "2px 2px 4px rgba(0,0,0,.5)",
        }}
      >
        Seteemio's Rocksmith Song List
      </h1>
      {/* <p> PSARC files scanned: {stats?.psarcFilesScanned ?? "N/A"}</p>
      <p> Skipped (no song data): {stats?.skippedNoSongData ?? "N/A"}</p>
      <p> Errors: {stats?.errorCount ?? "N/A"}</p> */}
    </div>
  );
};

export default CatalogData;

import "./App.css";
import CatalogData from "./Components/CatalogData";
import SongsList from "./Components/Songs/SongsList";
import { useFetchCatalog } from "./hooks/useFetchCatalog";

function App() {
  const { data, loading, error } = useFetchCatalog();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App mx-auto flex h-dvh w-full max-w-360 flex-col overflow-hidden px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      {data?.stats && (
        <div className="shrink-0">
          <CatalogData stats={data.stats} />
        </div>
      )}

      {/* Song list: toolbar and pagination stay visible, only cards scroll. */}
      {data?.songs && <SongsList songs={data.songs} />}
    </div>
  );
}
export default App;

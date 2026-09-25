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
    <div className="App mx-auto flex w-full max-w-[1440px] flex-col px-3 py-6 sm:px-6 lg:px-8">
      {data?.stats && <CatalogData stats={data.stats} />}
      {/* // song list component with pagination for data.songs*/}
      {data?.songs && <SongsList songs={data.songs} />}
    </div>
  );
}
export default App;

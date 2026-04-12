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
    <div className="App flex flex-col items-center p-4 w-full mx-auto bg-neutral-950">
      {data?.stats && <CatalogData stats={data.stats} />}
      {/* // song list component with pagination for data.songs*/}
      {data?.songs && <SongsList songs={data.songs} />}
    </div>
  );
}
export default App;

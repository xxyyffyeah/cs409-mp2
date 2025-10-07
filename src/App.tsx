import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import styles from './App.module.scss';
import List from './pages/List';
import Details from './pages/Details';
import { SearchResultsProvider } from './contexts/context';

function App() {
  return (
    <BrowserRouter basename="/cs409-mp2">
      <SearchResultsProvider>
        <div className="App">
          <header className={styles.AppHeader}>
            <h1 className="title">Art Institute of Chicago Gallery Website</h1>
            <ul>
              <li>
                <Link to="/">Search</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </header>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </SearchResultsProvider>
    </BrowserRouter>

  );
}


function Gallery() {
  return <h2>Gallery</h2>;
}
export default App;

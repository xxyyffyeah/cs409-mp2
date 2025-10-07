import SearchBar from "./SearchBar";
import React, { useState, useEffect, useMemo } from "react";
import { ArtWork } from "./types";
import { SortBy } from "./types";
import { Order } from "./types";
import { searchArtworks } from "../services/ArtInstituteChicagoAPI";
import styles from "./SearchModule.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearchResults } from "../contexts/context";


interface SeachResultsProps {
  results: ArtWork[];
}
const SearchResults: React.FC<SeachResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }
  return (
    <div className={styles.searchResults}>
      <ul>
        {
          results.map(item =>
          (
            <Link to={`/details/${item.id}`} key={item.id} className={styles.resultLink}>
              <li key={item.id}>
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className={styles.thumbnail}
                  />
                )}
                <div className={styles.artworkInfo}>
                  <strong>{item.title}</strong> by {item.artist} ({item.year})
                  <div className={styles.artworkId}>ID: {item.id}</div>
                </div>
              </li>
            </Link>
          )
          )
        }
      </ul>
    </div>
  );
}
function SearchModule() {
  const { setSearchResults } = useSearchResults();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ArtWork[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("ID");
  const [selectedOrder, setSelectedOrder] = useState<Order>('ascending');
  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  const onSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  }
  const onOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(e.target.value as Order);
  }

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'artist':
          comparison = a.artist.localeCompare(b.artist);
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        case 'ID':
        default:
          comparison = a.id - b.id;
      }
      return selectedOrder === 'ascending' ? comparison : -comparison;
    });
  }, [results, sortBy, selectedOrder]);

  useEffect(() => {
    setSearchResults(sortedResults);
  }, [sortedResults, setSearchResults]);
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const abortController = new AbortController();
    const fetchResults = async () => {
      try {
        const artworks = await searchArtworks(query, abortController.signal);
        console.log('Fetched artworks:', artworks);
        setResults(artworks);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('There was a problem with the Axios operation:', error);
        }
      }
    };
    fetchResults();
    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <div className={styles.searchModule}>
      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        placeholder="Search by title or artist."
        onSortByChange={onSortByChange}
        sortBy={sortBy}
        selectedOrder={selectedOrder}
        onOrderChange={onOrderChange} />
      <SearchResults
        results={sortedResults} />
    </div>
  );
}
export default SearchModule;

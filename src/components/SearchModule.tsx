import SearchBar from "./SearchBar";
import React, { useState, useEffect } from "react";
import { ArtWork } from "./types";
import { SortBy } from "./types";
import { Order } from "./types";

const mockArtData: ArtWork[] = [
  { id: 1, title: 'Starry Night', artist: 'Vincent van Gogh', year: 1889 },
  { id: 2, title: 'The Mona Lisa', artist: 'Leonardo da Vinci', year: 1503 },
  { id: 3, title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: 1931 },
  { id: 4, title: 'The Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 1665 },
  { id: 5, title: 'The Night Watch', artist: 'Rembrandt van Rijn', year: 1642 },
  { id: 6, title: 'A Sunday Afternoon on the Island of La Grande Jatte', artist: 'Georges Seurat', year: 1884 },
];


interface SeachResultsProps {
  results: ArtWork[];
}
const SearchResults: React.FC<SeachResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }
  return (
    <ul>
      {
        results.map(item =>
        (
          <li key={item.id}>
            {item.id}: {item.title} by {item.artist} ({item.year})
          </li>
        )
        )
      }
    </ul>
  );
}
function SearchModule() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ArtWork[]>(mockArtData);
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
  const sortedResults = [...results].sort((a, b) => {
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
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = mockArtData.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.artist.toLowerCase().includes(lowerQuery) ||
      item.year.toString().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="search-module">
      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        placeholder="Search by title, year or artist."
        onSortByChange={onSortByChange}
        sortBy={sortBy} 
        selectedOrder={selectedOrder}
        onOrderChange={onOrderChange}/>
      <SearchResults
        results={sortedResults} />
    </div>
  );
}
export default SearchModule;

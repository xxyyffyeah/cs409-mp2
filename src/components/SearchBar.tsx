import { on } from "events";

interface SearchModuleProps {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSortByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortBy: "ID" | "title" | "artist" | "year";
  selectedOrder: 'ascending' | 'descending';
  onOrderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar: React.FC<SearchModuleProps> = ({ query, onQueryChange, placeholder, onSortByChange, sortBy , selectedOrder, onOrderChange}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={onQueryChange}
      />
      <select name="Sort by" id="sort-by" value={sortBy} onChange={onSortByChange}>
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="year">Year</option>
      </select>
      <label htmlFor="ascending">
        <input
          type="radio"
          id="ascending"
          name="order"
          value="ascending"
          checked={selectedOrder === 'ascending'}
          onChange={onOrderChange}
        />
        ascending
      </label>
      <label htmlFor="descending">
        <input
          type="radio"
          id="descending"
          name="order"
          value="descending"
          checked={selectedOrder === 'descending'}
          onChange={onOrderChange}
        />
        descending
      </label>  
    </div>

  );
}
export default SearchBar;
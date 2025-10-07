import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ArtWork } from '../components/types'; // 确保 ArtWork 类型被正确导入

interface SearchResultsContextType {
  searchResults: ArtWork[];
  setSearchResults: (results: ArtWork[]) => void;
}

const SearchResultsContext = createContext<SearchResultsContextType | undefined>(undefined);

export const SearchResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<ArtWork[]>([]);

  const value = { searchResults, setSearchResults };

  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchResults = (): SearchResultsContextType => {
  const context = useContext(SearchResultsContext);
  if (context === undefined) {
    throw new Error('useSearchResults must be used within a SearchResultsProvider');
  }
  return context;
};
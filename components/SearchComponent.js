import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import {
  SearchContainer,
  SearchResult,
  SearchInput,
  ResultsList,
} from "@/_styles";

const SearchComponent = ({ ingredients }) => {
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fuseOptions = {
      threshold: 0.3,
      keys: ["name"],
    };
    setFuse(new Fuse(ingredients, fuseOptions));
  }, [ingredients]);

  function handleSearch(event) {
    if (!fuse) {
      return;
    }
    const searchPattern = event.target.value;
    const searchResult = fuse.search(searchPattern).slice(0, 10);

    setResults(searchResult.map((result) => result.item.name));
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for ingredients..."
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <ResultsList>
          {results.map((result, index) => (
            <SearchResult key={index}>{result}</SearchResult>
          ))}
        </ResultsList>
      )}
    </SearchContainer>
  );
};

export default SearchComponent;

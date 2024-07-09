import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  SearchContainer,
  SearchResult,
  SearchInput,
  ResultsList,
} from "@/_styles";

const SearchComponent = ({ ingredients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const fuseOptions = {
      threshold: 0.3,
      keys: ["name"],
    };
    setFuse(new Fuse(ingredients, fuseOptions));
  }, [ingredients]);

  function handleSearch(event) {
    const searchPattern = event.target.value;
    setSearchTerm(searchPattern);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  }

  function performSearch() {
    if (fuse && searchTerm.trim() !== "") {
      const searchResult = fuse.search(searchTerm).slice(0, 10);
      setResults(searchResult.map((result) => result.item));
    } else {
      setResults([]);
    }
  }
  function handleResultClick(result) {
    setSelectedResult(result);
    setSearchTerm("");
    setResults([]);
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for ingredients..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      {results.length > 0 && (
        <ResultsList>
          {results.map((result, index) => (
            <StyledLink key={index} href={`/ingredient/${result._id}`}>
              <SearchResult onClick={() => handleResultClick(result)}>
                {result.name}
              </SearchResult>
            </StyledLink>
          ))}
        </ResultsList>
      )}
    </SearchContainer>
  );
};

export default SearchComponent;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

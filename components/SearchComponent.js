import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  SearchContainer,
  SearchResult,
  SearchInput,
  ResultsList,
  List,
  NoMatchMessage,
  StyledListItem,
} from "@/_styles";
import IngredientItem from "@/components/IngredientItem";

const SearchComponent = ({ ingredients, flavors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [activeFlavor, setActiveFlavor] = useState("");
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    const combinedData = [
      ...ingredients.map((ingredient) => ({
        name: ingredient.name,
        type: "ingredient",
        flavor: ingredient.flavor,
        _id: ingredient._id,
      })),
      ...flavors.map((flavor, index) => ({
        name: flavor,
        type: "flavor",
        _id: `flavor-${index}`,
      })),
    ];

    const fuseOptions = {
      threshold: 0.3,
      keys: ["name"],
    };
    setFuse(new Fuse(combinedData, fuseOptions));
  }, [ingredients, flavors]);

  function handleSearch(event) {
    const searchPattern = event.target.value;
    setSearchTerm(searchPattern);
    performSearch(searchPattern);
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
    if (result.type === "flavor") {
      setActiveFlavor(result.name);
      setSearchTerm("");
      setResults([]);
    } else {
      setSelectedResult(result);
      setSearchTerm("");
      setResults([]);
    }
  }

  const filteredIngredients = activeFlavor
    ? ingredients.filter((ingredient) => ingredient.flavor === activeFlavor)
    : [];

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for ingredients or flavors..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      {results.length > 0 && (
        <ResultsList>
          {results.map((result, index) => (
            <SearchResult key={index} onClick={() => handleResultClick(result)}>
              {result.name}
            </SearchResult>
          ))}
        </ResultsList>
      )}
      {activeFlavor && (
        <>
          {filteredIngredients.length > 0 ? (
            <List>
              {filteredIngredients.map((ingredient) => (
                <StyledListItem
                  key={ingredient._id}
                  href={`/ingredient/${ingredient._id}`}
                >
                  <IngredientItem ingredient={ingredient} />
                </StyledListItem>
              ))}
            </List>
          ) : (
            <NoMatchMessage>
              No ingredients found for the selected flavor profile. Please try a
              different selection.
            </NoMatchMessage>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchComponent;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

/*import React, { useState, useEffect } from "react";
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
    performSearch(searchPattern);
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
`;*/

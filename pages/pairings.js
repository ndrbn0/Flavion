import { useState } from "react";
import styled from "styled-components";
import pairingsData from "../assets/pairings.json";
import PairingsList from "@/components/PairingsList";

const PairingsPage = () => {
  const [pairings, setPairings] = useState(pairingsData);

  const toggleFavorite = (event, _id) => {
    event.preventDefault();
    const favoritePairing = favorites.find(
      (ingredient) => ingredient._id === _id
    );

    if (favoriteIngredient) {
      setFavorites(
        favorites.map((favorite) =>
          favorite._id === favoritePairing._id
            ? { ...favorite, isFavorite: !favorite.isFavorite }
            : favorite
        )
      );
    } else {
      setFavorites([...favorites, { _id, isFavorite: true }]);
    }
  };

  return (
    <Container>
      <PairingsList pairings={pairings} toggleFavorite={toggleFavorite} />
    </Container>
  );
};

export default PairingsPage;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  min-width: 220px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 8px;
  gap: 50px;
`;

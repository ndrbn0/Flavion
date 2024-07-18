import styled from "styled-components";
import PairingItem from "@/components/PairingItem";
import IngredientItem from "@/components/IngredientItem";
import { IngredientDetailsLink } from "@/_styles";

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  ingredients,
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  updatePairingRating,
}) => {
  const favoriteIngredients = ingredients.filter((ingredient) =>
    favorites.find(
      (favorite) => favorite._id === ingredient._id && favorite.isFavorite
    )
  );

  const favoritePairings = pairings.filter((pairing) =>
    pairingsInfo.find(
      (pairingInfo) => pairingInfo._id === pairing._id && pairingInfo.isFavorite
    )
  );

  return (
    <Container>
      <Title>Favorites</Title>
      <IngredientContainer>
        <Subtitle>Favorite Ingredients</Subtitle>
        <StyledList>
          {favoriteIngredients.length > 0 ? (
            favoriteIngredients.map((ingredient) => (
              <IngredientDetailsLink
                key={ingredient._id}
                href={`/ingredient/${ingredient._id}`}
              >
                <IngredientItem
                  ingredient={ingredient}
                  isFavorite={
                    favorites.find(
                      (favorite) => favorite._id === ingredient._id
                    )?.isFavorite
                  }
                  toggleFavorite={toggleFavorite}
                  updatePairingRating={updatePairingRating}
                />
              </IngredientDetailsLink>
            ))
          ) : (
            <NoFavoritesMessage>
              You have no favorite ingredients yet.
            </NoFavoritesMessage>
          )}
        </StyledList>
      </IngredientContainer>
      <PairingContainer>
        <Subtitle>Favorite Pairings</Subtitle>
        <StyledList>
          {favoritePairings.length > 0 ? (
            favoritePairings.map((favorite) => {
              const pairing = pairings.find(
                (pairing) => pairing._id === favorite._id
              );
              if (pairing) {
                return (
                  <PairingItem
                    key={pairing._id}
                    pairing={pairing}
                    toggleFavoritePairing={toggleFavoritePairing}
                    isFavorite={
                      pairingsInfo.find(
                        (pairingInfo) => pairingInfo._id === pairing._id
                      )?.isFavorite
                    }
                    updatePairingRating={updatePairingRating}
                    ingredients={ingredients}
                  />
                );
              }
              return null;
            })
          ) : (
            <NoFavoritesMessage>
              You have no favorite pairings yet.
            </NoFavoritesMessage>
          )}
        </StyledList>
      </PairingContainer>
    </Container>
  );
};

export default FavoritesPage;

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
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 5px;
  margin-bottom: 15%;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  border-radius: var(--radius-2xl, 48px);
  padding: 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
  margin: 20px;
`;

const IngredientContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const PairingContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

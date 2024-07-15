import styled from "styled-components";
import PairingItem from "@/components/PairingItem";
import IngredientItem from "@/components/IngredientItem";

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  ingredients,
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  updatePairingRating, // Destr. prop
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
      <StyledList>
        {favoriteIngredients.length > 0 ? (
          favoriteIngredients.map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              ingredient={ingredient}
              isFavorite={
                favorites.find((favorite) => favorite._id === ingredient._id)
                  ?.isFavorite
              }
              toggleFavorite={toggleFavorite}
              updatePairingRating={updatePairingRating} //  prop
            />
          ))
        ) : (
          <NoFavoritesMessage>
            You have no favorite ingredients yet.
          </NoFavoritesMessage>
        )}

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
                  updatePairingRating={updatePairingRating} //  prop
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
  min-width: 220px;
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

const NoFavoritesMessage = styled.p`
  text-align: center;
  margin: 20px;
`;

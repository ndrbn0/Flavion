import styled from "styled-components";
import IngredientItem from "@/components/IngredientItem";
import PairingItem from "@/components/PairingItem";

const FavoritesPage = ({ favorites, toggleFavorite, ingredients }) => {
  const favoriteIngredients = ingredients.filter((ingredient) =>
    favorites.find(
      (favorite) => favorite._id === ingredient._id && favorite.isFavorite
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
            />
          ))
        ) : (
          <NoFavoritesMessage>
            You have no favorite ingredients yet.
          </NoFavoritesMessage>
        )}
        {/* {favoritePairings.length > 0 ? (
          favoritePairings.map((pairing) => (
            <PairingItem
              key={pairing._id}
              pairing={pairing}
              isFavorited={favoritePairings.includes(pairing)}
              onToggleFavorite={handleToggleFavoritePairing}
            />
          ))
        ) : (
          <NoFavoritesMessage>
            You have no favorite pairings yet.
          </NoFavoritesMessage>
        )} */}
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
  flex-wrap: wrap;
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

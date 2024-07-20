import IngredientDetails from "@/components/IngredientDetails";
import styled from "styled-components";

const IngredientPage = ({
  ingredients,
  deleteIngredient,
  updateIngredient,
  toggleFavorite,
  favorites,
}) => {
  return (
    <>
      <IngredientDetails
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </>
  );
};

export default IngredientPage;

const StyledContainer = styled.div`
  padding: 32px;
`;

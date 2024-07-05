import IngredientDetails from "@/components/IngredientDetails";
import styled from "styled-components";

const IngredientPage = ({
  ingredients,
  deleteIngredient,
  updateIngredient,
}) => {
  return (
    <StyledContainer>
      <IngredientDetails
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
      />
    </StyledContainer>
  );
};

export default IngredientPage;

const StyledContainer = styled.div`
  padding: 32px;
`;

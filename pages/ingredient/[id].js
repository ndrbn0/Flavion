import IngredientDetails from "@/components/IngredientDetails";
import styled from "styled-components";

const IngredientPage = () => {
  return (
    <StyledContainer>
      <IngredientDetails />
    </StyledContainer>
  );
};

export default IngredientPage;

const StyledContainer = styled.div`
  padding: 32px;
`;

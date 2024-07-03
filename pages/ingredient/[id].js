import IngredientDetails from "@/components/IngredientDetails";
import styled from "styled-components";

const IngredientPage = ({ ingredients }) => {
  return (
    <StyledContainer>
      <IngredientDetails ingredients={ingredients} />
    </StyledContainer>
  );
};

export default IngredientPage;

const StyledContainer = styled.div`
  padding: 32px;
`;

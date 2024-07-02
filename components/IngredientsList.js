import ingredients from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import { Container, List, StyledListItem } from "@/_styles";
import styled from "styled-components";

const IngredientsList = () => {
  return (
    <>
      <Title>Ingredients Overview</Title>
      <Container>
        <List>
          {ingredients.map((ingredient) => (
            <StyledListItem
              key={ingredient._id}
              href={`/ingredient/${ingredient._id}`}
            >
              <IngredientItem ingredient={ingredient} />
            </StyledListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default IngredientsList;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

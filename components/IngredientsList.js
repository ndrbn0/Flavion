import ingredientsData from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import NewIngredientForm from "@/components/NewIngredientForm";
import { Container, List, StyledListItem } from "@/_styles";
import styled from "styled-components";

const flavors = [
  ...new Set(ingredientsData.map((ingredient) => ingredient.flavor)),
];

const IngredientsList = ({ ingredients, addIngredient }) => {
  console.log(ingredients);
  return (
    <>
      <Title>Ingredients Overview</Title>
      <Container>
        <NewIngredientForm onAddIngredient={addIngredient} flavors={flavors} />
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

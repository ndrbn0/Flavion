// IngredientsList.js
import { useState } from "react";
import ingredientsData from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import AddNewIngredientForm from "@/components/AddNewIngredientForm";
import { Container, List, StyledListItem } from "@/_styles";
import styled from "styled-components";

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState(ingredientsData);

  const handleAddIngredient = (newIngredient) => {
    setIngredients([newIngredient, ...ingredients]);
  };

  return (
    <>
      <Title>Ingredients Overview</Title>
      <Container>
        <AddNewIngredientForm onAddIngredient={handleAddIngredient} />
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
  border-radius: var(--radius-2xl, 48px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
    ),
    var(--Primary-primary, #153f52);
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

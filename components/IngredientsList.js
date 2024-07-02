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
`;

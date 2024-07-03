import { useState, useEffect } from "react";
import ingredientsData from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import NewIngredientForm from "@/components/NewIngredientForm";
import { Container, List, StyledListItem } from "@/_styles";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const flavors = [
  ...new Set(ingredientsData.map((ingredient) => ingredient.flavor)),
];

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const allIngredients = [
      ...new Map(ingredientsData.map((item) => [item._id, item])).values(),
    ];
    setIngredients(allIngredients);
  }, []);

  const addIngredient = (newIngredient) => {
    const updatedIngredients = [{_id: uuidv4(), ...newIngredient}, ...ingredients];
    setIngredients(updatedIngredients);
  };

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

import { useState } from "react";
import ingredientsData from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import NewIngredientForm from "@/components/NewIngredientForm";
import {
  Container,
  List,
  IngredientDetailsLink,
  FilterContainer,
  FilterButton,
  NoMatchMessage,
} from "@/_styles";
import styled from "styled-components";
import { flavorColors } from "@/utils";

const flavors = [
  ...new Set(ingredientsData.map((ingredient) => ingredient.flavor)),
];

const IngredientsList = ({
  ingredients,
  addIngredient,
  toggleFavorite,
  favorites,
  comments,
}) => {
  const [activeFlavor, setActiveFlavor] = useState("");

  const handleFilterClick = (flavor) => {
    setActiveFlavor(flavor === activeFlavor ? "" : flavor);
  };

  const filteredIngredients = activeFlavor
    ? ingredients.filter((ingredient) => ingredient.flavor === activeFlavor)
    : ingredients;

  return (
    <>
      <Title>Ingredients</Title>
      <Container>
        <NewIngredientForm onAddIngredient={addIngredient} flavors={flavors} />
        <FilterContainer>
          {flavors.map((flavor) => (
            <FilterButton
              key={flavor}
              onClick={() => handleFilterClick(flavor)}
              $active={flavor === activeFlavor}
              $color={flavorColors[flavor]}
            >
              {flavor}
            </FilterButton>
          ))}
        </FilterContainer>
        {filteredIngredients.length > 0 ? (
          <List>
            {filteredIngredients.map((ingredient) => (
              <IngredientDetailsLink
                key={ingredient._id}
                href={`/ingredient/${ingredient._id}`}
              >
                <IngredientItem
                  key={ingredient._id}
                  ingredient={ingredient}
                  toggleFavorite={toggleFavorite}
                  isFavorite={
                    favorites.find(
                      (favorite) => favorite._id === ingredient._id
                    )?.isFavorite
                  }
                  comments={comments}
                />
              </IngredientDetailsLink>
            ))}
          </List>
        ) : (
          <NoMatchMessage>
            No ingredients found for the selected flavor profile. Please try a
            different selection.
          </NoMatchMessage>
        )}
      </Container>
    </>
  );
};

export default IngredientsList;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  border-radius: 18px;
  background-color: #f5e4b5;
  margin-top: 10px;
`;

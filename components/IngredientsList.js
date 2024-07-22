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
  margin-top: 15px;
  text-align: center;
  margin-bottom: 15px;
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

  text-transform: uppercase;

  width: 100%;

  border-radius: var(--br-5xl);
  background-color: var(--color-sandybrown);

  align-items: flex-start;

  padding: var(--padding-13xl) var(--padding-16xl);

  margin-bottom: 20px;

  background-image: url("https://images.unsplash.com/photo-1606914469633-bd39206ea739?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Add this line */
  background-position: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  font-size: var(--font-size-101xl);
  color: white;
  font-family: var(--font-poppins);
  @media screen and (max-width: 840px) {
    font-size: 90px;
  }
  @media screen and (max-width: 640px) {
    font-size: 70px;
  }
  @media screen and (max-width: 507px) {
    font-size: 60px;
  }
  @media screen and (max-width: 440px) {
    font-size: 57px;
  }
  @media screen and (max-width: 405px) {
    font-size: 53px;
  }
  @media screen and (max-width: 395px) {
    font-size: 47px;
  }
  @media screen and (max-width: 350px) {
    font-size: 40px;
  }
  @media screen and (max-width: 305px) {
    font-size: 30px;
  }
`;

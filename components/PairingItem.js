import React from "react";
import {
  Card,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent,
  Flavors,
  CardFooter,
  FavoriteButton,
  Ingredient,
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";

const PairingItem = ({ pairing, toggleFavoritePairing, isFavorite }) => {
  const ingredients = pairing.ingredients.map((id) => {
    const ingredient = ingredientsData.find((ing) => ing._id === id);
    return ingredient;
  });

  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <FavoriteButton onClick={() => toggleFavoritePairing(pairing._id)}>
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <ul>
          <Ingredients>
            {ingredients.map((ingredient) => {
              return (
                <Ingredient key={ingredient._id}>{ingredient.name}</Ingredient>
              );
            })}
          </Ingredients>
        </ul>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {ingredients.map((ingredient) => {
          return (
            <Flavors
              $color={flavorColors[ingredient.flavor]}
              key={ingredient._id}
            >
              #{ingredient.flavor}
            </Flavors>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default PairingItem;

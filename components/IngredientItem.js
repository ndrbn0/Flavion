import React from "react";
import {
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  CardFooter,
  FavoriteButton,
  Card,
} from "@/_styles";
import { flavorColors } from "@/utils";

const IngredientItem = ({ ingredient, toggleFavorite, isFavorite }) => {
  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={ingredient.imgUrl}
          alt={ingredient.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <FavoriteButton
          onClick={(event) => toggleFavorite(event, ingredient._id)}
        >
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <Name>{ingredient.name}</Name>
        <br />
      </StyledContent>
      <CardFooter>
        <Flavor $color={flavorColors[ingredient.flavor]}>
          #{ingredient.flavor}
        </Flavor>
      </CardFooter>
    </Card>
  );
};

export default IngredientItem;

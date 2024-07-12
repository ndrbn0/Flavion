import {
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  CardFooter,
  FavoriteButton,
} from "@/_styles";
import { flavorColors } from "@/utils";
import { useState } from "react";

const IngredientItem = ({ ingredient }) => {
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = (event) => {
    setFavorited(!favorited);
    event.preventDefault();
  };

  return (
    <>
      <ImageWrapper>
        <StyledImage
          src={ingredient.imgUrl}
          alt={ingredient.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          priority
        />
        <FavoriteButton onClick={toggleFavorite}>
          {favorited ? "★" : "☆"}
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
    </>
  );
};

export default IngredientItem;

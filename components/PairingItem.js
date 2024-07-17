import { useState, useEffect } from "react";
import styled from "styled-components";
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
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";

const PairingItem = ({ pairing, setShow, handleClick }) => {
  const [favorited, setFavorited] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientData = pairing.ingredients.map((id) =>
      ingredientsData.find((ing) => ing._id === id)
    );
    setIngredients(ingredientData);
  }, [pairing.ingredients]);

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <FavoriteButton onClick={toggleFavorite}>
          {favorited ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <Ingredients>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {ingredients.map((ingredient) => (
          <Flavors
            $color={flavorColors[ingredient.flavor]}
            key={ingredient._id}
          >
            #{ingredient.flavor}
          </Flavors>
        ))}
        <CommentEmoji
          onClick={() => {
            setShow(true);
            handleClick(pairing);
          }}
        >
          💬
        </CommentEmoji>
      </CardFooter>
    </Card>
  );
};

export default PairingItem;

const CommentEmoji = styled.span`
  cursor: pointer;
  margin-left: auto;
`;

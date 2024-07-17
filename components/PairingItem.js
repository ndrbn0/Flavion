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

const PairingItem = ({
  pairing,
  setShow,
  onCommentButtonClick,
  isFavorite,
  toggleFavoritePairing,
}) => {
  const ingredientData = pairing.ingredients.map((id) =>
    ingredientsData.find((ing) => ing._id === id)
  );

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
        <FavoriteButton onClick={toggleFavoritePairing}>
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <Ingredients>
          {ingredientData.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {ingredientData.map((ingredient) => (
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
            onCommentButtonClick();
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

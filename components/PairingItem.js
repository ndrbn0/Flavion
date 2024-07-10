import {
  Pairing,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent2,
  Flavors,
  CardFooter,
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";

const PairingItem = ({ pairing }) => {
  const ingredients = pairing.ingredients.map((id) => {
    const ingredient = ingredientsData.find((ing) => ing._id === id);
    return ingredient;
  });

  return (
    <Pairing>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageWrapper>
      <StyledContent2>
        <Ingredients>
          {ingredients.map((ingredient) => {
            return <li key={ingredient._id}>{ingredient.name}</li>;
          })}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent2>
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
    </Pairing>
  );
};

export default PairingItem;

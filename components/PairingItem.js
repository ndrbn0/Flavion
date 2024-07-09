import {
  Pairing,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
} from "@/_styles";
import ingredientsData from "@/assets/ingredients.json";

const PairingItem = ({ pairing }) => {
  const getIngredientNames = (ingredientIds) => {
    return ingredientIds.map((id) => {
      const ingredient = ingredientsData.find((ing) => ing._id === id);
      return ingredient ? ingredient.name : "Unknown";
    });
  };

  return (
    <Pairing>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageWrapper>
      <Ingredients>
        {getIngredientNames(pairing.ingredients).join(", ")}
      </Ingredients>
      <Reason>{pairing.reason}</Reason>
    </Pairing>
  );
};

export default PairingItem;

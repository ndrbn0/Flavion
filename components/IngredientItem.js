import {
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  CardFooter,
} from "@/_styles";
import { flavorColors } from "@/utils";

const IngredientItem = ({ ingredient }) => {
  return (
    <>
      <ImageWrapper>
        <StyledImage
          src={ingredient.imgUrl}
          alt={ingredient.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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

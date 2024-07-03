import { useRouter } from "next/router";
import { flavorColors } from "@/utils";
import {
  Container,
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  BackLink,
  CardFooter,
  DetailsCard,
} from "@/_styles";

const IngredientDetails = ({ ingredients }) => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredients) => ingredients._id === id);

  if (!ingredient) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BackLink href="/">← Back</BackLink>
      <Container>
        <DetailsCard>
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
        </DetailsCard>
      </Container>
    </>
  );
};

export default IngredientDetails;

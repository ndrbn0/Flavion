import { useRouter } from "next/router";
import ingredients from "@/assets/ingredients.json";
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
  DeatailsButtons,
  ButtonDelete,
  ButtonEdit,
} from "@/_styles";

const IngredientDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

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
        <DeatailsButtons>
          <ButtonEdit>Edit</ButtonEdit>
          <ButtonDelete>Delete</ButtonDelete>
        </DeatailsButtons>
      </Container>
    </>
  );
};

export default IngredientDetails;

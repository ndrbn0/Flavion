import { useRouter } from "next/router";
import ingredients from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import { Container, BackLink } from "@/_styles";

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
        <IngredientItem ingredient={ingredient} />
      </Container>
    </>
  );
};

export default IngredientDetails;

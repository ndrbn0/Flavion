import { useRouter } from "next/router";
import IngredientItem from "@/components/IngredientItem";
import { Container, BackLink } from "@/_styles";

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
        <IngredientItem ingredient={ingredient} />
      </Container>
    </>
  );
};

export default IngredientDetails;

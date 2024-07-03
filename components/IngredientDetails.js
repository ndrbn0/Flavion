import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ingredientsData from "@/assets/ingredients.json";
import IngredientItem from "@/components/IngredientItem";
import { Container, BackLink } from "@/_styles";

const IngredientDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (id) {
      const allIngredients = ingredientsData;
      const foundIngredient = allIngredients.find(
        (ingredient) => ingredient._id === id
      );
      setIngredient(foundIngredient);
    }
  }, [id]);

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

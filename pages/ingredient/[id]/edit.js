import EditIngredient from "@/components/EditIngredient";
import { useRouter } from "next/router";
import ingredientsData from "@/assets/ingredients.json"; 

const EditIngredientPage = (props) => {
  const router = useRouter();
  if (!router.isReady) return <p>Loading...</p>;

  const flavors = [
    ...new Set(ingredientsData.map((ingredient) => ingredient.flavor)),
  ];

  return (
    <EditIngredient
      ingredients={props.ingredients}
      updateIngredient={props.updateIngredient}
      flavors={flavors}
    />
  );
};

export default EditIngredientPage;

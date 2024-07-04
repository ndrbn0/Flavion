import EditIngredient from "@/components/EditIngredient";
import { useRouter } from "next/router";

const EditIngredientPage = (props) => {
  const router = useRouter();
  if (!router.isReady) return <p>Loading...</p>;

  return (
    <EditIngredient
      ingredients={props.ingredients}
      updateIngredient={props.updateIngredient}
    />
  );
};

export default EditIngredientPage;

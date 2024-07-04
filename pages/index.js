import IngredientsList from "@/components/IngredientsList";

export default function HomePage({
  addIngredient,
  ingredients,
  updateIngredient,
}) {
  return (
    <div>
      <IngredientsList
        ingredients={ingredients}
        addIngredient={addIngredient}
        updateIngredient={updateIngredient}
      />
    </div>
  );
}

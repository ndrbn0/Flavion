import IngredientsList from "@/components/IngredientsList";

export default function HomePage({ addIngredient, ingredients }) {
  return (
    <div>
      <IngredientsList
        ingredients={ingredients}
        addIngredient={addIngredient}
      />
    </div>
  );
}

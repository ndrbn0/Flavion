import IngredientsList from "@/components/IngredientsList";

export default function HomePage({
  addIngredient,
  ingredients,
  updateIngredient,
  toggleFavorite,
  favorites,
  comments,
}) {
  return (
    <div>
      <IngredientsList
        ingredients={ingredients}
        addIngredient={addIngredient}
        updateIngredient={updateIngredient}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
        comments={comments}
      />
    </div>
  );
}

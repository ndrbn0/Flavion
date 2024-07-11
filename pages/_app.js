import GlobalStyle from "../styles";
import { useState } from "react";
import ingredientsData from "@/assets/ingredients.json";
import flavorsData from "@/assets/flavors.json";
import { nanoid } from "nanoid";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [flavors, setFlavors] = useState(flavorsData);

  const addIngredient = (newIngredient) => {
    const updatedIngredients = [
      { _id: nanoid(), ...newIngredient },
      ...ingredients,
    ];
    setIngredients(updatedIngredients);
  };

  const deleteIngredient = (id) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient._id !== id
    );
    setIngredients(updatedIngredients);
  };

  const updateIngredient = (id, updatedIngredient) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient._id === id
        ? { ...ingredient, ...updatedIngredient }
        : ingredient
    );
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <GlobalStyle />
      <SearchComponent ingredients={ingredients} flavors={flavors} />
      <Component
        {...pageProps}
        ingredients={ingredients}
        addIngredient={addIngredient}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
      />
      <Navigation />
    </>
  );
}

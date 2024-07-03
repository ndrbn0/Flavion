import GlobalStyle from "../styles";
import { useState } from "react";
import ingredientsData from "@/assets/ingredients.json";
import { nanoid } from "nanoid";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useState(ingredientsData);

  const addIngredient = (newIngredient) => {
    const updatedIngredients = [
      { _id: nanoid(), ...newIngredient },
      ...ingredients,
    ];
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        ingredients={ingredients}
        addIngredient={addIngredient}
      />
    </>
  );
}

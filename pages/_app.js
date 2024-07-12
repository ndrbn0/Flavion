import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import ingredientsData from "@/assets/ingredients.json";
import { nanoid } from "nanoid";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: ingredientsData,
  });

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    const index = favorites.findIndex((ingredient) => ingredient._id === id);

    if (index === -1) {
      const favoriteIngredient = ingredients.find(
        (ingredient) => ingredient._id === id
      );
      if (favoriteIngredient) {
        setFavorites([...favorites, favoriteIngredient]);
      }
    } else {
      const updatedFavorites = favorites.filter(
        (ingredient) => ingredient._id !== id
      );
      setFavorites(updatedFavorites);
    }
  };

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

    const updatedFavorites = favorites.filter(
      (ingredient) => ingredient._id !== id
    );
    setFavorites(updatedFavorites);
  };

  const updateIngredient = (id, updatedIngredient) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient._id === id
        ? { ...ingredient, ...updatedIngredient }
        : ingredient
    );
    setIngredients(updatedIngredients);

    const updatedFavorites = favorites.map((ingredient) =>
      ingredient._id === _id
        ? { ...ingredient, ...updatedIngredient }
        : ingredient
    );
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <GlobalStyle />
      <SearchComponent ingredients={ingredients} />
      <Component
        {...pageProps}
        ingredients={ingredients}
        addIngredient={addIngredient}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
      <Navigation />
    </>
  );
}

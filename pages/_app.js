import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import ingredientsData from "@/assets/ingredients.json";
import pairingsData from "../assets/pairings.json";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";
import { nanoid } from "nanoid";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: ingredientsData,
  });

  const [favorites, setFavorites] = useLocalStorageState("favorite", {
    defaultValue: [],
  });

  const [pairings, setPairings] = useLocalStorageState("pairings", {
    defaultValue: pairingsData.map((pairing) => ({
      ...pairing,
      rating: 0,
      totalRatings: 0,
    })),
  });

  const [pairingsInfo, setPairingsInfo] = useLocalStorageState("pairingsInfo", {
    defaultValue: [],
  });

  const [comments, setComments] = useLocalStorageState("comment", {
    defaultValue: [],
  });

  useEffect(() => {
    const storedPairings = JSON.parse(localStorage.getItem("pairings"));

    if (storedPairings) {
      setPairings(storedPairings);
    }
  }, []);

  const toggleFavorite = (event, _id) => {
    event.preventDefault();
    const favoriteIngredient = favorites.find(
      (ingredient) => ingredient._id === _id
    );

    if (favoriteIngredient) {
      setFavorites(
        favorites.map((favorite) =>
          favorite._id === favoriteIngredient._id
            ? { ...favorite, isFavorite: !favorite.isFavorite }
            : favorite
        )
      );
    } else {
      setFavorites([...favorites, { _id, isFavorite: true }]);
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
  };

  const updateIngredient = (id, updatedIngredient) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient._id === id
        ? { ...ingredient, ...updatedIngredient }
        : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const toggleFavoritePairing = (_id) => {
    const foundPairing = pairingsInfo.find((pairing) => pairing._id === _id);

    if (foundPairing) {
      setPairingsInfo(
        pairingsInfo.map((pairing) =>
          pairing._id === foundPairing._id
            ? { ...pairing, isFavorite: !pairing.isFavorite }
            : pairing
        )
      );
    } else {
      setPairingsInfo([...pairingsInfo, { _id, isFavorite: true }]);
    }
  };

  const updatePairingRating = (_id, newRating) => {
    const updatedPairings = pairings.map((pairing) =>
      pairing._id === _id
        ? {
            ...pairing,
            totalRatings: pairing.totalRatings + 1,
            rating:
              (pairing.rating * pairing.totalRatings + newRating) /
              (pairing.totalRatings + 1),
          }
        : pairing
    );

    setPairings(updatedPairings);
    localStorage.setItem("pairings", JSON.stringify(updatedPairings));
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
        pairings={pairings}
        toggleFavoritePairing={toggleFavoritePairing}
        updatePairingRating={updatePairingRating}
        pairingsInfo={pairingsInfo}
        comments={comments}
      />
      <Navigation />
    </>
  );
}

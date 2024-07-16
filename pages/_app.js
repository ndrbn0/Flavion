import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import ingredientsData from "@/assets/ingredients.json";
import { nanoid } from "nanoid";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";
import pairingsData from "../assets/pairings.json";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: ingredientsData,
  });

  const [favorites, setFavorites] = useLocalStorageState("favorite", {
    defaultValue: [],
  }); // to generic

  const [pairings, setPairings] = useLocalStorageState("parings", {
    defaultValue: pairingsData,
  });

  const [pairingsInfo, setPairingsInfo] = useLocalStorageState("pairingsInfo", {
    defaultValue: pairingsData.map((pairing) => ({
      ...pairing,
      isFavorite: false,
      comments: [],
    })),
  });

  const handleCommentSubmit = (comment, pairingId, commentId) => {
    const updatedPairingsInfo = pairingsInfo.map((pairing) => {
      if (pairing._id === pairingId) {
        if (commentId) {
          const updatedComments = pairing.comments.map((com) =>
            comment.id === commentId ? { ...comment, text: comment } : comment
          );
          return { ...pairing, comments: updatedComments };
        } else {
          const newComment = { id: nanoid(), text: comment };
          return { ...pairing, comments: [...pairing.comments, newComment] };
        }
      }
      return pairing;
    });
    setPairingsInfo(updatedPairingsInfo);
  };

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
    const updatedPairingsInfo = pairingsInfo.map((pairing) =>
      pairing._id === _id
        ? { ...pairing, isFavorite: !pairing.isFavorite }
        : pairing
    );
    setPairingsInfo(updatedPairingsInfo);
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
        pairingsInfo={pairingsInfo}
        handleCommentSubmit={handleCommentSubmit}
      />
      <Navigation />
    </>
  );
}

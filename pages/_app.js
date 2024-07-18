import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import ingredientsData from "@/assets/ingredients.json";
import pairingsData from "../assets/pairings.json";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: ingredientsData,
  });

  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });
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

  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentPairingId, setCurrentPairingId] = useState(null);

  function handleAddComment(pairingId, newComment) {
    setPairingsInfo(
      pairingsInfo.map((pairing) => {
        if (pairingId === pairing._id) {
          return {
            ...pairing,
            comments: [
              ...pairing.comments,
              { _id: nanoid(), text: newComment },
            ],
          };
        } else {
          return pairing;
        }
      })
    );
  }
  function handleEditComment(pairingId, commentId, updatedText) {
    setPairingsInfo(
      pairingsInfo.map((pairing) => {
        if (pairingId === pairing._id) {
          return {
            ...pairing,
            comments: pairing.comments.map((comment) =>
              comment._id === commentId
                ? { ...comment, text: updatedText }
                : comment
            ),
          };
        } else {
          return pairing;
        }
      })
    );
  }
  const [comments, setComments] = useLocalStorageState("comments", {
    defaultValue: [],
  });

  function handleDeleteComment(pairingId, commentId) {
    setPairingsInfo(
      pairingsInfo.map((pairing) => {
        if (pairingId === pairing._id) {
          return {
            ...pairing,
            comments: pairing.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        } else {
          return pairing;
        }
      })
    );
  }
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

  const deletePairing = (id) => {
    const updatedPairings = pairings.filter((pairing) => pairing._id !== id);
    setPairings(updatedPairings);
  };

  const addNewPairing = (newPairing) => {
    const pairingWithId = {
      ...newPairing,
      _id: nanoid(),
      rating: 0,
      totalRatings: 0,
    };
    setPairings((prevPairings) => [pairingWithId, ...prevPairings]);
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
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        showCommentPopup={showCommentPopup}
        setShowCommentPopup={setShowCommentPopup}
        currentPairingId={currentPairingId}
        setCurrentPairingId={setCurrentPairingId}
        comments={comments}
        updatePairingRating={updatePairingRating}
        onDeletePairing={deletePairing}
        onAddPairing={addNewPairing}

      />
      <Navigation />
    </>
  );
}

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

  const [pairings, setPairings] = useLocalStorageState("pairings", {
    defaultValue: pairingsData.map((pairing) => ({
      ...pairing,
      rating: 0,
      totalRatings: 0,
    })),
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

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    reason: "",
    imgUrl: "",
    ingredients: [],
  });

  function handleAddComment(pairingId, newComment) {
    console.log("Adding comment:", pairingId, newComment);
    setPairingsInfo(
      pairingsInfo.map((pairing) => {
        if (pairingId === pairing._id) {
          return {
            ...pairing,
            comments: [
              ...(pairing.comments || []),
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
    console.log("Editing comment:", pairingId, commentId, updatedText);
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

  function handleDeleteComment(pairingId, commentId) {
    console.log("Deleting comment:", pairingId, commentId);
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
    console.log("Toggling favorite for:", _id);
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
    console.log("Adding ingredient:", newIngredient);
    const updatedIngredients = [
      { _id: nanoid(), ...newIngredient },
      ...ingredients,
    ];
    setIngredients(updatedIngredients);
  };

  const deleteIngredient = (id) => {
    console.log("Deleting ingredient:", id);
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient._id !== id
    );
    setIngredients(updatedIngredients);
  };

  const updateIngredient = (id, updatedIngredient) => {
    console.log("Updating ingredient:", id, updatedIngredient);
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient._id === id
        ? { ...ingredient, ...updatedIngredient }
        : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const toggleFavoritePairing = (_id) => {
    console.log("Toggling favorite pairing for:", _id);
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
    console.log("Updating pairing rating for:", _id, newRating);
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
  };

  const deletePairing = (id) => {
    console.log("Deleting pairing:", id);
    const updatedPairings = pairings.filter((pairing) => pairing._id !== id);
    setPairings(updatedPairings);
  };

  const addNewPairing = (newPairing) => {
    console.log("Adding new pairing:", newPairing);
    const pairingWithId = {
      ...newPairing,
      _id: nanoid(),
      rating: 0,
      totalRatings: 0,
    };
    setPairings((prevPairings) => [pairingWithId, ...prevPairings]);
  };

  function handleEditPairing(updatedPairing, pairingId) {
    console.log("Editing pairing:", pairingId, updatedPairing);
    setPairings(
      pairings.map((pairing) => {
        if (pairing._id === pairingId) {
          return { ...pairing, ...updatedPairing };
        } else {
          return pairing;
        }
      })
    );
  }

  const [comments, setComments] = useLocalStorageState("comments", {
    defaultValue: [],
  });

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
        comments={comments}
        updatePairingRating={updatePairingRating}
        onDeletePairing={deletePairing}
        onAddPairing={addNewPairing}
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        showCommentPopup={showCommentPopup}
        setShowCommentPopup={setShowCommentPopup}
        currentPairingId={currentPairingId}
        setCurrentPairingId={setCurrentPairingId}
        editMode={editMode}
        setEditMode={setEditMode}
        editData={editData}
        setEditData={setEditData}
        handleEditPairing={handleEditPairing}
      />
      <Navigation />
    </>
  );
}

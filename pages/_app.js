import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import ingredientsData from "@/assets/ingredients.json";
import { nanoid } from "nanoid";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/SearchComponent";

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [favorites, setFavorites] = useState([]);
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: ingredientsData,
  });


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

  const toggleFavorite = (id) => {
    const index = favorites.findIndex((item) => item._id === id);
    if (index === -1) {
      const favoriteIngredient = ingredients.find((item) => item._id === id);
      setFavorites([...favorites, favoriteIngredient]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
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

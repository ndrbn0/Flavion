import { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import {
  Pairing,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent2,
  Flavors,
  CardFooter,
  FavoriteButton,
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";
import CommentPopup from "./CommentPopup";

const PairingItem = ({ pairing }) => {
  const [favorited, setFavorited] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientData = pairing.ingredients.map((id) =>
      ingredientsData.find((ing) => ing._id === id)
    );
    setIngredients(ingredientData);
  }, [pairing.ingredients]);

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleCommentSubmit = (comment, commentId) => {
    if (commentId) {
      setComments(
        comments.map((c) => (c.id === commentId ? { ...c, text: comment } : c))
      );
    } else {
      const newComment = { id: nanoid(), text: comment };
      setComments([...comments, newComment]);
    }
    setShowCommentPopup(false);
    setEditingComment(null);
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((c) => c.id === commentId);
    setEditingComment(commentToEdit);
    setShowCommentPopup(true);
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };
  console.log(comments);

  return (
    <Pairing>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <FavoriteButton onClick={toggleFavorite}>
          {favorited ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent2>
        <Ingredients>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent2>
      <CardFooter>
        {ingredients.map((ingredient) => (
          <Flavors
            $color={flavorColors[ingredient.flavor]}
            key={ingredient._id}
          >
            #{ingredient.flavor}
          </Flavors>
        ))}
        <CommentEmoji onClick={() => setShowCommentPopup(true)}>
          💬
        </CommentEmoji>
      </CardFooter>
      <CommentPopup
        show={showCommentPopup}
        onClose={() => {
          setShowCommentPopup(false);
          setEditingComment(null);
        }}
        onSubmit={handleCommentSubmit}
        commentToEdit={editingComment}
        onDelete={handleDelete}
      />
    </Pairing>
  );
};

export default PairingItem;

const CommentEmoji = styled.span`
  cursor: pointer;
  margin-left: auto;
`;

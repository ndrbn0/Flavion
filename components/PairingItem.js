import { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import {
  Card,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent,
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
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, text: comment } : c
        )
      );
    } else {
      const newComment = { id: nanoid(), text: comment };
      setComments([...comments, newComment]);
    }
    setShowCommentPopup(false);
    setEditingComment(null);
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setEditingComment(commentToEdit);
    setShowCommentPopup(true);
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    setShowCommentPopup(false);
  };

  return (
    <Card>
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
      <StyledContent>
        <Ingredients>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
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
      <CommentsSection>
        {comments.map((comment) => (
          <Comment key={comment.id}>
            {comment.text}{" "}
            <EditButton onClick={() => handleEdit(comment.id)}>Edit</EditButton>
          </Comment>
        ))}
      </CommentsSection>
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
    </Card>
  );
};

export default PairingItem;

const CommentEmoji = styled.span`
  cursor: pointer;
  margin-left: auto;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const Comment = styled.div`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-left: 8px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
  &:active {
    background-color: #0056b3;
  }
`;

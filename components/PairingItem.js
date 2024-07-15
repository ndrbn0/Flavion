import React, { useState } from "react";
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
  Ingredient,
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";
import CommentPopup from "@/components/CommentPopup";
import StarRating from "./RatingStar";

const PairingItem = ({ pairing, toggleFavoritePairing, isFavorite }) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [rating, setRating] = useState(pairing.rating || 0);
  const [totalRatings, setTotalRatings] = useState(pairing.totalRatings || 0);

  const ingredients = pairing.ingredients.map((id) => {
    const ingredient = ingredientsData.find((ing) => ing._id === id);
    return ingredient;
  });

  const handleCommentSubmit = (comment, commentId) => {
    if (commentId) {
      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, text: comment } : c
      );
      setComments(updatedComments);
    } else {
      setComments([...comments, { id: nanoid(), text: comment }]);
    }
    setShowCommentPopup(false);
    setEditingComment(null);
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((c) => c.id === commentId);
    if (commentToEdit) {
      setEditingComment(commentToEdit);
      setShowCommentPopup(true);
    }
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);
    setShowCommentPopup(false);
  };

  const handleRate = (newRating) => {
    const updatedRating =
      (rating * totalRatings + newRating) / (totalRatings + 1);
    setRating(updatedRating);
    setTotalRatings(totalRatings + 1);
  };

  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <FavoriteButton onClick={() => toggleFavoritePairing(pairing._id)}>
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <ul>
          <Ingredients>
            {ingredients.map((ingredient) => {
              return (
                <Ingredient key={ingredient._id}>{ingredient.name}</Ingredient>
              );
            })}
          </Ingredients>
        </ul>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {ingredients.map((ingredient) => {
          return (
            <Flavors
              $color={flavorColors[ingredient.flavor]}
              key={ingredient._id}
            >
              #{ingredient.flavor}
            </Flavors>
          );
        })}
        <CommentEmoji onClick={() => setShowCommentPopup(true)}>
          💬
        </CommentEmoji>
        <StarRating rating={rating} onRate={handleRate} />
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
      <Comments>
        {comments.map((comment) => (
          <Comment key={comment.id}>
            {comment.text}
            <EditButton onClick={() => handleEdit(comment.id)}>Edit</EditButton>
          </Comment>
        ))}
      </Comments>
    </Card>
  );
};

export default PairingItem;

const CommentEmoji = styled.span`
  cursor: pointer;
  margin-left: auto;
  font-size: 24px;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }
`;

const Comments = styled.div`
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

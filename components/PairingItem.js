

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent,
  FavoriteButton,
} from "@/_styles";
import { flavorColors } from "@/utils";
import ingredientsData from "@/assets/ingredients.json";
import CommentPopup from "@/components/CommentPopup";
import StarRating from "./RatingStar";


const PairingItem = ({
  pairing,
  setShow,
  onCommentButtonClick,
  isFavorite,
  toggleFavoritePairing,
}) => {
  const ingredientData = pairing.ingredients.map((id) =>
    ingredientsData.find((ing) => ing._id === id)
  );

  updatePairingRating,
  onDeletePairing,
  ingredients,
}) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [ingredientDetails, setIngredientDetails] = useState([]);

  useEffect(() => {
    if (
      pairing &&
      pairing.ingredients &&
      Array.isArray(pairing.ingredients) &&
      ingredients
    ) {
      const ingredientsList = pairing.ingredients
        .map((id) => ingredients.find((ing) => ing._id === id))
        .filter((ingredient) => ingredient);
      setIngredientDetails(ingredientsList);
    }
  }, [pairing, ingredients]);

  const handleCommentSubmit = (commentText, commentId) => {
    if (commentId) {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: commentText } : comment
      );
      setComments(updatedComments);
    } else {
      setComments([...comments, { id: nanoid(), text: commentText }]);
    }
    setShowCommentPopup(false);
    setEditingComment(null);
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setEditingComment(commentToEdit);
      setShowCommentPopup(true);
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setShowCommentPopup(false);
  };


  const handleDeletePairing = () => {
    onDeletePairing(pairing._id);
    setShowDeletePopup(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <Card>
      {showSuccessMessage && (
        <SuccessMessage>Pairing successfully deleted!</SuccessMessage>
      )}
      <ImageWrapper>
        <StyledImage
          src={pairing.imgUrl}
          alt={pairing.reason}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <FavoriteButton onClick={() => toggleFavoritePairing(pairing._id)}>
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
        <Ingredients>
          {ingredientData.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.name}</li>
          ))}
        </Ingredients>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {ingredientData.map((ingredient) => (
          <Flavors
            $color={flavorColors[ingredient.flavor]}
            key={ingredient._id}
          >
            #{ingredient.flavor}
          </Flavors>
        ))}
        <CommentEmoji
          onClick={() => {
            setShow(true);
            onCommentButtonClick();
          }}
        >
          💬
        </CommentEmoji>
      </CardFooter>
        <ul>
          <Ingredients>
            {ingredientDetails.map((ingredient) => (
              <Ingredient key={ingredient._id}>{ingredient.name}</Ingredient>
            ))}
          </Ingredients>
        </ul>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        <FlavorContainer>
          {ingredientDetails.map((ingredient) => (
            <Flavors
              $color={flavorColors[ingredient.flavor]}
              key={ingredient._id}
            >
              #{ingredient.flavor}
            </Flavors>
          ))}
        </FlavorContainer>
        <FooterActions>
          <StarRating
            rating={pairing.rating || 0}
            id={pairing._id}
            updatePairingRating={updatePairingRating}
          />
          <CommentEmoji onClick={() => setShowCommentPopup(true)}>
            💬
          </CommentEmoji>
          <DeleteButton onClick={() => setShowDeletePopup(true)}>
            🗑️
          </DeleteButton>
        </FooterActions>
      </CardFooter>
      <CommentPopup
        show={showCommentPopup}
        onClose={() => {
          setShowCommentPopup(false);
          setEditingComment(null);
        }}
        onSubmit={handleCommentSubmit}
        commentToEdit={editingComment}
        onDelete={handleDeleteComment}
      />
      {showDeletePopup && (
        <DeletePopup>
          <DeleteMessage>
            Are you sure you want to delete this pairing?
          </DeleteMessage>
          <ButtonGroup>
            <ConfirmButton onClick={handleDeletePairing}>Yes</ConfirmButton>
            <CancelButton onClick={() => setShowDeletePopup(false)}>
              No
            </CancelButton>
          </ButtonGroup>
        </DeletePopup>
      )}
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

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  z-index: 2000;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
`;

const FlavorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const Flavors = styled.span`
  background-color: ${(props) => props.$color || "#ccc"};
  color: #fff;
  border-radius: 8px;
  padding: 4px 8px;
  margin: 4px 4px 0 0;
  font-size: 12px;
  white-space: nowrap;
`;

const FooterActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const CommentEmoji = styled.span`
  cursor: pointer;
  margin-left: auto;
  margin-left: 10px;
  font-size: 24px;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }
`;

const Comments = styled.div`
  padding: 8px;
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;
  margin-left: 10px;
  font-size: 24px;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #cc0000;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
  }

  &:active {
    color: #990000;
  }
`;

const DeletePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
`;

const DeleteMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
  }

  &:active {
    background-color: #990000;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #bbb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(200, 200, 200, 0.5);
  }

  &:active {
    background-color: #aaa;
  }
`;

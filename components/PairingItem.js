import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import {
  Card,
  Ingredients,
  Reason,
  ImageWrapper,
  StyledImage,
  StyledContent,
  FavoriteButton,
  Ingredient,
} from "@/_styles";
import { flavorColors } from "@/utils";
import StarRating from "./RatingStar";

const PairingItem = ({
  pairing,
  setShow,
  onCommentButtonClick,
  toggleFavoritePairing,
  isFavorite,
  updatePairingRating,
  onDeletePairing,
  ingredients,
  onEditButtonClick,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
        />
        <FavoriteButton onClick={() => toggleFavoritePairing(pairing._id)}>
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
      </ImageWrapper>
      <StyledContent>
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
          <CommentEmoji
            onClick={() => {
              setShow(true);
              onCommentButtonClick();
            }}
          >
            💬
          </CommentEmoji>
          <EditEmoji onClick={onEditButtonClick}>✏️</EditEmoji>
          <DeleteButton onClick={() => setShowDeletePopup(true)}>
            🗑️
          </DeleteButton>
        </FooterActions>
      </CardFooter>

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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }

  &:focus {
    outline: none;
  }

  &:active {
    color: #0056b3;
  }
`;

const DeleteButton = styled(IconWrapper)`
  color: #ff0000;

  &:hover {
    color: #cc0000;
  }

  &:active {
    color: #990000;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
  }
`;

const EditEmoji = styled(IconWrapper)``;

const CommentEmoji = styled(IconWrapper)``;

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

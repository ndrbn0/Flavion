import styled from "styled-components";
import PairingItem from "@/components/PairingItem";
import IngredientItem from "@/components/IngredientItem";
import NewCommentForm from "@/components/NewCommentForm";
import { useState } from "react";

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  ingredients,
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  updatePairingRating,
  showCommentPopup,
  setShowCommentPopup,
  currentPairingId,
  setCurrentPairingId,
  handleEditComment,
  handleDeleteComment,
  handleAddComment,
}) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmitLocal = (comment) => {
    handleAddComment(currentPairingId, comment);
    setShowCommentPopup(false);
    setCurrentPairingId(null);
  };

  const handleEditCommentLocal = () => {
    handleEditComment(currentPairingId, editCommentId, commentText);
    setEditCommentId(null);
    setCommentText("");
  };

  const handleDeleteCommentLocal = (pairingId, commentId) => {
    handleDeleteComment(pairingId, commentId);
    if (comments.length === 1) {
      setShowCommentPopup(false);
      setCurrentPairingId(null);
    }
  };

  const comments = pairingsInfo.find(
    (pairing) => pairing._id === currentPairingId
  )?.comments;

  const favoriteIngredients = ingredients.filter((ingredient) =>
    favorites.find(
      (favorite) => favorite._id === ingredient._id && favorite.isFavorite
    )
  );

  const favoritePairings = pairings.filter((pairing) =>
    pairingsInfo.find(
      (pairingInfo) => pairingInfo._id === pairing._id && pairingInfo.isFavorite
    )
  );

  return (
    <Container>
      <Title>Favorites</Title>
      <StyledList>
        {favoriteIngredients.length > 0 ? (
          favoriteIngredients.map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              ingredient={ingredient}
              isFavorite={
                favorites.find((favorite) => favorite._id === ingredient._id)
                  ?.isFavorite
              }
              toggleFavorite={toggleFavorite}
              updatePairingRating={updatePairingRating}
            />
          ))
        ) : (
          <NoFavoritesMessage>
            You have no favorite ingredients yet.
          </NoFavoritesMessage>
        )}

        {favoritePairings.length > 0 ? (
          favoritePairings.map((favorite) => {
            const pairing = pairings.find(
              (pairing) => pairing._id === favorite._id
            );
            if (pairing) {
              return (
                <PairingItem
                  key={pairing._id}
                  pairing={pairing}
                  toggleFavoritePairing={toggleFavoritePairing}
                  isFavorite={
                    pairingsInfo.find(
                      (pairingInfo) => pairingInfo._id === pairing._id
                    )?.isFavorite
                  }
                  updatePairingRating={updatePairingRating}
                  setShow={setShowCommentPopup}
                  onCommentButtonClick={() => {
                    setCurrentPairingId(
                      pairingsInfo.find(
                        (pairingInfo) => pairingInfo._id === pairing._id
                      )._id
                    );
                  }}
                />
              );
            }
            return null;
          })
        ) : (
          <NoFavoritesMessage>
            You have no favorite pairings yet.
          </NoFavoritesMessage>
        )}
      </StyledList>
      {showCommentPopup && (
        <Overlay
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowCommentPopup(!showCommentPopup);
            }
          }}
        >
          <Popup>
            <NewCommentForm
              onSubmit={handleCommentSubmitLocal}
              onClose={() => setShowCommentPopup(false)}
            />
            <CommentsList>
              {comments.length > 0 &&
                comments.map((comment) => (
                  <Comment key={comment._id}>
                    {editCommentId === comment._id ? (
                      <>
                        <TextArea
                          value={commentText}
                          onChange={(event) =>
                            setCommentText(event.target.value)
                          }
                        />
                        <SaveButton onClick={handleEditCommentLocal}>
                          Save
                        </SaveButton>
                      </>
                    ) : (
                      <>
                        <CommentText>{comment.text}</CommentText>
                        <EditButton
                          onClick={() => {
                            setEditCommentId(comment._id);
                            setCommentText(comment.text);
                          }}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          onClick={() =>
                            handleDeleteCommentLocal(
                              currentPairingId,
                              comment._id
                            )
                          }
                        >
                          Delete
                        </DeleteButton>
                      </>
                    )}
                  </Comment>
                ))}
            </CommentsList>
          </Popup>
        </Overlay>
      )}
    </Container>
  );
};

export default FavoritesPage;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  min-width: 220px;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 5px;
  margin-bottom: 15%;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  border-radius: var(--radius-2xl, 48px);
  padding: 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
  margin: 20px;
`;
const Overlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Popup = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const CommentsList = styled.ul`
  margin-top: 20px;
`;

const Comment = styled.li`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentText = styled.p`
  margin: 0;
`;
const EditButton = styled.button`
  background: #fff;
  color: rgb(156, 156, 156);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  transition: background 0.3s;
  &:hover {
    background: #0056b3;
  }
`;
const DeleteButton = styled.button`
  background: #fff;
  color: rgb(156, 156, 156);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

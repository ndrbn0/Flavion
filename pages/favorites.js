import styled from "styled-components";
import PairingItem from "@/components/PairingItem";
import IngredientItem from "@/components/IngredientItem";
import { IngredientDetailsLink } from "@/_styles";
import NewCommentForm from "@/components/NewCommentForm";
import { useState } from "react";
import EditPairingForm from "@/components/EditPairingForm";

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  ingredients,
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  updatePairingRating,
  onDeletePairing,
  showCommentPopup,
  setShowCommentPopup,
  currentPairingId,
  setCurrentPairingId,
  handleEditComment,
  handleDeleteComment,
  handleAddComment,
  handleEditPairing,
}) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

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
    const comments = pairingsInfo.find(
      (pairing) => pairing._id === pairingId
    )?.comments;
    if (comments?.length === 1) {
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
    <>
      <Title>Favorites</Title>
      <Container>
        <Section>
          <Subtitle>Favorite Ingredients</Subtitle>
          <StyledList>
            {favoriteIngredients.length > 0 ? (
              favoriteIngredients.map((ingredient) => (
                <IngredientDetailsLink
                  key={ingredient._id}
                  href={`/ingredient/${ingredient._id}`}
                >
                  <IngredientItem
                    ingredient={ingredient}
                    isFavorite={
                      favorites.find(
                        (favorite) => favorite._id === ingredient._id
                      )?.isFavorite
                    }
                    toggleFavorite={toggleFavorite}
                    updatePairingRating={updatePairingRating}
                    onDeletePairing={onDeletePairing}
                  />
                </IngredientDetailsLink>
              ))
            ) : (
              <NoFavoritesMessage>
                You have no favorite ingredients yet.
              </NoFavoritesMessage>
            )}
          </StyledList>
        </Section>
        <Section>
          <Subtitle>Favorite Pairings</Subtitle>
          <StyledList>
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
                      ingredients={ingredients}
                      onDeletePairing={onDeletePairing}
                      setShow={setShowCommentPopup}
                      onCommentButtonClick={() => {
                        setCurrentPairingId(
                          pairingsInfo.find(
                            (pairingInfo) => pairingInfo._id === pairing._id
                          )._id
                        );
                      }}
                      onEditButtonClick={() => {
                        setCurrentPairingId(pairing._id);
                        setShowEditPopup(true);
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
                  setShowCommentPopup(false);
                }
              }}
            >
              <Popup>
                <NewCommentForm
                  onSubmit={handleCommentSubmitLocal}
                  onClose={() => setShowCommentPopup(false)}
                />
                <CommentsList>
                  {comments &&
                    comments.length > 0 &&
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
          {showEditPopup && (
            <Overlay
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setShowEditPopup(!showEditPopup);
                }
              }}
            >
              <Popup>
                <EditPairingForm
                  ingredients={ingredients}
                  defaultData={pairings.find(
                    (pairing) => pairing._id === currentPairingId
                  )}
                  onSubmit={(updatedPairing) => {
                    handleEditPairing(updatedPairing, currentPairingId);
                    setShowEditPopup(false);
                  }}
                />
              </Popup>
            </Overlay>
          )}
        </Section>
      </Container>
    </>
  );
};

export default FavoritesPage;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  background-color: #f5e4b5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 5px;
  margin-bottom: 15%;
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 18px;
  padding: 10px;
  background-color: #f5e4b5;
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
  margin: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
  max-width: 500px;
`;

const CommentsList = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentText = styled.p`
  margin: 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 8px;
`;

const SaveButton = styled.button`
  margin-right: 10px;
`;

const EditButton = styled.button`
  margin-right: 10px;
`;

const DeleteButton = styled.button``;

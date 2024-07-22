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
      {/* <Title>Favorites</Title> */}
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
  padding: 16px;
  gap: 20px;
  margin-bottom: 15%;
  background-image: url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  margin-top: 15px;
  @media (max-width: 768px) {
    padding: 8px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 4px;
    gap: 5px;
    margin-bottom: 20%;
  }
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding: 0 5px;
  }

  @media (max-width: 480px) {
    margin-bottom: 5px;
    padding: 0 2px;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

// const Title = styled.h1`
//   margin-top: 15px;
//   text-align: center;
//   margin-bottom: 15px;
//   border-radius: var(--radius-2xl, 48px);
//   background: linear-gradient(
//       0deg,
//       var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
//       var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
//     ),
//     var(--Primary-primary, #153f52);
//   padding: 10px;
//   background: linear-gradient(
//       0deg,
//       var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
//       var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
//     ),
//     var(--Primary-primary, #0d1f28);
//   box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
//     0px 1px 2px 0px rgba(0, 0, 0, 0.06);

//   text-transform: uppercase;

//   width: 100%;

//   border-radius: var(--br-5xl);
//   background-color: var(--color-sandybrown);

//   align-items: flex-start;

//   padding: var(--padding-13xl) var(--padding-16xl);

//   margin-bottom: 20px;

//   background-image: url("https://images.unsplash.com/photo-1606914469633-bd39206ea739?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Add this line */
//   background-position: center;
//   box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
//     0px 1px 2px 0px rgba(0, 0, 0, 0.06);
//   font-size: var(--font-size-101xl);
//   color: white;
//   font-family: var(--font-poppins);
//   @media screen and (max-width: 840px) {
//     font-size: 90px;
//   }
//   @media screen and (max-width: 640px) {
//     font-size: 70px;
//   }
//   @media screen and (max-width: 507px) {
//     font-size: 60px;
//   }
//   @media screen and (max-width: 440px) {
//     font-size: 57px;
//   }
//   @media screen and (max-width: 405px) {
//     font-size: 53px;
//   }
//   @media screen and (max-width: 395px) {
//     font-size: 47px;
//   }
//   @media screen and (max-width: 350px) {
//     font-size: 40px;
//   }
//   @media screen and (max-width: 305px) {
//     font-size: 30px;
//   }
// `;

const Subtitle = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 15px;
  border-radius: var(--radius-2xl, 48px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
    ),
    var(--Primary-primary, #153f52);
  padding: 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  text-transform: uppercase;

  width: 100%;

  border-radius: var(--br-5xl);
  background-color: var(--color-sandybrown);

  align-items: flex-start;

  padding: var(--padding-13xl) var(--padding-16xl);

  margin-bottom: 20px;

  background-image: url("https://images.unsplash.com/photo-1606914469633-bd39206ea739?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Add this line */
  background-position: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  font-size: var(--font-size-101xl);
  color: white;
  font-family: var(--font-poppins);
  @media screen and (max-width: 840px) {
    font-size: 90px;
  }
  @media screen and (max-width: 640px) {
    font-size: 70px;
  }
  @media screen and (max-width: 507px) {
    font-size: 60px;
  }
  @media screen and (max-width: 440px) {
    font-size: 57px;
  }
  @media screen and (max-width: 405px) {
    font-size: 53px;
  }
  @media screen and (max-width: 395px) {
    font-size: 47px;
  }
  @media screen and (max-width: 350px) {
    font-size: 40px;
  }
  @media screen and (max-width: 305px) {
    font-size: 30px;
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
`;

const Overlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;

  @media (max-width: 768px) {
    width: 300px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    width: 260px;
    padding: 12px;
  }
`;

const CommentsList = styled.ul`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 5px;
  }
`;

const Comment = styled.li`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 8px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    margin-top: 6px;
  }
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

  @media (max-width: 768px) {
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
  }
`;

const SaveButton = styled.button`
  background: #ff7f50;
  color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  transition: background 0.3s;

  &:hover {
    background: #b05e3f;
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
  }
`;

const DeleteButton = styled.button`
  background: #fff;
  color: rgb(156, 156, 156);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
  }
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

  @media (max-width: 768px) {
    height: 50px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    height: 40px;
    padding: 6px;
  }
`;

import styled from "styled-components";
import PairingItem from "./PairingItem";
import EditPairing from "./EditPairing";
import { useState } from "react";

const PairingsList = ({
  pairings,
  toggleFavoritePairing,
  pairingsInfo,
  onRate,
  updatePairingRating,
  onDeletePairing,
  ingredients,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  setShowCommentPopup,
  showCommentPopup,
  setCurrentPairingId,
  currentPairingId,
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
    if (comments.length === 1) {
      setShowCommentPopup(false);
      setCurrentPairingId(null);
    }
  };
  console.log(currentPairingId);

  const comments =
    pairingsInfo.find((pairing) => pairing._id === currentPairingId)
      ?.comments ?? [];
  return (
    <>
      <Container>
        <StyledList>
          {pairings.map((pairing) => (
            <PairingItem
              key={pairing._id}
              pairing={pairing}
              ingredients={ingredients}
              onRate={onRate}
              updatePairingRating={updatePairingRating}
              toggleFavoritePairing={toggleFavoritePairing}
              isFavorite={
                pairingsInfo.find(
                  (pairingInfo) => pairingInfo._id === pairing._id
                )?.isFavorite
              }
              onDeletePairing={onDeletePairing}
              setShow={setShowCommentPopup}
              onCommentButtonClick={() => {
                setCurrentPairingId(
                  pairingsInfo.find(
                    (pairingInfo) => pairingInfo._id === pairing._id
                  )?._id
                );
              }}
              onEditButtonClick={() => {
                setCurrentPairingId(
                  pairingsInfo.find(
                    (pairingInfo) => pairingInfo._id === pairing._id
                  )?._id
                );
                setShowEditPopup(true);
              }}
            />
          ))}
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
        {showEditPopup && (
          <EditPairing
            isOpen={showEditPopup}
            onClose={() => setShowEditPopup(false)}
            editData={pairings.find(
              (pairing) => pairing._id === currentPairingId
            )}
            onSave={(updatedPairing) => {
              handleEditPairing(updatedPairing, currentPairingId);
            }}
            ingredients={ingredients}
          />
        )}
      </Container>
    </>
  );
};

export default PairingsList;

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

// Overlay for popups
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Popup container
const Popup = styled.div`
  background: var(--Theme-colors-ui-2, #fff);
  border-radius: var(--radius-md, 24px);
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// New comment form container
const NewCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Comments list
const CommentsList = styled.div`
  margin-top: 20px;
`;

// Individual comment
const Comment = styled.div`
  background: var(--Theme-colors-ui-3, #f9f9f9);
  border-radius: var(--radius-md, 24px);
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Text area for editing comments
const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  border: 1px solid var(--Theme-colors-ui-4, #ddd);
  border-radius: var(--radius-md, 24px);
  padding: 10px;
  resize: none;
`;

// Button styles
const Button = styled.button`
  background: var(--Primary-primary, #0d1f28);
  color: #fff;
  border: none;
  border-radius: var(--radius-md, 24px);
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: var(--Primary-primary-dark, #0a1a22);
  }
`;

// Specific buttons
const SaveButton = styled(Button)`
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;

const EditButton = styled(Button)`
  background: #007bff;

  &:hover {
    background: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;

// Text for comments
const CommentText = styled.p`
  margin: 0;
  font-size: 14px;
`;

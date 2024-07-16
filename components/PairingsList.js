import styled from "styled-components";
import PairingItem from "./PairingItem";
import NewCommentForm from "./NewCommentForm";
import { useState } from "react";

const PairingsList = ({
  pairings,
  toggleFavoritePairing,
  pairingsInfo,
  updatePairingRating,
  handleCommentSubmit,
}) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [currentPairingId, setCurrentPairingId] = useState(null);

  const handleCommentSubmitLocal = (comment, commentId) => {
    handleCommentSubmit(comment, currentPairingId, commentId);
    setShowCommentPopup(false);
    setEditingComment(null);
    setCurrentPairingId(null);
    console.log("Comment submitted:", comment);
  };

  const handleEdit = (commentId, pairingId) => {
    const pairing = pairingsInfo.find((p) => p._id === pairingId);
    const commentToEdit = pairing.comments.find(
      (comment) => comment.id === commentId
    );
    setEditingComment(commentToEdit);
    setShowCommentPopup(true);
    setCurrentPairingId(pairingId);
  };

  /*const handlePairingDelete = (_id) => {
    const updatedPairingsInfo = pairingsInfo.filter(
      (pairing) => pairing._id !== _id
    );
    handleDelete(updatedPairingsInfo);
  };*/
  return (
    <>
      <Title>Pairings</Title>
      <Container>
        <StyledList>
          {pairings.map((pairing) => (
            <PairingItem
              key={pairing._id}
              pairing={pairing}
              updatePairingRating={updatePairingRating}
              toggleFavoritePairing={toggleFavoritePairing}
              isFavorite={
                pairingsInfo.find(
                  (pairingInfo) => pairingInfo._id === pairing._id
                )?.isFavorite
              }
              handleCommentSubmit={handleCommentSubmitLocal}
              setShow={setShowCommentPopup}
              comments={
                pairingsInfo.find((pairing) => pairing._id === pairing._id)
                  ?.comments || []
              }
              handleEdit={handleEdit}
            />
          ))}
          <NewCommentForm
            show={showCommentPopup}
            onClose={() => {
              setShowCommentPopup(false);
              setEditingComment(null);
              setCurrentPairingId(null);
            }}
            onSubmit={handleCommentSubmitLocal}
            commentToEdit={editingComment}
            pairingsInfo={pairingsInfo}
          />
        </StyledList>
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

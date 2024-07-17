import styled from "styled-components";
import PairingItem from "./PairingItem";
import NewCommentForm from "./NewCommentForm";
import { useState } from "react";

const PairingsList = ({
  pairings,
  toggleFavoritePairing,
  pairingsInfo,
  updatePairingRating,
  handleAddComment,
}) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentPairingId, setCurrentPairingId] = useState(null);

  const handleCommentSubmitLocal = (comment) => {
    handleAddComment(currentPairingId, comment);
    setShowCommentPopup(false);
    setCurrentPairingId(null);
  };

  const comments = pairingsInfo.find(
    (pairing) => pairing._id === currentPairingId
  )?.comments;

  return (
    <>
      <Title>Pairings</Title>
      <Container>
        <StyledList>
          {pairings.map((pairing) => (
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
                      <CommentText>{comment.text}</CommentText>
                    </Comment>
                  ))}
              </CommentsList>
            </Popup>
          </Overlay>
        )}
      </Container>
    </>
  );
};

export default PairingsList;

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

import styled from "styled-components";
import PairingItem from "./PairingItem";
import NewCommentForm from "./NewCommentForm";
import { useState } from "react";
import { nanoid } from "nanoid";

const PairingsList = ({
  pairings,
  toggleFavoritePairing,
  pairingsInfo,
  updatePairingRating,
  onAddComment,
}) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

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
            />
          ))}
          <CommentsSection>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                {comment.text}{" "}
                <EditButton onClick={() => handleEdit(comment.id)}>
                  Edit
                </EditButton>
              </Comment>
            ))}
          </CommentsSection>
          <NewCommentForm
            show={showCommentPopup}
            onClose={() => {
              setShowCommentPopup(false);
              setEditingComment(null);
            }}
            onSubmit={handleCommentSubmit}
            commentToEdit={editingComment}
            onDelete={handleDelete}
            onAddComment={onAddComment}
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

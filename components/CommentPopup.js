import React, { useState } from "react";
import styled from "styled-components";

const CommentPopup = ({ show, onClose, onSubmit, commentToEdit, onDelete }) => {
  const [comment, setComment] = useState(
    commentToEdit ? commentToEdit.text : ""
  );

  const handleSubmit = () => {
    onSubmit(comment, commentToEdit ? commentToEdit.id : null);
    setComment("");
  };

  if (!show) {
    return null;
  }

  return (
    <Overlay>
      <Popup>
        <Header>
          <Title>{commentToEdit ? "Edit Comment" : "Add Comment"}</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>
        <Body>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a comment..."
          />
        </Body>
        <Footer>
          {commentToEdit && (
            <DeleteButton onClick={() => onDelete(commentToEdit.id)}>
              Delete
            </DeleteButton>
          )}
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Footer>
      </Popup>
    </Overlay>
  );
};

export default CommentPopup;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Body = styled.div`
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

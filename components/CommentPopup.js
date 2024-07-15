import { useState } from "react";
import styled from "styled-components";

const CommentPopup = ({ show, onClose, onSubmit, commentToEdit, onDelete }) => {
  const [comment, setComment] = useState(
    commentToEdit ? commentToEdit.text : ""
  );

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment, commentToEdit ? commentToEdit.id : null);
      setComment("");
      onClose();
    }
  };

  if (!show) return null;

  return (
    <Overlay>
      <Popup>
        <Header>
          <Title>{commentToEdit ? "Edit Comment" : "Comment"}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          <TextArea
            label="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write your comment..."
          />
        </Content>
        <Footer>
          {commentToEdit && (
            <DeleteButton onClick={() => onDelete(commentToEdit.id)}>
              Delete
            </DeleteButton>
          )}
          <SubmitButton onClick={handleSubmit} disabled={!comment.trim()}>
            {commentToEdit ? "Update" : "Submit"}
          </SubmitButton>
        </Footer>
      </Popup>
    </Overlay>
  );
};

export default CommentPopup;

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #000;
  }
`;

const Content = styled.section`
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
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

const Footer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
  transition: background 0.3s;
  &:hover {
    background: #c82333;
  }
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

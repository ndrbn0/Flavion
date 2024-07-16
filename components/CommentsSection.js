import React, { useState } from "react";
import styled from "styled-components";

const CommentsSection = ({ comments, handleEdit }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Placeholder function for editing comments
  const editComment = (commentId) => {
    handleEdit(commentId);
    setShowPopup(true);
  };

  return (
    <Popup show={showPopup}>
      <Header>
        <Title>Comments</Title>
        <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>
      </Header>
      <Content>
        {comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentText>{comment.text}</CommentText>
            <EditButton onClick={() => editComment(comment.id)}>
              Edit
            </EditButton>
          </Comment>
        ))}
      </Content>
    </Popup>
  );
};

export default CommentsSection;

const Popup = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
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

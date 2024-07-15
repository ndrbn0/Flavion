import styled from "styled-components";

const CommentsListPopup = ({ show, comments, onClose, onEdit }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Popup>
        <Header>
          <Title>Comments</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              {comment.text}
              <EditButton onClick={() => onEdit(comment.id)}>Edit</EditButton>
            </Comment>
          ))}
        </Content>
      </Popup>
    </Overlay>
  );
};

export default CommentsListPopup;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
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

const Content = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const Comment = styled.div`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

import styled from "styled-components";

const NewCommentForm = ({ onSubmit, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const comment = event.target.elements.comment.value;

    onSubmit(comment);
  };

  return (
    <>
      <Header>
        <Title>Add Coment</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>
      <form onSubmit={handleSubmit}>
        <Content>
          <TextArea placeholder="Write a comment..." name="comment" />
        </Content>
        <Footer>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Footer>
      </form>
    </>
  );
};
export default NewCommentForm;

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

const Content = styled.label`
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

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 14px;
  background-color: #ff7f50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b05e3f;
  }
`;

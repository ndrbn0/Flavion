import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Container = styled.div`
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
  align-self: stretch;
  padding: 8px;
  gap: 5 0px;
  margin-bottom: 25%;
  margin-top: 0;
`;

export const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  align-self: stretch;
  height: 210px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: hidden;
`;

export const StyledContent = styled.div`
  display: flex;
  padding: 24px 12px 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 16px;
  display: block;
`;

export const Flavor = styled.span`
  font-style: italic;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: ${(props) => props.$color};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackLink = styled(Link)`
  cursor: pointer;
  font-size: 16px;
  color: white;
  margin: 32px 16px;
  text-decoration: none;
  font-style: italic;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #000000;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

export const List = styled.ul`
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

export const StyledListItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 300px;
  height: 380px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: var(--radius-2xl, 48px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
    ),
    var(--Primary-primary, #153f52);
  padding: 0px 10px 10px 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const CardFooter = styled.div`
  display: flex;
  padding: 8px 12px 12px 8px;
  justify-content: start;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const DetailsCard = styled.div`
  text-decoration: none;
  color: inherit;
  width: 300px;
  height: 380px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: var(--radius-2xl, 48px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
    ),
    var(--Primary-primary, #153f52);
  padding: 0px 10px 10px 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
`;
export const DeleteButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 300px;
  border-radius: 15px;
  &:hover {
    background-color: darkred;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  p {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #ccc;
    &:hover {
      background-color: #999;
    }
  }
`;

export const DialogButton = styled.button`
  padding: 10px 20px;

  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d43f3a;
  }
`;

export const CancelButton = styled(DialogButton)`
  background-color: red;
  color: white;
  border-radius: 15px;
  &:hover {
    background-color: darkred;
  }
`;
////

export const EditButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 300px;
  border-radius: 15px;
  &:hover {
    background-color: darkblue;
  }
`;

export const Form = styled.form`
  margin-top: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => (props.secondary ? "#6c757d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.secondary ? "#5a6268" : "#0056b3")};
  }
`;
export const EditForm = styled.form`
  gap: 15px;
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md, 24px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  padding: 24px;
`;
export const SaveButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
`;

export const FilterContainer = styled.div`
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
  gap: 10px;
  padding: 32px;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? props.$color : "#f0f0f0")};
  color: ${(props) => (props.$active ? "#000000" : "#333")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? props.$color : "#e0e0e0")};
  }
`;

export const NoMatchMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;
export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 20px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow-y: auto;
    border-top: 1px solid #e0e0e0;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 18px;
  border: none;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;
export const ResultsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const SearchResult = styled.li`
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #f8f8f8;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

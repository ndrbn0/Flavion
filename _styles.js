import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Container = styled.div`
  width: calc(100% - 20px);
  height: 60%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
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
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledContent = styled.div`
  padding: 10px;
  text-align: center;
  margin-top: 20px;
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
  display: inline-block;
`;

export const BackLink = styled(Link)`
  cursor: pointer;
  font-size: 16px;
  color: black;
  margin: 32px 16px;
  text-decoration: none;
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

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

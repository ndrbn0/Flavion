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

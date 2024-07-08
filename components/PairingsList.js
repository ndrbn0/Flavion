import styled from "styled-components";
import PairingItem from "./PairingItem";

const PairingsList = ({ pairings }) => {
  return (
    <StyledList>
      {pairings.map((pairing) => (
        <PairingItem key={pairing._id} pairing={pairing} />
      ))}
    </StyledList>
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

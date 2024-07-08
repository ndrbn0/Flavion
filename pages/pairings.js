import styled from "styled-components";
import Link from "next/link";

const PairingsPage = () => {
  return (
    <StyledContainer>
      <h1>Pairings Page</h1>
      <p>This page will contain pairings information.</p>
      <Link href="/">Go to Ingredients</Link>
    </StyledContainer>
  );
};

export default PairingsPage;

const StyledContainer = styled.div`
  padding: 32px;
  text-align: center;
`;

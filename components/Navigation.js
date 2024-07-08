import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Navigation = () => {
  const router = useRouter();

  return (
    <NavBar>
      <StyledLink href="/" $active={router.pathname === "/"}>
        I
      </StyledLink>
      <StyledLink href="/pairings" $active={router.pathname === "/pairings"}>
        P
      </StyledLink>
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 5vw;
  width: 90vw;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  border: 1px solid #007bff;
  padding: 10px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#007bff" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

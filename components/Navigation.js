import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CiStar, CiLink, CiIceCream } from "react-icons/ci";

const Navigation = () => {
  const router = useRouter();

  return (
    <NavBar>
      <StyledLink href="/" $active={router.pathname === "/"}>
        <CiIceCream />
      </StyledLink>
      <StyledLink href="/pairings" $active={router.pathname === "/pairings"}>
        <CiLink />
      </StyledLink>
      <StyledLink href="/favorites" $active={router.pathname === "/favorites"}>
        <CiStar />
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
  background-color: #ff7f50;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  border: 1px solid #fff;
  padding: 10px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#b05e3f" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#fff")};
  width: 50px;
  height: 50px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;

  &:hover {
    background-color: #b05e3f;
    color: #fff;
  }
`;

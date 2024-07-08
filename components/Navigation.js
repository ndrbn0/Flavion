import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Navigation = () => {
  const router = useRouter();

  return (
    <NavBar>
      <NavItem $active={router.pathname === "/"}>
        <Link href="/">I</Link>
      </NavItem>
      <NavItem $active={router.pathname === "/pairings"}>
        <Link href="/pairings">P</Link>
      </NavItem>
    </NavBar>
  );
};

export default Navigation;

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
`;

const NavItem = styled.div`
  border: 1px solid;
  padding: 10px #007bff;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#007bff" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

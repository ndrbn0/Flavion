import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFlask, faUtensils, faStar } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const router = useRouter();

  return (
    <NavigationRoot>
      <NavigationmenuIngredient href="/" $active={router.pathname === "/"}>
        <HomeWrapper>
          <HomeIcon loading="lazy" alt="" src="/home.svg" />
        </HomeWrapper>
      </NavigationmenuIngredient>
      <NavigationmenuMatches
        href="/pairings"
        $active={router.pathname === "/pairings"}
      >
        <HomeContainer>
          <HomeIcon loading="lazy" alt="" src="/home-1.svg" />
        </HomeContainer>
      </NavigationmenuMatches>
      <NavigationmenuFavorites
        href="/favorites"
        $active={router.pathname === "/favorites"}
      >
        <HomeWrapper>
          <HomeIcon loading="lazy" alt="" src="/home-21.svg" />
        </HomeWrapper>
      </NavigationmenuFavorites>
    </NavigationRoot>
  );
};

export default Navigation;

// const Navigation = () => {
//   const router = useRouter();

//   return (
//     <NavBar>
//       <StyledLink href="/" $active={router.pathname === "/"}>
//         <FontAwesomeIcon icon={faFlask} size="lg" />
//       </StyledLink>
//       <StyledLink href="/pairings" $active={router.pathname === "/pairings"}>
//         <FontAwesomeIcon icon={faUtensils} size="lg" />
//       </StyledLink>
//       <StyledLink href="/favorites" $active={router.pathname === "/favorites"}>
//         <FontAwesomeIcon icon={faStar} size="lg" />
//       </StyledLink>
//     </NavBar>
//   );
// };

// export default Navigation;

const HomeIcon = styled.img`
  width: 19px;
  height: 19px;
  position: relative;
`;
const HomeWrapper = styled.div`
  height: 39px;
  width: 39px;
  border-radius: var(--br-5xl);
  background-color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-3xs) var(--padding-4xs);
`;
const NavigationmenuIngredient = styled(Link)`
  height: 75px;
  width: 75px;
  border-radius: var(--br-52xl);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-lg);
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${({ $active }) =>
    $active ? "var(--color-seagreen-100)" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "var(--color-seagreen-100)" : "#0056b3"};
  }
`;

const NavigationmenuFavorites = styled(Link)`
  height: 75px;
  width: 75px;
  border-radius: var(--br-52xl);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-lg);
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${({ $active }) =>
    $active ? "var(--color-seagreen-100)" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "var(--color-seagreen-100)" : "#0056b3"};
  }
`;

const HomeContainer = styled.div`
  height: 39px;
  width: 39px;
  border-radius: var(--br-5xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-3xs) var(--padding-4xs);
  background-color: black;
`;
const NavigationmenuMatches = styled(Link)`
  height: 75px;
  width: 75px;
  border-radius: var(--br-52xl);

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-lg);
  box-sizing: border-box;
  background-color: ${({ $active }) =>
    $active ? "var(--color-seagreen-100)" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#007bff")};

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "var(--color-seagreen-100)" : "#0056b3"};
  }
`;
const NavigationRoot = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 5vw;
  width: 90vw;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: var(--br-56xl);
  background-color: #d8dfe2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--padding-8xs);
  box-sizing: border-box;
  z-index: 1000;
  line-height: normal;
  letter-spacing: normal;
  gap: var(--gap-xl);
  @media screen and (max-width: 275px) {
    flex-wrap: wrap;
  }
`;

// const NavBar = styled.nav`
//   position: fixed;
//   bottom: 0;
//   left: 5vw;
//   width: 90vw;
//   border-radius: 25px;
//   display: flex;
//   justify-content: space-around;
//   background-color: #fff;
//   box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
//   padding: 10px 0;
//   z-index: 1000; /* Ensure the navigation stays above other content */
// `;

// const StyledLink = styled(Link)`
//   border: 1px solid transparent;
//   padding: 10px;
//   border-radius: 50%;
//   background-color: ${({ $active }) => ($active ? "#007bff" : "transparent")};
//   color: ${({ $active }) => ($active ? "#fff" : "#007bff")};
//   width: 50px;
//   height: 50px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   transition: background-color 0.3s, color 0.3s;

//   &:hover {
//     background-color: ${({ $active }) => ($active ? "#007bff" : "#0056b3")};
//     color: #fff;
//   }
// `;

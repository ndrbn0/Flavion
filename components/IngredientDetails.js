import { useRouter } from "next/router";
import { useState } from "react";
import { flavorColors } from "@/utils";
import {
  ImageWrapper,
  StyledImage,
  StyledContent,
  Name,
  Flavor,
  BackLink,
  CardFooter,
  DetailsCard,
  ConfirmDialog,
  Button,
  Overlay,
  FavoriteButton,
} from "@/_styles";
import styled from "styled-components";

const IngredientDetails = ({
  ingredients,
  deleteIngredient,
  toggleFavorite,
  favorites,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!ingredient) {
    return <p>Loading...</p>;
  }

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteIngredient(id);
    router.push("/");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEdit = () => {
    router.push(`/ingredient/${id}/edit`);
  };

  const isFavorite = favorites.find(
    (favorite) => favorite._id === ingredient._id
  )?.isFavorite;

  return (
    <>
      <Container>
        <BackLink href="/">← Back</BackLink>
        <DetailsCard>
          <ImageWrapper>
            <StyledImage
              src={ingredient.imgUrl}
              alt={ingredient.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <FavoriteButton
              onClick={(event) => toggleFavorite(event, ingredient._id)}
            >
              {isFavorite ? "★" : "☆"}
            </FavoriteButton>
          </ImageWrapper>
          <StyledContent>
            <Name>{ingredient.name}</Name>
            <br />
          </StyledContent>
          <CardFooter>
            <Flavor $color={flavorColors[ingredient.flavor]}>
              #{ingredient.flavor}
            </Flavor>
            <FooterActions>
              <EditEmoji onClick={handleEdit}>✏️</EditEmoji>
              <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
            </FooterActions>
          </CardFooter>
        </DetailsCard>
      </Container>
      {showConfirm && (
        <Overlay>
          <ConfirmDialog>
            <p>Are you sure you want to delete this ingredient?</p>
            <Button type="button" onClick={confirmDelete}>
              Yes
            </Button>
            <Button type="button" onClick={cancelDelete}>
              No
            </Button>
          </ConfirmDialog>
        </Overlay>
      )}
    </>
  );
};

export default IngredientDetails;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }

  &:focus {
    outline: none;
  }

  &:active {
    color: #0056b3;
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-left: 30px;
`;

const EditEmoji = styled(IconWrapper)`
  color: #ff0000;

  &:hover {
    color: #cc0000;
    cursor: pointer;
  }

  &:active {
    color: #990000;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
  }
`;

const DeleteButton = styled(IconWrapper)`
  color: #ff0000;

  &:hover {
    color: #cc0000;
    cursor: pointer;
  }

  &:active {
    color: #990000;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
  }
`;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  display: flex;
  min-width: 220px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 10px;
  gap: 5 0px;
  margin-top: 5%;
  margin-bottom: 15%;
  background-color: #f5e4b5;
  background-image: url("https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Add this line */
`;

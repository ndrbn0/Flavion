import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import ingredients from "@/assets/ingredients.json";

const IngredientDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <>
      <BackLink onClick={() => router.back()}>← Back</BackLink>
      <Container>
        {" "}
        {/* Image wrapper for the ingredient image */}{" "}
        <ImageWrapper>
          {" "}
          <StyledImage
            src={ingredient.imgUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={ingredient.name}
          />{" "}
        </ImageWrapper>{" "}
        {/* Styled content for ingredient name and flavor */}{" "}
        <StyledContent>
          {" "}
          <Name>{ingredient.name}</Name> <br />{" "}
          <Flavor>#{ingredient.flavor}</Flavor>{" "}
        </StyledContent>{" "}
      </Container>
    </>
  );
};

const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  height: 60%;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  align-self: stretch;
  height: 210px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Container = styled.div`
  width: calc(100% - 20px);
  height: 60%;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledContent = styled.div`
  padding: 10px;
  text-align: center;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const Flavor = styled.span`
  font-style: italic;
  font-size: 14px;
`;

const BackLink = styled.a`
  cursor: pointer;
  font-size: 16px;
  color: blue;
  margin-left: 10px;
`;

export default IngredientDetails;

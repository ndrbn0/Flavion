import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import ingredients from "@/assets/ingredients.json";
import { useEffect, useState } from "react";

const IngredientDetails = () => {
  const flavorColors = {
    Bitter: "#D2691E",
    Creamy: "#FFFACD",
    Fresh: "#98FB98",
    Herbal: "#228B22",
    Pungent: "#FF6347",
    Salty: "#F0E68C",
    Savory: "#D2B48C",
    Spicy: "#cf2210",
    Sour: "#d9df0c",
    Sweet: "#FFB6C1",
    Tangy: "#FFA07A",
    Umami: "#188989",
  };

  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredient) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BackLink href="/">← Back</BackLink>
      <Container>
        <ImageWrapper>
          <StyledImage
            src={ingredient.imgUrl}
            alt={ingredient.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </ImageWrapper>
        <StyledContent>
          <Name>{ingredient.name}</Name>
          <br />
          <Flavor $color={flavorColors[ingredient.flavor]}>
            #{ingredient.flavor}
          </Flavor>
        </StyledContent>
      </Container>
    </>
  );
};

const Container = styled.div`
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

const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
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

const StyledContent = styled.div`
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 16px;
  display: block;
`;

const Flavor = styled.span`
  font-style: italic;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: ${(props) => props.$color};
  border-radius: 15px;
  display: inline-block;
`;

const BackLink = styled(Link)`
  cursor: pointer;
  font-size: 16px;
  color: blue;
  margin: 32px 16px;
  text-decoration: none;
`;

export default IngredientDetails;

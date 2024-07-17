import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { flavorColors } from "@/utils"; // Adjust as per your utils location

const NewPairingItem = ({ pairing }) => {
  return (
    <Card>
      <ImageWrapper>
        <StyledImage
          src={pairing.imageUrl}
          alt={pairing.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Favorite button can be added if needed */}
      </ImageWrapper>
      <StyledContent>
        <ul>
          <Ingredients>
            {pairing.ingredients.map((ingredient) => (
              <Ingredient key={ingredient.id}>{ingredient.name}</Ingredient>
            ))}
          </Ingredients>
        </ul>
        <Reason>{pairing.reason}</Reason>
      </StyledContent>
      <CardFooter>
        {pairing.ingredients.map((ingredient) => (
          <Flavors
            $color={flavorColors[ingredient.flavor]} // Adjust based on your flavor mapping
            key={ingredient.id}
          >
            #{ingredient.flavor}
          </Flavors>
        ))}
        {/* Comment section or actions can be added here */}
      </CardFooter>
    </Card>
  );
};

export default NewPairingItem;

const Card = styled.div`
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const StyledContent = styled.div`
  padding: 10px 0;
`;

const Ingredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Ingredient = styled.div`
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
`;

const Reason = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Flavors = styled.span`
  color: ${(props) => props.$color || "#333"};
`;

// Additional styled components for comment section or actions can be added as needed

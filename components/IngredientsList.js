import ingredients from "@/assets/ingredients.json";
import styled from "styled-components";
import Image from "next/image";

const IngredientsList = () => {
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

  return (
    <>
      <Title>Ingredients Overview</Title>
      <Container>
        <List>
          {ingredients.map((ingredient) => (
            <StyledListItem
              key={ingredient._id}
              href={`/ingredient/${ingredient._id}`}
            >
              <ImageWrapper>
                <StyledImage
                  src={ingredient.imgUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={ingredient.name}
                />
              </ImageWrapper>
              <StyledContent>
                <Name>{ingredient.name}</Name>
                <br />
                <Flavor $color={flavorColors[ingredient.flavor]}>
                  #{ingredient.flavor}
                </Flavor>
              </StyledContent>
            </StyledListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: calc(100% - 20px);
  height: 60%;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  /* border-radius: 10px; */
  overflow: hidden;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const List = styled.ul`
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

const StyledListItem = styled.a`
  text-decoration: none;
  color: inherit;
  width: 300px;
  height: 380px;
  margin: 20px;

  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 340px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
`;

const StyledContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
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
  border-radius: 15px 15px 0px 0px;
`;

export default IngredientsList;

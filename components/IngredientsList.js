import ingredients from "@/assets/ingredients.json";
//import flavor from "@/assets/flavors.json";
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
            <ListItem
              key={ingredient._id}
              flavor={ingredient.flavor}
              color={flavorColors[ingredient.flavor]}
            >
              <Image1 />
              <Name>{ingredient.name}</Name>
              <Flavor>{ingredient.flavor}</Flavor>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};
const Container = styled.div`
  /* padding: 20px;
  max-width: 600px;
  margin: auto; */
  width: calc(100% - 20px);
  height: 60%;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  border-radius: 10px;
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
const ListItem = styled.li`
  width: 280px;
  height: 340px;
  margin: 20px;
  padding: 5px;
  border-radius: 10px;
  justify-content: flex-start;
  background-color: ${(props) => props.color || "#fff"};
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
const Name = styled.span`
  font-weight: bold;
`;
const Flavor = styled.span`
  font-style: italic;
`;
const Image1 = styled.div`
  align-self: stretch;
  height: 210px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  background-image: url("assets/Apfel.png.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  /* border: 1px solid black; */
  background-color: #fff;
  border-radius: 10px;
`;
export default IngredientsList;

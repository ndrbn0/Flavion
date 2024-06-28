import ingredients from "@/assets/ingredients.json";
//import flavor from "@/assets/flavors.json";
import styled from "styled-components";

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
    <Container>
      <Title>Ingredients Overview</Title>
      <List>
        {ingredients.map((ingredient) => (
          <ListItem
            key={ingredient._id}
            flavor={ingredient.flavor}
            color={flavorColors[ingredient.flavor]}
          >
            <Name>{ingredient.name}</Name>
            <Flavor>{ingredient.flavor}</Flavor>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.color || "#fff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const Name = styled.span`
  font-weight: bold;
`;
const Flavor = styled.span`
  font-style: italic;
`;

export default IngredientsList;

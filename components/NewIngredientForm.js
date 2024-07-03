import { useState } from "react";
import styled from "styled-components";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const NewIngredientForm = ({ onAddIngredient, flavors }) => {
  const [name, setName] = useState("");
  const [flavor, setFlavor] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIngredient = {
      _id: new Date().toISOString(),
      name,
      flavor,
      imgUrl: imgUrl || placeholderImageUrl,
    };
    onAddIngredient(newIngredient);
    setName("");
    setFlavor("");
    setImgUrl("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <Select
        value={flavor}
        onChange={(event) => setFlavor(event.target.value)}
        required
      >
        <option value="" disabled>
          Select Flavor
        </option>
        {flavors.map((flavor) => (
          <option key={flavor} value={flavor}>
            {flavor}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        placeholder="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
      />
      <Button type="submit">Add Ingredient</Button>
    </Form>
  );
};

export default NewIngredientForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`;

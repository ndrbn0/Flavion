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
      <Headline>Add New Ingredient</Headline>
      <FormField>
        <Label htmlFor="name">Enter Name:</Label>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormField>
      <FormField>
        <Label htmlFor="flavor">Select a flavor:</Label>
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
      </FormField>
      <FormField>
        <Label>Image URL:</Label>
        <Input
          type="text"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          placeholder="Enter image URL"
        />
      </FormField>
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default NewIngredientForm;

const Headline = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

const FormField = styled.div`
  margin-bottom: 16px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
`;

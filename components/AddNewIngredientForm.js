import { useState } from "react";
import styled from "styled-components";
import { flavorColors } from "@/utils";

const AddNewIngredientForm = ({ onAddIngredient }) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [flavor, setFlavor] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (name.length < 1 || name.length > 150) {
      validationErrors.name =
        "Ingredient name must be between 1 and 150 characters.";
    }
    if (!flavor) {
      validationErrors.flavor = "Please select a flavor profile.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newIngredient = {
      _id: Date.now().toString(),
      name,
      imgUrl:
        imgUrl ||
        "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg",
      flavor,
    };

    onAddIngredient(newIngredient);

    setName("");
    setImgUrl("");
    setFlavor("");
    setErrors({});
  };

  return (
    <FormContainer>
      <Headline>Add New Ingredient</Headline>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label>Ingredient Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <Error>{errors.name}</Error>}
        </FormField>
        <FormField>
          <Label>Ingredient Image URL</Label>
          <Input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label>Flavour Tags</Label>
          <Select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
            <option value="">Please select a flavor profile</option>
            {Object.keys(flavorColors).map((flavor) => (
              <option key={flavor} value={flavor}>
                {flavor}
              </option>
            ))}
          </Select>
          {errors.flavor && <Error>{errors.flavor}</Error>}
        </FormField>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

const Headline = styled.h2`
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-top: 4px;
`;

export default AddNewIngredientForm;

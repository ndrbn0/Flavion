import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const EditPairingForm = ({
  onSubmit,
  ingredients,
  defaultData = { imgUrl: "", reason: "", ingredients: [] },
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState(
    ingredients.filter((ingredient) =>
      defaultData.ingredients.includes(ingredient._id)
    )
  );
  const [error, setError] = useState("");

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.some((ing) => ing._id === ingredient._id)) {
      setSelectedIngredients(
        selectedIngredients.filter((ing) => ing._id !== ingredient._id)
      );
    } else {
      if (selectedIngredients.length < 3) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
      } else {
        setError("Maximum of 3 ingredients can be selected.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { reason, imgUrl = placeholderImageUrl } =
      Object.fromEntries(formData);

    if (selectedIngredients.length < 2 || !reason) {
      setError("Please select at least 2 ingredients and provide a reason.");
      return;
    }

    const updatedPairing = {
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      reason,
      imgUrl,
    };

    onSubmit(updatedPairing);
    setSelectedIngredients([]);
    event.target.reset();
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Headline>Update Pairing</Headline>
      <FormField>
        <fieldset>
          <Label htmlFor="ingredients" id="ingredients">
            Select Ingredients:
          </Label>
          <Multiselect>
            {ingredients.map((ingredient) => (
              <CheckboxLabel key={ingredient._id}>
                <Checkbox
                  type="checkbox"
                  onChange={() => handleIngredientToggle(ingredient)}
                  checked={selectedIngredients.some(
                    (ing) => ing._id === ingredient._id
                  )}
                  id={`ingredient-${ingredient._id}`}
                />
                {ingredient.name}
              </CheckboxLabel>
            ))}
          </Multiselect>
        </fieldset>
      </FormField>
      <FormField>
        <Label htmlFor="reason">Reason for Pairing:</Label>
        <TextArea
          id="reason"
          placeholder="Enter Reason for Pairing"
          defaultValue={defaultData.reason}
          name="reason"
          required
        />
      </FormField>
      <FormField>
        <Label htmlFor="imageUrl">Image URL:</Label>
        <Input
          id="imageUrl"
          type="text"
          defaultValue={defaultData.imgUrl}
          name="imgUrl"
          placeholder="Enter image URL"
        />
      </FormField>
      {error && <ErrorText>{error}</ErrorText>}
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default EditPairingForm;

const Headline = styled.legend`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const PopupForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const Multiselect = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

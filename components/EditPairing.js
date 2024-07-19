import React, { useState, useEffect } from "react";
import styled from "styled-components";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const EditPairing = ({
  isOpen,
  onClose,
  editData,
  onInputChange,
  onIngredientChange,
  onSave,
  ingredients,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [reason, setReason] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  // Initialize form fields if editing an existing pairing
  useEffect(() => {
    if (editData) {
      setSelectedIngredients(
        ingredients.filter((ingredient) =>
          editData.ingredients.includes(ingredient._id)
        )
      );
      setReason(editData.reason || "");
      setImgUrl(editData.imgUrl || "");
    }
  }, [editData, ingredients]);

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

    if (selectedIngredients.length < 2 || !reason) {
      setError("Please select at least 2 ingredients and provide a reason.");
      return;
    }

    const pairingData = {
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      reason: reason,
      imgUrl: imgUrl || placeholderImageUrl,
    };

    onSave(pairingData);

    setSelectedIngredients([]);
    setReason("");
    setImgUrl("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <OverlayBackground onClick={onClose} />
      <PopupForm>
        <Form onSubmit={handleSubmit}>
          <Headline>
            {editData ? "Edit Pairing" : "Create New Pairing"}
          </Headline>
          <FormField>
            <fieldset>
              <Label htmlFor="ingredients">Select Ingredients:</Label>
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
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="imageUrl">Image URL:</Label>
            <Input
              id="imageUrl"
              type="text"
              value={imgUrl}
              onChange={(event) => setImgUrl(event.target.value)}
              placeholder="Enter image URL"
            />
          </FormField>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </PopupForm>
    </>
  );
};

export default EditPairing;

const Headline = styled.h2`
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

import React, { useState } from "react";
import styled from "styled-components";
import { ingredientsData } from "@/assets/ingredients.json"; // Import your ingredients data

const PairingFormPopup = ({ onClose, onSave }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [reason, setReason] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSave = () => {
    if (selectedIngredients.length < 2 || reason.trim() === "") {
      alert("Please fill out all required fields.");
      return;
    }

    onSave({
      ingredients: selectedIngredients.map((ing) => ing._id),
      reason,
      imgUrl,
    });

    onClose();
  };

  const handleIngredientSelect = (event) => {
    const ingredientId = event.target.value;
    const selectedIngredient = ingredientsData.find(
      (ing) => ing._id === ingredientId
    );

    setSelectedIngredients((prev) => [...prev, selectedIngredient]);
  };

  return (
    <Background onClick={onClose}>
      <FormContainer onClick={(event) => event.stopPropagation()}>
        <h2>Create Pairing</h2>
        <IngredientSelect onChange={handleIngredientSelect}>
          <option value="">Select Ingredient</option>
          {ingredientsData.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </IngredientSelect>
        <ReasonInput
          type="text"
          placeholder="Reason for pairing"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
        <ImageInput
          type="text"
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ButtonContainer>
      </FormContainer>
    </Background>
  );
};

export default PairingFormPopup;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const IngredientSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReasonInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ImageInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

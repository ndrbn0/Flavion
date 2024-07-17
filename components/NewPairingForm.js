import React, { useState } from "react";
import styled from "styled-components";
import ingredientsData from "@/assets/ingredients.json";
import { nanoid } from "nanoid";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const NewPairingForm = ({ onAddPairing }) => {
  const [ingredients, setIngredients] = useState([]);
  const [reason, setReason] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setError("");
  };

  const handleIngredientToggle = (ingredient) => {
    if (ingredients.some((ing) => ing._id === ingredient._id)) {
      setIngredients(ingredients.filter((ing) => ing._id !== ingredient._id));
    } else {
      if (ingredients.length < 3) {
        setIngredients([...ingredients, ingredient]);
      } else {
        setError("Maximum of 3 ingredients can be selected.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ingredients.length < 2 || !reason) {
      setError("Please select at least 2 ingredients and provide a reason.");
      return;
    }

    const newPairing = {
      _id: nanoid(),
      ingredients: ingredients.map((ingredient) => ingredient._id),
      reason: reason,
      imgUrl: imgUrl || placeholderImageUrl,
      rating: 0, // Assuming initial rating
      comments: [], // Assuming no comments initially
      isFavorite: false, // Assuming it's not a favorite initially
    };

    onAddPairing(newPairing);
    setIngredients([]);
    setReason("");
    setImgUrl("");
    setShowPopup(false);
    setError("");
  };

  return (
    <>
      <Button onClick={togglePopup}>Create Pairing</Button>
      {showPopup && (
        <>
          <OverlayBackground onClick={togglePopup} />
          <PopupForm>
            <Form onSubmit={handleSubmit}>
              <Headline>Create New Pairing</Headline>
              <FormField>
                <Label htmlFor="ingredients">Select Ingredients:</Label>
                <Multiselect>
                  {ingredientsData.map((ingredient) => (
                    <CheckboxLabel key={ingredient._id}>
                      <Checkbox
                        type="checkbox"
                        onChange={() => handleIngredientToggle(ingredient)}
                        checked={ingredients.some(
                          (ing) => ing._id === ingredient._id
                        )}
                      />
                      {ingredient.name}
                    </CheckboxLabel>
                  ))}
                </Multiselect>
              </FormField>
              <FormField>
                <Label htmlFor="reason">Reason for Pairing:</Label>
                <TextArea
                  placeholder="Enter Reason for Pairing"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="imageUrl">Image URL:</Label>
                <Input
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
      )}
    </>
  );
};

export default NewPairingForm;

const Headline = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.97) 0%,
    rgba(255, 255, 255, 0.97) 100%
  );
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  padding: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 15px;
  font-size: 1rem;
`;

const Multiselect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 5px;
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

const Button = styled.button`
  border: none;
  font-style: italic;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #0070f3;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  color: white;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const PopupForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 999;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

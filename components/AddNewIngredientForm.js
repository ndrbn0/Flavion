import { useState } from "react";
import styled from "styled-components";

const AddNewIngredientForm = ({ onAddIngredient }) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [flavor, setFlavor] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
      flavor,
      imgUrl:
        imgUrl ||
        "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg",
    };

    onAddIngredient(newIngredient);

    setName("");
    setImgUrl("");
    setFlavor("");
    setErrors({});
    setShowPopup(false); // Close popup after submission
  };

  return (
    <>
      <Button onClick={togglePopup}>Add Ingredient</Button>
      {showPopup && (
        <>
          <PopupForm>
            <Headline>Add New Ingredient</Headline>
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label>Ingredient Name:</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter ingredient name"
                />
                {errors.name && <Error>{errors.name}</Error>}
              </FormField>
              <FormField>
                <Label>Image URL:</Label>
                <Input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
              </FormField>
              <FormField>
                <Label>Flavor Tags:</Label>
                <Select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                >
                  <option value="">Select a flavor</option>
                  {flavors.map((flavor, index) => (
                    <option key={index} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </Select>
                {errors.flavor && <Error>{errors.flavor}</Error>}
              </FormField>
              <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
          </PopupForm>
          <OverlayBackground onClick={togglePopup} />
        </>
      )}
    </>
  );
};

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

const flavors = [
  "Bitter",
  "Creamy",
  "Fresh",
  "Herbal",
  "Pungent",
  "Salty",
  "Savory",
  "Spicy",
  "Sour",
  "Sweet",
  "Tangy",
  "Umami",
];

// Styled components
const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray */
  z-index: 998; /* Ensure it's below the popup */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 90%;
  padding: 25px;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

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

const FormField = styled.div`
  margin-bottom: 16px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
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

const Error = styled.div`
  color: red;
  margin-top: 4px;
  font-size: 0.875rem;
`;

export default AddNewIngredientForm;

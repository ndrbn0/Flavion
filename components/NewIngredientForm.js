import { useState } from "react";
import styled from "styled-components";

const placeholderImageUrl =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const NewIngredientForm = ({ onAddIngredient, flavors }) => {
  const [name, setName] = useState("");
  const [flavor, setFlavor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
    <>
      <Button onClick={togglePopup}>Add Ingredient</Button>
      {showPopup && (
        <>
          <PopupForm>
            <Headline>Add New Ingredient</Headline>
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
                  alt="imgPlaceholder"
                />
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

export default NewIngredientForm;

const Headline = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md, 24px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  padding: 24px;
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

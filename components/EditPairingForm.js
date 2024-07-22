import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
  const [reason, setReason] = useState(defaultData.reason || "");
  const [imgUrl, setImgUrl] = useState(defaultData.imgUrl || "");
  const [showPopup, setShowPopup] = useState(true);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const popupRef = useRef(null); // Ref to track the popup

  // Close the popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event bubbling to the overlay
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleIngredientSelect = (ingredient, event) => {
    event.stopPropagation(); // Prevent event bubbling to the overlay
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

  const handleRemoveIngredient = (ingredient, event) => {
    event.stopPropagation(); // Prevent event bubbling to the overlay
    setSelectedIngredients(
      selectedIngredients.filter((ing) => ing._id !== ingredient._id)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedIngredients.length < 2 || !reason) {
      setError("Please select at least 2 ingredients and provide a reason.");
      return;
    }

    const updatedPairing = {
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      reason,
      imgUrl: imgUrl || placeholderImageUrl,
    };

    onSubmit(updatedPairing);
    setSelectedIngredients([]);
    setReason("");
    setImgUrl("");
    setShowPopup(false);
    setError("");
  };
  console.log("this is the pop up:", showPopup);
  return (
    <>
      {showPopup && (
        <>
          <OverlayBackground />
          <PopupForm ref={popupRef}>
            <Form onSubmit={handleSubmit}>
              <Headline>Update Pairing</Headline>
              <FormField>
                <Label htmlFor="ingredients">Select Ingredients:</Label>
                <DropdownWrapper>
                  <DropdownButton onClick={toggleDropdown}>
                    {selectedIngredients.length
                      ? selectedIngredients.map((ing) => ing.name).join(", ")
                      : "Select Ingredients"}
                  </DropdownButton>
                  {isDropdownOpen && (
                    <DropdownMenu>
                      {ingredients.map((ingredient) => (
                        <DropdownItem
                          key={ingredient._id}
                          onClick={(e) => handleIngredientSelect(ingredient, e)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIngredients.some(
                              (ing) => ing._id === ingredient._id
                            )}
                            readOnly
                          />
                          {ingredient.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                  <SelectedTags>
                    {selectedIngredients.map((ingredient) => (
                      <Tag key={ingredient._id}>
                        {ingredient.name}
                        <RemoveTagButton
                          onClick={(e) => handleRemoveIngredient(ingredient, e)}
                        >
                          &#x2716;
                        </RemoveTagButton>
                      </Tag>
                    ))}
                  </SelectedTags>
                </DropdownWrapper>
                {error && <ErrorText>{error}</ErrorText>}
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
              <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
          </PopupForm>
        </>
      )}
    </>
  );
};

export default EditPairingForm;

// Styled components
const Headline = styled.legend`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    margin-bottom: 6px;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    margin-bottom: 3px;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-height: 100px;

  @media (max-width: 768px) {
    padding: 6px;
    min-height: 80px;
  }

  @media (max-width: 480px) {
    padding: 4px;
    min-height: 60px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 14px;
  background-color: #ff7f50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b05e3f;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
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

  @media (max-width: 768px) {
    padding: 16px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 12px;
    max-width: 95%;
  }
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

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    margin-top: 6px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2px;

  @media (max-width: 768px) {
    max-height: 150px;
  }

  @media (max-width: 480px) {
    max-height: 120px;
  }
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  input {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.div`
  background-color: #ff7f50;
  border-radius: 15px;
  padding: 6px 8px;
  margin: 2px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 4px 8px;
    margin: 1px;
  }

  @media (max-width: 480px) {
    padding: 2px 6px;
    margin: 1px;
  }
`;

const RemoveTagButton = styled.button`
  border: none;
  background: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    color: darkred;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

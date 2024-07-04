import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Container,
  StyledContent,
  BackLink,
  EditForm,
  Input,
  SaveButton,
  CancelButton,
} from "@/_styles.js";

const EditIngredient = ({ ingredients, updateIngredient }) => {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    flavor: "",
  });

  useEffect(() => {
    if (ingredient) {
      setFormData({
        name: ingredient.name,
        imgUrl: ingredient.imgUrl,
        flavor: ingredient.flavor,
      });
    }
  }, [ingredient]);

  if (!ingredient) {
    return <p>Loading...</p>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateIngredient(id, formData);
    router.push(`/ingredient/${id}`);
  };

  const cancelEdit = () => {
    router.push(`/ingredient/${id}`);
  };

  return (
    <>
      <BackLink href="/">← Back</BackLink>
      <Container>
        <StyledContent>
          <h1>Edit Ingredient</h1>
          <EditForm onSubmit={handleSubmit}>
            <label>
              Name:
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Image URL:
              <Input
                type="text"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleChange}
              />
            </label>
            <label>
              Flavor:
              <Input
                type="text"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
              />
            </label>
            <SaveButton type="submit">Save</SaveButton>
            <CancelButton type="button" onClick={cancelEdit}>
              Cancel
            </CancelButton>
          </EditForm>
        </StyledContent>
      </Container>
    </>
  );
};

export default EditIngredient;

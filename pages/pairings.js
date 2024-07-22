import styled from "styled-components";
import PairingsList from "@/components/PairingsList";
import NewPairingForm from "@/components/NewPairingForm";

const PairingsPage = ({
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  updatePairingRating,
  onDeletePairing,
  onAddPairing,
  addIngredient,
  ingredients,
  deleteIngredient,
  updateIngredient,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  showCommentPopup,
  setShowCommentPopup,
  currentPairingId,
  setCurrentPairingId,
  handleEditPairing,
}) => {
  return (
    <>
      <Title>Pairings</Title>
      <Container>
        <NewPairingForm onAddPairing={onAddPairing} ingredients={ingredients} />
        <PairingsList
          pairings={pairings}
          toggleFavoritePairing={toggleFavoritePairing}
          pairingsInfo={pairingsInfo}
          updatePairingRating={updatePairingRating}
          onDeletePairing={onDeletePairing}
          ingredients={ingredients}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
          updateIngredient={updateIngredient}
          handleAddComment={handleAddComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          showCommentPopup={showCommentPopup}
          setShowCommentPopup={setShowCommentPopup}
          currentPairingId={currentPairingId}
          setCurrentPairingId={setCurrentPairingId}
          handleEditPairing={handleEditPairing}
        />
      </Container>
    </>
  );
};

export default PairingsPage;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  background-color: #f5e4b5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: #f5e4b5;
  background-image: url("https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
`;

const Title = styled.h1`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 15px;
  border-radius: var(--radius-2xl, 48px);
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 0%,
      var(--Theme-colors-ui-4, rgba(255, 255, 255, 0.82)) 100%
    ),
    var(--Primary-primary, #153f52);
  padding: 10px;
  background: linear-gradient(
      0deg,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 0%,
      var(--Theme-colors-ui-1, rgba(255, 255, 255, 0.97)) 100%
    ),
    var(--Primary-primary, #0d1f28);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  text-transform: uppercase;

  width: 100%;

  border-radius: var(--br-5xl);
  background-color: var(--color-sandybrown);

  align-items: flex-start;

  padding: var(--padding-13xl) var(--padding-16xl);

  margin-bottom: 20px;

  background-image: url("https://images.unsplash.com/photo-1606914469633-bd39206ea739?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Add this line */
  background-position: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  font-size: var(--font-size-101xl);
  color: white;
  font-family: var(--font-poppins);
  @media screen and (max-width: 840px) {
    font-size: 90px;
  }
  @media screen and (max-width: 640px) {
    font-size: 70px;
  }
  @media screen and (max-width: 507px) {
    font-size: 60px;
  }
  @media screen and (max-width: 440px) {
    font-size: 57px;
  }
  @media screen and (max-width: 405px) {
    font-size: 53px;
  }
  @media screen and (max-width: 395px) {
    font-size: 47px;
  }
  @media screen and (max-width: 350px) {
    font-size: 40px;
  }
  @media screen and (max-width: 305px) {
    font-size: 30px;
  }
`;

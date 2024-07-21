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
`;

const Title = styled.h1`
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 18px;
  padding: 10px;
  background-color: #f5e4b5;
`;

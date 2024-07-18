import styled from "styled-components";
import PairingsList from "@/components/PairingsList";
import NewPairingForm from "@/components/NewPairingForm";
// all works
const PairingsPage = ({
  toggleFavoritePairing,
  pairingsInfo,
  pairings,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  showCommentPopup,
  setShowCommentPopup,
  currentPairingId,
  setCurrentPairingId,

  updatePairingRating,
  onDeletePairing,
  onAddPairing,
  addIngredient,
  ingredients,
  deleteIngredient,
  updateIngredient,
}) => {
  return (
    <Container>
      <Title>Pairings</Title>
      <NewPairingForm onAddPairing={onAddPairing} ingredients={ingredients} />
      <PairingsList
        pairings={pairings}
        toggleFavoritePairing={toggleFavoritePairing}
        pairingsInfo={pairingsInfo}
        handleAddComment={handleAddComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        showCommentPopup={showCommentPopup}
        setShowCommentPopup={setShowCommentPopup}
        currentPairingId={currentPairingId}
        setCurrentPairingId={setCurrentPairingId}
        updatePairingRating={updatePairingRating}
        onDeletePairing={onDeletePairing}
        ingredients={ingredients}
        addIngredient={addIngredient}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
      />
    </Container>
  );
};

export default PairingsPage;

const Container = styled.div`
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
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
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
`;

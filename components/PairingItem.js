import { Pairing, Ingredients, Reason } from "@/_styles";

const PairingItem = ({ pairing }) => {
  return (
    <Pairing>
      <Ingredients>{pairing.ingredients.join(", ")}</Ingredients>
      <Reason>{pairing.reason}</Reason>
    </Pairing>
  );
};

export default PairingItem;

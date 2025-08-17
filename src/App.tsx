import Card from "./components/Card";
import { createStandardDeck, dealCards, shuffleDeck } from "./utils/deck";

function App() {
  const deck = createStandardDeck();
  const newDeck = shuffleDeck(deck)
  let hand = newDeck.slice(0, 5);

  console.log(dealCards(newDeck))


  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {hand.map((handCard) => (
        <Card key={handCard.id} card={handCard} />
      ))}
    </div>
  );
}

export default App;

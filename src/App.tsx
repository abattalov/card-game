import Card from "./components/Card";
import { createStandardDeck } from "./utils/deck";

function App() {
  const deck = createStandardDeck();
  let hand = deck.slice(0, 5);
  console.log(hand);

  return (
    <div style={{ display: 'flex', gap: '10px'}}>
      {hand.map((handCard) => (
        <Card key={handCard.id} card={handCard} />
      ))}
    </div>
  );
}

export default App;

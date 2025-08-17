import Card from "./components/Card";
import { createStandardDeck, dealCards, getNextCard, shuffleDeck } from "./utils/deck";
import { useState } from 'react';

function App() {
  

  const [gameState, setGameState] = useState(() => {
    const deck = createStandardDeck();
    const newDeck = shuffleDeck(deck)
    let playersHands = dealCards(newDeck);

    return playersHands
  });

  const handleNextHand = () => {
    setGameState(prev => getNextCard(prev))
  }

  console.log(gameState)

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleNextHand}>next hand</button>
      {/* <Card /> */}
    </div>
  );
}

export default App;

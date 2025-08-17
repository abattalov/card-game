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
      <p>Player 1: {gameState.player1.length}</p>
      <p>Player 2: {gameState.player2.length}</p>
      <button onClick={handleNextHand}>next hand</button>
      {gameState.game && gameState.game.player1Card && gameState.game.player2Card &&
        <>
          <Card card={gameState.game.player1Card}/>
          <Card card={gameState.game.player2Card}/>
        </>
      }
    </div>
  );
}

export default App;

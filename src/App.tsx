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

  const [drawPhase, setDrawPhase] = useState(true);

  const handleNextHand = () => {
    setGameState(prev => getNextCard(prev))
    setDrawPhase(false)
  }

  console.log(gameState)

  const resolveRound = () => {
    if(gameState.game){
      let player1Card = gameState.game.player1Card;
      let player2Card = gameState.game.player2Card;
  
      if(player1Card && player2Card){
        if(player1Card.value > player2Card.value){
            setGameState((prev) => {
              return {
                player1: [...prev.player1, player1Card, player2Card],
                player2: prev.player2,
                game: null
              }
            })
        } else {
          setGameState((prev) => {
              return {
                player1: prev.player1,
                player2: [...prev.player2, player1Card, player2Card],
                game: null
              }
            })
        }
      }
    }

    setDrawPhase(true);
  }


  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <p>Player 1: {gameState.player1.length}</p>
      <p>Player 2: {gameState.player2.length}</p>
      <button disabled={!drawPhase} onClick={handleNextHand}>next hand</button>
      <button disabled={drawPhase} onClick={resolveRound}>resolve round</button>
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

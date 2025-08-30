import Card from "./components/Card";
import type { GameState } from "./types/types";
import { createStandardDeck, dealCards, getNextCard, shuffleDeck } from "./utils/deckUtils";
import { useEffect, useState } from 'react';

function App() {
  
  const [gameState, setGameState] = useState(() => {
    const deck = createStandardDeck();
    const newDeck = shuffleDeck(deck)
    let playersHands = dealCards(newDeck);

    return playersHands
  });

  const [autoPlay, setAutoPlay] = useState(false);

  const handleNextHand = () => {
    setGameState(prev => getNextCard(prev))
  }

  useEffect(() => {
    if (!autoPlay || gameState.game || gameState.player1.length === 0 || gameState.player2.length === 0) {
      return;
    }

    const drawTimer = setTimeout(() => {
      setGameState(prev => getNextCard(prev))
    }, 1000)

    return () => clearTimeout(drawTimer)

  }, [autoPlay, gameState.game, gameState.player1.length, gameState.player2.length])

  useEffect(() => {
    if(!autoPlay || !gameState.game){
      return;
    }

    const resolveTimer = setTimeout(() => {
      resolveRound();
    }, 1000)

    return () => clearTimeout(resolveTimer);
  }, [autoPlay, gameState.game])

  console.log(gameState)

  const resolveRound = () => {

    if(gameState.player1.length === 0 || gameState.player2.length === 0){
      console.log("game over");
      return;
    }

    if(gameState.game){
      let player1Card = gameState.game.player1Card![0];
      let player2Card = gameState.game.player2Card![0];
  
      if(player1Card && player2Card){
        if(player1Card.value > player2Card.value){
            setGameState((prev) => {
              return {
                player1: [player1Card, player2Card, ...prev.player1],
                player2: prev.player2,
                game: null
              }
            })
        } else {
          setGameState((prev) => {
            return {
              player1: prev.player1,
              player2: [player2Card, player1Card, ...prev.player2],
              game: null
            }
          })
        }
      }
    }
  }


  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <p>Player 1: {gameState.player1.length}</p>
      <p>Player 2: {gameState.player2.length}</p>
      <button onClick={() => setAutoPlay(!autoPlay)}>
        {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
      </button>
      <button onClick={handleNextHand}>next hand</button>
      <button onClick={resolveRound}>resolve round</button>
      {gameState.game && gameState.game.player1Card && gameState.game.player2Card &&
        <>
          <Card card={gameState.game.player1Card[0]}/>
          <Card card={gameState.game.player2Card[0]}/>
        </>
      }
    </div>
  );
}

export default App;

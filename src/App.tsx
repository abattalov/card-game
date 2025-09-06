import Card from "./components/Card";
import "./App.css";
import type { GameState } from "./types/types";
import { createStandardDeck, dealCards, getNextCard, getTieCards, shuffleDeck } from "./utils/deckUtils";
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
    }, 100)

    return () => clearTimeout(drawTimer)

  }, [autoPlay, gameState.game, gameState.player1.length, gameState.player2.length])

  useEffect(() => {
    if (!autoPlay || !gameState.game) {
      return;
    }

    const resolveTimer = setTimeout(() => {
      resolveRound();
    }, 100)

    return () => clearTimeout(resolveTimer);
  }, [autoPlay, gameState.game])

  console.log(gameState)

  const resolveRound = () => {
    if (gameState.game) {
      // Compare the last card of each player's war cards (the face-up card)
      const player1Cards = gameState.game.player1Card!;
      const player2Cards = gameState.game.player2Card!;

      const player1TopCard = player1Cards[player1Cards.length - 1];
      const player2TopCard = player2Cards[player2Cards.length - 1];

      if (player1TopCard && player2TopCard) {
        if (player1TopCard.value > player2TopCard.value) {
          // Player 1 wins - gets all cards
          setGameState((prev) => {
            return {
              player1: [...player1Cards, ...player2Cards, ...prev.player1],
              player2: prev.player2,
              game: null
            }
          });
        } else if (player1TopCard.value === player2TopCard.value) {
          // Another war!
          console.log("WAR CONTINUES!");
          setGameState(prev => getTieCards(prev));
        } else {
          // Player 2 wins - gets all cards
          setGameState((prev) => {
            return {
              player1: prev.player1,
              player2: [...player2Cards, ...player1Cards, ...prev.player2],
              game: null
            }
          });
        }
      }
    } else {
      if (gameState.player1.length === 0 || gameState.player2.length === 0) {
        console.log("game over");
        return;
      }
    }
  }

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <p>Player 1: {gameState.player1.length}</p>
        <p>Player 2: {gameState.player2.length}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
        </button>
        <button onClick={handleNextHand}>next hand</button>
        <button onClick={resolveRound}>resolve round</button>
      </div>

      {gameState.game && gameState.game.player1Card && gameState.game.player2Card && (
        <div>
          {gameState.game.player1Card.length > 1 && <p style={{ color: 'red', fontWeight: 'bold' }}>WAR!</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <p>Player 1 ({gameState.game.player1Card.length} cards)</p>
              <Card card={gameState.game.player1Card[gameState.game.player1Card.length - 1]} />
            </div>
            <div>
              <p>Player 2 ({gameState.game.player2Card.length} cards)</p>
              <Card card={gameState.game.player2Card[gameState.game.player2Card.length - 1]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );


  // return (
  //   <div style={{ display: "flex", gap: "10px" }}>
  //     <p>Player 1: {gameState.player1.length}</p>
  //     <p>Player 2: {gameState.player2.length}</p>
  //     <button onClick={() => setAutoPlay(!autoPlay)}>
  //       {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
  //     </button>
  //     <button onClick={handleNextHand}>next hand</button>
  //     <button onClick={resolveRound}>resolve round</button>
  //     {gameState.game && gameState.game.player1Card && gameState.game.player2Card &&
  //       <>
  //         <Card card={gameState.game.player1Card[0]}/>
  //         <Card card={gameState.game.player2Card[0]}/>
  //       </>
  //     }
  //   </div>
  // );
}

export default App;

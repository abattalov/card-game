import Card from "./components/Card";
import Confetti from "./components/Confetti";
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
  const [winner, setWinner] = useState<number | null>(null);

  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [keepBursting, setKeepBursting] = useState(false);

  const startNewGame = () => {
    const deck = createStandardDeck();
    const newDeck = shuffleDeck(deck);
    let playersHands = dealCards(newDeck);

    setGameState(playersHands);

    setWinner(null);
    setAutoPlay(false);

    setKeepBursting(false);
    setTriggerConfetti(false);
  };

  const handleWin = () => {
    setTriggerConfetti(true);
    setKeepBursting(true);
    setTimeout(() => setTriggerConfetti(false), 100);
  };

  const handleNextHand = () => {
    setGameState(prev => getNextCard(prev))
  }

  useEffect(() => {
    if (!keepBursting) return;

    const interval = setInterval(() => {
      setTriggerConfetti(true);
      setTimeout(() => setTriggerConfetti(false), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, [keepBursting]);


  useEffect(() => {
    if (!autoPlay || gameState.game || gameState.player1.length === 0 || gameState.player2.length === 0) {
      if (gameState.game === null && gameState.player1.length === 0) {
        let declareWinner = 2;
        setWinner(declareWinner)
        handleWin();
      } else if (gameState.game === null && gameState.player2.length === 0) {
        let declareWinner = 1;
        setWinner(declareWinner)
        handleWin();
      }
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
    }, 1000)

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
        return;
      }
    }
  }

  let player1Hand = gameState.player1;
  let player2Hand = gameState.player2;

  return (
    <div className="main-container">
      {winner ? (
        <>
          <div className="game-over-cont">
            <h1>Player {winner} wins!</h1>
            <button onClick={startNewGame}>Start New Game</button>
          </div>
          <Confetti
            trigger={triggerConfetti}
            particleCount={120}
            spread={2.5}
          />
        </>) :
        (<>
          <div className="player1-card-container">
            <div className="card-section">
              <div className="card-stack">
                {player1Hand.map((card, index) =>
                  <div key={`p1-${index}`} style={{
                    position: 'absolute', top: `${index * 5}px`, left: '50%',
                    transform: 'translateX(-50%)'
                  }}>
                    <Card card={{...card}} />
                  </div>)}
              </div>
            </div>
            <div className="count-section">
              <h1>Cards: {player1Hand.length}</h1>
            </div>
          </div>

          <div className="game-container">
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setAutoPlay(!autoPlay)}>
                {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
              </button>
              <button onClick={handleNextHand} disabled={gameState.game}>Next hand</button>
              <button onClick={resolveRound} disabled={!gameState.game}>Resolve round</button>
            </div>

            {gameState.game && gameState.game.player1Card && gameState.game.player2Card && (
              <div>
                {gameState.game.player1Card.length > 1 && <p style={{ color: 'red', fontWeight: 'bold' }}>WAR!</p>}
                <div style={{ display: "flex", gap: "100px" }}>
                  <div>
                    <p>Player 1 ({gameState.game.player1Card.length} cards)</p>
                    <div style={{ position: 'relative' }}>
                      {gameState.game.player1Card.map((card, index) =>
                        <div key={`p1-game-${index}`} style={{
                          position: 'absolute', top: `${index * 30}px`
                        }}>
                          <Card card={{...card, faceUp: true}} />
                        </div>
                      )}
                    </div>
                    {/* <Card card={gameState.game.player1Card[gameState.game.player1Card.length - 1]} /> */}
                  </div>
                  <div>
                    <p>Player 2 ({gameState.game.player2Card.length} cards)</p>
                    <div style={{ position: 'relative' }}>
                      {gameState.game.player2Card.map((card, index) =>
                        <div key={`p2-game-${index}`} style={{
                          position: 'absolute', top: `${index * 30}px`
                        }}>
                          <Card card={{...card, faceUp: true}} />
                        </div>
                      )}
                    </div>
                    {/* <Card card={gameState.game.player2Card[gameState.game.player2Card.length - 1]} /> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="player2-card-container">
            <div className="card-section">
              <div className="card-stack">
                {player2Hand.map((card, index) =>
                  <div key={`p2-${index}`} style={{
                    position: 'absolute', top: `${index * 5}px`, left: '50%',
                    transform: 'translateX(-50%)'
                  }}>
                    <Card card={{...card}} />
                  </div>)}
              </div>
            </div>
            <div className="count-section">
              <h1>Cards: {player2Hand.length}</h1>
            </div>
          </div>
        </>)}
    </div>
  );
}

export default App;

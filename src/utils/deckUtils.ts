import type { Card, GameState } from '../types/types'

const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks: Card['rank'][] = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
// const ranks: Card['rank'][] = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'] // for tie testing

export function createStandardDeck(): Card[] {
    const deck: Card[] = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            let value = j + 1;
            // let value = 1; //For testing ties

            let card: Card = {
                id: `${suits[i]}-${ranks[j]}`,
                suit: suits[i],
                rank: ranks[j],
                value: value,
                faceUp: false,
                img: `/cards/card_${suits[i]}_${ranks[j]}.png`
            };

            // console.log(card)

            deck.push(card);
        }
    }

    return deck;
};

export function shuffleDeck(deck: Card[]) {
    let deckCopy = [...deck];
    let newDeck = [];

    while (deckCopy.length != 0) {
        let randomNumber = Math.floor(Math.random() * deckCopy.length);
        let randomCard = deckCopy.splice(randomNumber, 1)[0]
        newDeck.push(randomCard)
    }

    return newDeck;
}

export function dealCards(deck: Card[]): GameState {
    const playerHands = {
        player1: deck.slice(0, 26),
        player2: deck.slice(26, 52)
    }

    return playerHands;
}

export function getNextCard(playerHands: GameState): GameState {
    const player1Copy = [...playerHands.player1]
    const player2Copy = [...playerHands.player2]

    let player1Card;
    let player2Card;

    if (player1Copy.length != 0) {
        player1Card = player1Copy.pop();
    }

    if (player2Copy.length != 0) {
        player2Card = player2Copy.pop();
    }

    if (!player1Card || !player2Card) {
        const newGameState = {
            player1: player1Copy,
            player2: player2Copy
        }

        return newGameState
    }

    const newGameState = {
        player1: player1Copy,
        player2: player2Copy,
        game: { player1Card: [player1Card], player2Card: [player2Card] }
    }

    return newGameState
}

export function getTieCards(playerHands: GameState): GameState {
    const player1Copy = [...playerHands.player1];
    const player2Copy = [...playerHands.player2];

    // Check if players have enough cards for war (need at least 4: 3 face-down + 1 face-up)
    const cardsNeeded = 4;
    
    if (player1Copy.length < cardsNeeded || player2Copy.length < cardsNeeded) {
        // Not enough cards for war - whoever has more cards wins, or it's a draw
        const allCards = [
            ...(playerHands.game?.player1Card || []),
            ...(playerHands.game?.player2Card || [])
        ];
        
        if (player1Copy.length > player2Copy.length) {
            return {
                player1: [...allCards, ...player1Copy],
                player2: player2Copy,
                game: null
            };
        } else if (player2Copy.length > player1Copy.length) {
            return {
                player1: player1Copy,
                player2: [...allCards, ...player2Copy],
                game: null
            };
        } else {
            // Equal cards, split them or handle as draw
            return {
                player1: player1Copy,
                player2: player2Copy,
                game: null
            };
        }
    }

    // Take 4 cards from each player (3 face-down, 1 face-up for comparison)
    const player1WarCards = player1Copy.splice(-cardsNeeded);
    const player2WarCards = player2Copy.splice(-cardsNeeded);

    // Add previous cards and new war cards
    const allPlayer1Cards = [
        ...(playerHands.game?.player1Card || []),
        ...player1WarCards
    ];
    const allPlayer2Cards = [
        ...(playerHands.game?.player2Card || []),
        ...player2WarCards
    ];

    const newGameState: GameState = {
        player1: player1Copy,
        player2: player2Copy,
        game: { 
            player1Card: allPlayer1Cards, 
            player2Card: allPlayer2Cards 
        }
    };

    return newGameState;
}
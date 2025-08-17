import type { Card, GameState } from './../types/Card'

const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks: Card['rank'][] = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export function createStandardDeck(): Card[]{
    const deck: Card[] = [];

    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < ranks.length; j++){
            let value = j + 1;

            let card: Card = {
                id: `${suits[i]}-${ranks[j]}`,
                suit: suits[i],
                rank: ranks[j],
                value: value
            };

            deck.push(card);
        }
    }

    return deck;
};

export function shuffleDeck(deck: Card[]){
    let deckCopy = [...deck];
    let newDeck = [];

    while(deckCopy.length != 0){
        let randomNumber = Math.floor(Math.random() * deckCopy.length);
        let randomCard = deckCopy.splice(randomNumber, 1)[0]
        newDeck.push(randomCard)
    }

    return newDeck;
}

export function dealCards(deck: Card[]): GameState{
    const playerHands = {
        player1: deck.slice(0,26),
        player2: deck.slice(26, 52)
    }

    return playerHands;
}
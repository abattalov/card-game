import type { Card } from './../types/Card'

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
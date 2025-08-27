export interface Card {
    id: string,
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades',
    rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K',
    value: number,
}

export interface GameState {
    player1: Card[],
    player2: Card[],
    game?: {player1Card?: Card[], player2Card?: Card[]} | null
}


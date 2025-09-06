export interface Card {
    id: string,
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades',
    rank: 'A' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | 'J' | 'Q' | 'K',
    value: number,
    faceUp: boolean,
    img: string
}

export interface GameState {
    player1: Card[],
    player2: Card[],
    game?: {player1Card?: Card[], player2Card?: Card[]} | null
}


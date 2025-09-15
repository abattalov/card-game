import Card from '../components/Card';
import type { Card as CardType} from '../types/types';
import '../App.css'

interface CardStackProps {
    cards: CardType[];
    playerNumber: number;
    offset: number;
}

function CardStack({cards, playerNumber, offset}: CardStackProps) {
    return (
        <div className="card-stack">
            {cards.map((card, index) =>
                <div key={`p${playerNumber}-${index}`} style={{
                    position: 'absolute', top: `${index * offset}px`, left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    <Card card={{ ...card }} />
                </div>)}
        </div>
    );
}

export default CardStack;
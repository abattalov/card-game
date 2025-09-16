import Card from '../components/Card';
import type { Card as CardType} from '../types/types';

interface HandComponentProps {
    hand: CardType[];
}

function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
}

function HandComponent({ hand }: HandComponentProps) {
    const cardSize = "20vh";

    return (
        <div className='durak-hand-container' style={{
            '--cardSize': cardSize
        } as React.CSSProperties}>
            {hand.map((card, index) => {
                const t = index / (hand.length - 1);
                const horizontalSpacing = 20;
                const rotation = lerp(-45, 45, t);
                const angleInRadians = rotation * Math.PI / 180;
                const radius = 20;
                // const x = radius * Math.sin(angleInRadians) + (index * horizontalSpacing);
                const x = radius * Math.sin(angleInRadians) + (index * horizontalSpacing) - ((hand.length - 1) * horizontalSpacing) / 2;
                const y = radius * Math.cos(angleInRadians);
                return (
                    <div key={`p1-${index}`} className='hand-card' style={{
                        '--x': `${x}px`,
                        '--y': `${y}px`,
                        '--rotation': `${rotation}deg`,
                    } as React.CSSProperties}>
                        <Card card={card} />
                    </div>
                );
            })}
        </div>
    );
}

export default HandComponent;
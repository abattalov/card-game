
import HandComponent from '../../components/HandComponent';
import { createStandardDeck, shuffleDeck } from '../../utils/deckUtils';
import '/src/styles/games/Durak.css';

interface DurakGamePropTypes {
    onBack: () => void;
}

let deck = shuffleDeck(createStandardDeck());

let hand = deck.slice(0,6).map(card => ({...card, faceUp: true}));

console.log(hand);


function DurakGame({ onBack }: DurakGamePropTypes) {
    return (
        <div className='durak-main-container'>
            <div className="durak-button-container">
                <button onClick={onBack}>← Back to Menu</button>
                <h1>Durak</h1>
            </div>
            <div className="durak-game-container">
                <HandComponent hand={hand}/>
            </div>
        </div>
    );
}

export default DurakGame;
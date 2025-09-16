import CardStack from '../../components/CardStack';
import HandComponent from '../../components/HandComponent';
import { createStandardDeck, shuffleDeck } from '../../utils/deckUtils';
import '/src/styles/games/Durak.css';

interface DurakGamePropTypes {
    onBack: () => void;
}

let deck = shuffleDeck(createStandardDeck());

let hand = deck.slice(0,8).map(card => ({...card, faceUp: true}));

console.log(hand);


function DurakGame({ onBack }: DurakGamePropTypes) {
    return (
        <div className='durak-main-container'>
            <div className="durak-button-container">
                <button onClick={onBack}>← Back to Menu</button>
                <h1>Durak</h1>
            </div>
            <div className="durak-game-container">
                <div className='durak-left-container'>
                    <CardStack 
                        cards={deck}
                        playerNumber={1}
                        offset={1}
                        />
                </div>
                <div className='durak-middle-container'>
                    <div className='play-area'>
                        <h1>PLAY AREA</h1>
                    </div>
                    <div className='player-hand-container'>
                        <HandComponent hand={hand}/>
                    </div>
                </div>
                <div className='durak-right-container'>
                        <p>RIGHT CONTAINER</p>
                </div>
            </div>
        </div>
    );
}

export default DurakGame;
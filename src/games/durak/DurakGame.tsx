
import '/src/styles/games/Durak.css';

interface DurakGamePropTypes {
    onBack: () => void;
}

function DurakGame({ onBack }: DurakGamePropTypes) {
    return (
        <div className='durak-main-container'>
            <div className="durak-button-container">
                <button onClick={onBack}>← Back to Menu</button>
                <h1>Durak</h1>
            </div>
            <div className="durak-game-container">
                <h1>Hand</h1>
            </div>
        </div>
    );
}

export default DurakGame;
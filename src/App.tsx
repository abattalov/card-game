import { useState } from 'react';
import WarGame from './games/war/WarGame';
import './App.css';
import DurakGame from './games/durak/DurakGame';

function App() {
  const [selectedGame, setSelectedGame] = useState<'war' | 'durak' | null>(null);

  if (selectedGame === 'war') {
    return <WarGame onBack={() => setSelectedGame(null)} />;
  } else if (selectedGame === 'durak'){
    return <DurakGame onBack={() => setSelectedGame(null)}/>;
  }

  return (
    <div className='game-select-container'>
      <h1>Select a Game</h1>
      <button onClick={() => setSelectedGame('war')}>War</button>
      <button onClick={() => setSelectedGame('durak')}>Durak</button>
    </div>
  );
}

export default App;
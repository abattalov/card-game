import { useState } from 'react';
import WarGame from './games/war/WarGame';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState<'war' | 'durak' | null>(null);

  if (selectedGame === 'war') {
    return <WarGame onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div>
      <h1>Select a Game</h1>
      <button onClick={() => setSelectedGame('war')}>War</button>
      {/* Add Durak button later */}
    </div>
  );
}

export default App;
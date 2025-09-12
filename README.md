# Card Game Learning Project

A progressive learning journey through card game development, building from simple concepts to complex gameplay mechanics.

## 🎯 Project Goals

This project follows a structured roadmap to learn game development fundamentals by implementing increasingly complex card games:

1. **War** ✅ - Basic game logic and turn management
2. **Durak** - Trick-taking and defensive card play
3. **Crazy Eights** - Rule engines and special card effects
4. **Canadian Salad** - Complex trick-taking with bidding

## 🛠️ Tech Stack

- **React** + **TypeScript** - Component-based UI with type safety
- **CSS** - Custom styling and animations
- **No external game libraries** - Building everything from scratch for learning

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (Card, Confetti)
├── types/          # TypeScript interfaces (Card, GameState)
├── utils/          # Game logic utilities (deck management, game rules)
└── styles/         # CSS files for layout and card rendering
```

## ✅ Current Progress

### War - COMPLETED ✅
**Features Implemented:**
- ✅ Complete War game with all rules
- ✅ Draggable card component with smooth mouse interaction
- ✅ Standard 52-card deck generation and shuffling
- ✅ Automatic card dealing (26 cards each)
- ✅ Turn-based gameplay with card comparison
- ✅ War mechanics (ties trigger 4-card wars)
- ✅ Cascading war cards with visual stacking
- ✅ Win condition detection and celebration
- ✅ Confetti animation system for victories
- ✅ Auto-play mode with adjustable speed slider
- ✅ Manual step-through controls for learning
- ✅ Real-time card counting display
- ✅ Game restart functionality

**Technical Achievements:**
- Complex state management for game phases
- Proper handling of edge cases (insufficient cards for war)
- Responsive layout with centered game area
- Smooth animations and visual feedback
- TypeScript interfaces for type safety

### Next Up: Durak 🔨
**Learning Focus:** Defensive gameplay and attack/defense mechanics
- Attack and defense card play
- Trump suit system
- Rank-based card hierarchy
- Multi-player turn management

## 🎮 Games Roadmap

### Phase 1: War ✅
**Completed Learning:** Core game mechanics, state management, UI interactions

### Phase 2: Durak (Next)
**Learning Focus:** Advanced card game mechanics
- Attack/defense gameplay patterns
- Trump suit logic
- Complex turn sequences
- Multi-phase rounds

### Phase 3: Crazy Eights  
**Learning Focus:** Rule systems
- Card matching validation
- Special card effects
- Game state modifications

### Phase 4: Canadian Salad
**Learning Focus:** Complex gameplay
- Bidding systems
- Advanced scoring systems
- Multi-round tournaments

## 🚀 Running the Project

```bash
npm install
npm run dev
```

## 🎮 How to Play War

1. Click "Start Auto Play" to watch the game play automatically
2. Use the speed slider to control auto-play pace
3. Or use "Next hand" and "Resolve round" for manual control
4. When cards tie, a WAR begins with 4 cards each
5. Player with all 52 cards wins!

## 📚 Key Learning Outcomes

**From Building War:**
- React state management for complex game states
- Event handling for interactive card components
- CSS positioning and layout techniques
- Animation and visual feedback systems
- TypeScript for game data modeling
- Algorithm implementation (shuffling, game rules)
- UI/UX design for game interfaces

**Technical Skills Developed:**
- Component composition and reusability
- Custom hook patterns for game logic
- CSS flexbox and positioning
- Mouse event handling and drag interactions
- Conditional rendering based on game state
- Performance optimization for smooth animations

---

*This is a learning project focused on understanding game development fundamentals through hands-on implementation. Each game builds upon previous concepts while introducing new challenges.*
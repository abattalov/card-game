# Card Game Learning Project

A progressive learning journey through card game development, building from simple concepts to complex gameplay mechanics.

## 🎯 Project Goals

This project follows a structured roadmap to learn game development fundamentals by implementing increasingly complex card games:

1. **War** ✅ - Basic game logic and turn management
2. **Durak** 🔨 - Trick-taking and defensive card play
3. **Crazy Eights** - Rule engines and special card effects
4. **Canadian Salad** - Complex trick-taking with bidding

## 🛠️ Tech Stack

- **React** + **TypeScript** - Component-based UI with type safety
- **CSS** - Custom styling and animations
- **No external game libraries** - Building everything from scratch for learning

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (Card, Confetti, HandComponent)
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

### Durak - IN PROGRESS 🔨
**Recently Added:**
- ✅ **HandComponent** - Reusable component for displaying card hands
- ✅ **Fan Layout System** - Cards arranged in realistic fan pattern using mathematical positioning
- ✅ **Dynamic Card Positioning** - Uses trigonometry (sin/cos) to position cards along an arc
- ✅ **Interactive Hover Effects** - Cards lift up and come to foreground on hover
- ✅ **CSS Custom Properties Integration** - Dynamic positioning via CSS variables from React
- ✅ **Smooth Animations** - CSS transitions for card movements and hover states
- ✅ **Scalable Hand Layout** - Fan adjusts automatically for different hand sizes
- ✅ **Transform Origin Optimization** - Cards rotate from bottom edge for natural fan appearance

**Technical Innovations Added:**
- **Linear Interpolation (Lerp) Function** - Smooth distribution of card angles across the fan
- **Mathematical Positioning** - Radius-based arc calculations for card placement
- **CSS Variable Integration** - React inline styles setting CSS custom properties
- **Absolute Positioning Strategy** - Cards positioned independently for perfect overlap
- **Modular Component Design** - Card component remains reusable across different game layouts

**Current Durak Features:**
- Fan-style hand display with realistic card arrangement
- Smooth hover interactions with visual feedback
- Flexible layout system that adapts to hand size
- Foundation for drag-and-drop gameplay (prepared but not yet implemented)

**Next Steps for Durak:**
- Drag and drop card interactions for gameplay
- Attack/defense phase logic
- Trump suit implementation
- Game rules and win conditions

## 🎮 Games Roadmap

### Phase 1: War ✅
**Completed Learning:** Core game mechanics, state management, UI interactions

### Phase 2: Durak 🔨 (Current)
**Learning Focus:** Advanced UI components and card game mechanics
- ✅ Advanced card layout and positioning systems
- ✅ Mathematical positioning with trigonometry
- ✅ CSS custom properties and dynamic styling
- 🔨 Attack/defense gameplay patterns
- 🔨 Trump suit logic
- 🔨 Complex turn sequences
- 🔨 Multi-phase rounds

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

**From Building Durak Hand System:**
- **Advanced CSS Positioning** - Absolute positioning and transform combinations
- **Mathematical Programming** - Trigonometry for UI positioning (sin/cos for arc calculations)
- **CSS Custom Properties** - Dynamic styling via CSS variables from JavaScript
- **Linear Interpolation** - Smooth value distribution for UI elements
- **Component Reusability** - Building flexible components for multiple game contexts
- **Animation Systems** - CSS transitions with transform combinations
- **State-driven Styling** - React inline styles working with CSS classes

**Technical Skills Developed:**
- Component composition and reusability
- Custom hook patterns for game logic
- CSS flexbox and positioning with mathematical calculations
- Mouse event handling and drag interactions
- Conditional rendering based on game state
- Performance optimization for smooth animations
- Advanced transform combinations and CSS custom properties
- Mathematical problem-solving for UI challenges

## 🧮 Mathematical Concepts Applied

**Linear Interpolation (Lerp):**
```javascript
function lerp(start, end, t) {
    return start + (end - start) * t;
}
```
Used for smooth distribution of card rotation angles across the fan.

**Trigonometric Positioning:**
```javascript
const x = radius * Math.sin(angleInRadians);
const y = radius * Math.cos(angleInRadians);
```
Used for positioning cards along a circular arc to create the fan effect.

**Normalization:**
```javascript
const t = index / (hand.length - 1); // Converts array index to 0-1 range
```
Used to map card positions to mathematical functions regardless of hand size.

---

*This is a learning project focused on understanding game development fundamentals through hands-on implementation. Each game builds upon previous concepts while introducing new challenges. The project emphasizes both programming skills and mathematical problem-solving for creating engaging user interfaces.*
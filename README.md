# Cube3D

An interactive 3D cube editor built with React, TypeScript, and SVG. This application allows you to manipulate a 3D cube in a browser environment with intuitive controls and real-time visual feedback.

🎮 **[Try it out here](https://cube3d.pavi2410.me)**

## Features

- **3D Manipulation**: Rotate, scale, and translate a 3D cube in real-time
- **Interactive Controls**: 
  - Click and drag faces to move
  - Click and drag edges to rotate
  - Click and drag corners to scale
  - Left-click drag on empty space to pan the view
- **Keyboard Shortcuts**:
  - `C` - Center the cube
  - `R` - Reset all transformations
  - `+/-` - Zoom in/out
  - Arrow keys - Rotate cube
  - `X/Y/Z` - Scale cube (hold Shift for negative scaling)
- **Visual Aids**:
  - Grid system for spatial reference
  - Infinite axes for orientation
  - Double-click to cycle through display modes (none/axes/normals)
- **Real-time Debug Info**: View transformation values and current selection state

## Technical Stack

- React 18
- TypeScript
- SVG for rendering
- Vite for development and building

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/pavi2410/cube3d.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Basic Navigation**:
   - Pan: Left-click and drag on empty space
   - Zoom: Mouse wheel or +/- keys
   - Center View: 'C' key or center button

2. **Cube Manipulation**:
   - Click and drag cube faces to move
   - Click and drag cube edges to rotate
   - Click and drag cube corners to scale
   - Use keyboard shortcuts for precise control

3. **Display Modes**:
   - Double-click to cycle through display modes:
     - None: Basic cube display
     - Axes: Show local coordinate axes
     - Normals: Show face normal vectors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this code for your own projects.

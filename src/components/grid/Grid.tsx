import { Point2D, ViewState } from '../../types';
import { Transform } from '../../utils/math';

type GridProps = {
  center: Point2D;
  view: ViewState;
};

export const Grid = ({ center, view }: GridProps) => {
  const createGridLines = () => {
    const lines: [Point2D, Point2D, string][] = [];
    const size = 1000; // Infinite grid size
    
    // Function to add a line with proper opacity based on distance from origin
    const addLine = (x1: number, z1: number, x2: number, z2: number, baseOpacity: number) => {
      // Calculate distance from origin for opacity falloff
      const distanceFromOrigin = Math.max(Math.abs(x1), Math.abs(z1)) / size;
      const opacity = baseOpacity * (1 - distanceFromOrigin * 0.8); // Fade out gradually
      
      if (opacity > 0.01) { // Only add visible lines
        lines.push([
          Transform.projectPoint({ x: x1, y: 0, z: z1 }, center, view),
          Transform.projectPoint({ x: x2, y: 0, z: z2 }, center, view),
          `rgba(255, 255, 255, ${opacity})`
        ]);
      }
    };

    // Major grid lines (every 1 unit)
    for (let i = -10; i <= 10; i++) {
      // X-axis parallel (in XZ plane)
      addLine(i, -size, i, size, 0.5);
      // Z-axis parallel (in XZ plane)
      addLine(-size, i, size, i, 0.5);
    }

    // Minor grid lines (every 0.1 units)
    for (let i = -100; i <= 100; i++) {
      const coord = i * 0.1;
      // Skip where major lines already exist
      if (Math.abs(coord - Math.round(coord)) > 0.01) {
        // X-axis parallel (in XZ plane)
        addLine(coord, -size, coord, size, 0.15);
        // Z-axis parallel (in XZ plane)
        addLine(-size, coord, size, coord, 0.15);
      }
    }

    return lines;
  };

  return (
    <g>
      {createGridLines().map((line, i) => (
        <line
          key={`grid-${i}`}
          x1={line[0].x}
          y1={line[0].y}
          x2={line[1].x}
          y2={line[1].y}
          stroke={line[2]}
          strokeWidth={1}
        />
      ))}
    </g>
  );
}; 
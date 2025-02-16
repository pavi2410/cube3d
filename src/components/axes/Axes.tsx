import type { Vec3, Point2D, ViewState } from '../../types';
import { projectPoint, rotatePoint } from '../../utils/math';

type AxesProps = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  view: ViewState;
  center: Point2D;
};

export const Axes = ({ position, rotation, scale, view, center }: AxesProps) => {
  const axesConfig = [
    { vec: { x: 1, y: 0, z: 0 }, color: 'red', label: 'X' },
    { vec: { x: 0, y: 1, z: 0 }, color: 'green', label: 'Y' },
    { vec: { x: 0, y: 0, z: 1 }, color: 'blue', label: 'Z' }
  ];

  return (
    <g>
      {axesConfig.map((axis, i) => {
        const start = projectPoint(position, center, view);
        
        const rotated = rotatePoint(axis.vec, rotation);
        const end = projectPoint(
          {
            x: position.x + rotated.x * scale.x,
            y: position.y + rotated.y * scale.y,
            z: position.z + rotated.z * scale.z
          },
          center,
          view
        );

        return (
          <g key={`axis-${i}`}>
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={axis.color}
              strokeWidth="2"
            />
            <text
              x={end.x}
              y={end.y}
              fill={axis.color}
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ pointerEvents: 'none' }}
            >
              {axis.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}; 
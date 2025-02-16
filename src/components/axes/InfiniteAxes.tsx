import { Point2D, ViewState } from '../../types';
import { Transform } from '../../utils/math';

type InfiniteAxesProps = {
  center: Point2D;
  view: ViewState;
};

export const InfiniteAxes = ({ center, view }: InfiniteAxesProps) => {
  const createAxesLines = () => {
    const length = 1000;
    return [
      // X-axis
      {
        start: Transform.projectPoint({ x: -length, y: 0, z: 0 }, center, view),
        end: Transform.projectPoint({ x: length, y: 0, z: 0 }, center, view),
        color: 'rgba(255, 0, 0, 0.3)'
      },
      // Y-axis
      {
        start: Transform.projectPoint({ x: 0, y: -length, z: 0 }, center, view),
        end: Transform.projectPoint({ x: 0, y: length, z: 0 }, center, view),
        color: 'rgba(0, 255, 0, 0.3)'
      },
      // Z-axis
      {
        start: Transform.projectPoint({ x: 0, y: 0, z: -length }, center, view),
        end: Transform.projectPoint({ x: 0, y: 0, z: length }, center, view),
        color: 'rgba(0, 0, 255, 0.3)'
      }
    ];
  };

  return (
    <g>
      {createAxesLines().map((axis, i) => (
        <line
          key={`infinite-axis-${i}`}
          x1={axis.start.x}
          y1={axis.start.y}
          x2={axis.end.x}
          y2={axis.end.y}
          stroke={axis.color}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
    </g>
  );
}; 
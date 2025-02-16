import type { Point2D, Selection } from '../../types';

type EdgeProps = {
  start: Point2D;
  end: Point2D;
  index: number;
  faceIndex: number;
  isVisible: boolean;
  selection: Selection;
  onSelect: (type: 'edge', index: number) => void;
  onDeselect: () => void;
};

export const Edge = ({
  start,
  end,
  index,
  faceIndex,
  isVisible,
  selection,
  onSelect,
  onDeselect
}: EdgeProps) => {
  if (!isVisible) return null;

  const globalIndex = faceIndex * 4 + index;
  const isSelected = selection.type === 'edge' && selection.index === globalIndex;

  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={isSelected ? 'rgba(255, 255, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)'}
      strokeWidth={isSelected ? 2 : 1}
      style={{ 
        cursor: 'crosshair',
        pointerEvents: 'auto'
      }}
      onMouseEnter={() => onSelect('edge', globalIndex)}
      onMouseLeave={onDeselect}
    />
  );
}; 
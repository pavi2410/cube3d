import type { Point2D, Selection } from '../../types';

type CornerProps = {
  point: Point2D;
  index: number;
  selection: Selection;
  onSelect: (type: 'corner', index: number) => void;
  onDeselect: () => void;
};

export const Corner = ({
  point,
  index,
  selection,
  onSelect,
  onDeselect
}: CornerProps) => {
  const isSelected = selection.type === 'corner' && selection.index === index;

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={4}
      fill={isSelected ? 'rgba(255, 255, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)'}
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="1"
      style={{ 
        cursor: 'nwse-resize',
        pointerEvents: 'auto'
      }}
      onMouseEnter={() => onSelect('corner', index)}
      onMouseLeave={onDeselect}
    />
  );
}; 
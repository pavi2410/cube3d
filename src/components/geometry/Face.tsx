import { Vec3, Point2D, Selection } from '../../types';
import { Transform } from '../../utils/math';

type FaceProps = {
  vertices: Vec3[];
  projectedVertices: Point2D[];
  index: number;
  color: string;
  selection: Selection;
  onSelect: (type: 'face', index: number) => void;
  onDeselect: () => void;
};

export const Face = ({
  vertices,
  projectedVertices,
  index,
  color,
  selection,
  onSelect,
  onDeselect
}: FaceProps) => {
  const isVisible = Transform.isFaceVisible(vertices);
  const isSelected = selection.type === 'face' && selection.index === index;
  
  if (!isVisible) return null;

  const normal = Transform.getNormalVector(vertices);
  
  // Calculate lighting based on normal
  const lightDir = { x: -0.5, y: -0.5, z: -1 }; // Light direction
  const dot = -(normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z);
  const intensity = Math.max(0.3, Math.min(0.9, dot));
  
  // Modify base color with lighting
  const [r, g, b] = color.match(/\d+/g)!.map(Number);
  const litColor = `rgba(${r * intensity}, ${g * intensity}, ${b * intensity}, 0.8)`;

  const path = `M ${projectedVertices[0].x} ${projectedVertices[0].y} ` +
    projectedVertices.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') + ' Z';

  const getCursor = (normal: Vec3) => {
    if (Math.abs(normal.x) > Math.abs(normal.y) && Math.abs(normal.x) > Math.abs(normal.z)) {
      return 'ew-resize';
    } else if (Math.abs(normal.y) > Math.abs(normal.z)) {
      return 'ns-resize';
    }
    return 'move';
  };

  return (
    <g>
      <path
        d={path}
        fill={isSelected ? 'rgba(255, 255, 0, 0.3)' : litColor}
        stroke={isSelected ? 'rgba(255, 255, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
        strokeWidth="1"
        style={{ 
          cursor: getCursor(normal),
          pointerEvents: 'auto'
        }}
        onMouseEnter={() => onSelect('face', index)}
        onMouseLeave={onDeselect}
      />
      {isSelected && (
        <path
          d={path}
          fill="url(#hatch)"
          stroke="none"
          style={{ 
            pointerEvents: 'none',
            opacity: 0.5
          }}
        />
      )}
    </g>
  );
}; 
import type { Vec3, Point2D, Selection, ViewState } from '../../types';
import { CUBE_VERTICES, CUBE_FACES } from './CubeGeometry';
import { Face } from './Face';
import { Edge } from './Edge';
import { Corner } from './Corner';
import { rotatePoint, projectPoint, isFaceVisible, isCornerVisible } from '../../utils/math';

type CubeProps = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  view: ViewState;
  selection: Selection;
  onSelect: (type: Selection['type'], index: number) => void;
  onDeselect: () => void;
};

// Add face and edge IDs
const FACE_IDS = ['front', 'back', 'top', 'bottom', 'left', 'right'];
const EDGE_IDS = ['top', 'right', 'bottom', 'left'];

export const Cube = ({
  position,
  rotation,
  scale,
  view,
  selection,
  onSelect,
  onDeselect
}: CubeProps) => {
  const center: Point2D = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  // Transform vertices
  const transformedVertices = CUBE_VERTICES.map(vertex => {
    const scaled = {
      x: vertex.x * scale.x,
      y: vertex.y * scale.y,
      z: vertex.z * scale.z
    };
    const rotated = rotatePoint(scaled, rotation);
    return {
      x: rotated.x + position.x,
      y: rotated.y + position.y,
      z: rotated.z + position.z
    };
  });

  // Project to 2D
  const projectedVertices = transformedVertices.map(v => 
    projectPoint(v, center, view)
  );

  return (
    <g>
      {/* Faces */}
      {CUBE_FACES.map((face, index) => (
        <Face
          key={`face-${FACE_IDS[index]}`}
          vertices={face.indices.map(i => transformedVertices[i])}
          projectedVertices={face.indices.map(i => projectedVertices[i])}
          index={index}
          color={face.color}
          selection={selection}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      ))}

      {/* Edges */}
      {CUBE_FACES.map((face, faceIndex) => 
        face.indices.map((start, edgeIndex) => {
          const end = face.indices[(edgeIndex + 1) % face.indices.length];
          return (
            <Edge
              key={`edge-${FACE_IDS[faceIndex]}-${EDGE_IDS[edgeIndex]}`}
              start={projectedVertices[start]}
              end={projectedVertices[end]}
              index={edgeIndex}
              faceIndex={faceIndex}
              isVisible={isFaceVisible(face.indices.map(i => transformedVertices[i]))}
              selection={selection}
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          );
        })
      )}

      {/* Corners */}
      {transformedVertices.map((vertex, index) => {
        // Only render if corner is visible
        if (!isCornerVisible(index, rotation)) return null;

        return (
          <Corner
            key={`corner-${vertex.x.toFixed(3)}-${vertex.y.toFixed(3)}-${vertex.z.toFixed(3)}`}
            point={projectedVertices[index]}
            index={index}
            selection={selection}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        );
      })}
    </g>
  );
}; 
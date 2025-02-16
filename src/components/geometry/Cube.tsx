import { Vec3, Point2D, Selection, ViewState } from '../../types';
import { Transform } from '../../utils/math';
import { CUBE_VERTICES, CUBE_FACES } from './CubeGeometry';
import { Face } from './Face';
import { Edge } from './Edge';
import { Corner } from './Corner';

type CubeProps = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  view: ViewState;
  selection: Selection;
  onSelect: (type: Selection['type'], index: number) => void;
  onDeselect: () => void;
};

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
    const rotated = Transform.rotatePoint(scaled, rotation);
    return {
      x: rotated.x + position.x,
      y: rotated.y + position.y,
      z: rotated.z + position.z
    };
  });

  // Project to 2D
  const projectedVertices = transformedVertices.map(v => 
    Transform.projectPoint(v, center, view)
  );

  return (
    <g>
      {/* Faces */}
      {CUBE_FACES.map((face, index) => (
        <Face
          key={`face-${index}`}
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
              key={`edge-${faceIndex}-${edgeIndex}`}
              start={projectedVertices[start]}
              end={projectedVertices[end]}
              index={edgeIndex}
              faceIndex={faceIndex}
              isVisible={Transform.isFaceVisible(face.indices.map(i => transformedVertices[i]))}
              selection={selection}
              onSelect={onSelect}
              onDeselect={onDeselect}
            />
          );
        })
      )}

      {/* Corners */}
      {transformedVertices.map((vertex, index) => (
        <Corner
          key={`corner-${index}`}
          point={projectedVertices[index]}
          index={index}
          selection={selection}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      ))}
    </g>
  );
}; 
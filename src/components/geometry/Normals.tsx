import type { Point2D, Vec3, ViewState } from "../../types";
import {
  getNormalVector,
  isFaceVisible,
  projectPoint,
  rotatePoint,
} from "../../utils/math";
import { CUBE_FACES, CUBE_VERTICES } from "./CubeGeometry";

type NormalsProps = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  view: ViewState;
  center: Point2D;
};

export const Normals = ({
  position,
  rotation,
  scale,
  view,
  center,
}: NormalsProps) => {
  // Transform vertices
  const transformedVertices = CUBE_VERTICES.map((vertex) => {
    const scaled = {
      x: vertex.x * scale.x,
      y: vertex.y * scale.y,
      z: vertex.z * scale.z,
    };
    const rotated = rotatePoint(scaled, rotation);
    return {
      x: rotated.x + position.x,
      y: rotated.y + position.y,
      z: rotated.z + position.z,
    };
  });

  return (
    <g>
      {CUBE_FACES.map((face, index) => {
        const vertices = face.indices.map((i) => transformedVertices[i]);
        const normal = getNormalVector(vertices);

        // Calculate face center
        const faceCenter = {
          x: vertices.reduce((sum, v) => sum + v.x, 0) / 4,
          y: vertices.reduce((sum, v) => sum + v.y, 0) / 4,
          z: vertices.reduce((sum, v) => sum + v.z, 0) / 4,
        };

        // Calculate normal end point (0.5 units from face center)
        const normalEnd = {
          x: faceCenter.x + normal.x * 0.5,
          y: faceCenter.y + normal.y * 0.5,
          z: faceCenter.z + normal.z * 0.5,
        };

        // Project points to 2D
        const start2D = projectPoint(faceCenter, center, view);
        const end2D = projectPoint(normalEnd, center, view);

        // Only show normal if face is visible
        if (isFaceVisible(vertices)) {
          return (
            <g key={`normal-${index}`}>
              <line
                x1={start2D.x}
                y1={start2D.y}
                x2={end2D.x}
                y2={end2D.y}
                stroke="yellow"
                strokeWidth="2"
              />
              {/* Arrow head */}
              <circle cx={end2D.x} cy={end2D.y} r="3" fill="yellow" />
            </g>
          );
        }
        return null;
      })}
    </g>
  );
};

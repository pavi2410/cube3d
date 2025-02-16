import type { Vec3, Point2D, ViewState } from "../types";

export const ISOMETRIC_ANGLE = Math.PI / 6; // 30 degrees

export function projectPoint(
  point: Vec3,
  center: Point2D,
  view: ViewState,
): Point2D {
  const scale = 50 * view.zoom;
  const isoX = (point.x - point.z) * Math.cos(ISOMETRIC_ANGLE);
  const isoY = point.y + (point.x + point.z) * Math.sin(ISOMETRIC_ANGLE);

  return {
    x: center.x + isoX * scale + view.panX,
    y: center.y - isoY * scale + view.panY,
  };
}

export function rotatePoint(point: Vec3, rotation: Vec3): Vec3 {
  const { x, y, z } = point;
  const { x: rx, y: ry, z: rz } = rotation;

  // Convert to radians
  const radX = (rx * Math.PI) / 180;
  const radY = (ry * Math.PI) / 180;
  const radZ = (rz * Math.PI) / 180;

  // Rotate around X
  const x1 = x;
  const y1 = y * Math.cos(radX) - z * Math.sin(radX);
  const z1 = y * Math.sin(radX) + z * Math.cos(radX);

  // Rotate around Y
  const x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
  const y2 = y1;
  const z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);

  // Rotate around Z
  const x3 = x2 * Math.cos(radZ) - y2 * Math.sin(radZ);
  const y3 = x2 * Math.sin(radZ) + y2 * Math.cos(radZ);
  const z3 = z2;

  return { x: x3, y: y3, z: z3 };
}

export function getNormalVector(points: Vec3[]): Vec3 {
  // Calculate face normal using cross product
  const v1 = {
    x: points[1].x - points[0].x,
    y: points[1].y - points[0].y,
    z: points[1].z - points[0].z,
  };

  const v2 = {
    x: points[2].x - points[0].x,
    y: points[2].y - points[0].y,
    z: points[2].z - points[0].z,
  };

  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
}

export function isFaceVisible(points: Vec3[]): boolean {
  const normal = getNormalVector(points);

  // For isometric view, camera looks from top-right-front
  const viewVector = {
    x: Math.SQRT1_2, // cos(45°)
    y: -0.5, // -sin(30°)
    z: Math.SQRT1_2, // cos(45°)
  };

  // Dot product between normal and view vector
  const dotProduct =
    normal.x * viewVector.x + normal.y * viewVector.y + normal.z * viewVector.z;

  return dotProduct < 0;
}

export function isPointBehind(point: Vec3, center: Vec3): boolean {
  const viewVector = {
    x: Math.SQRT1_2, // cos(45°)
    y: -0.5, // -sin(30°)
    z: Math.SQRT1_2, // cos(45°)
  };

  const toPoint = {
    x: point.x - center.x,
    y: point.y - center.y,
    z: point.z - center.z,
  };

  return (
    toPoint.x * viewVector.x +
      toPoint.y * viewVector.y +
      toPoint.z * viewVector.z >
    0
  );
}

/**
 * Determines if a corner point is visible based on the cube's rotation
 * @param cornerIndex The index of the corner (0-7)
 * @param rotation The rotation of the cube in radians
 * @returns boolean indicating if the corner is visible
 */
export function isCornerVisible(cornerIndex: number, rotation: Vec3): boolean {
  // Get corner position (-1 or 1 for each axis)
  const cornerPos = {
    x: (cornerIndex & 1) ? 1 : -1,
    y: (cornerIndex & 2) ? 1 : -1,
    z: (cornerIndex & 4) ? 1 : -1
  };

  // Rotate the corner
  const rotated = rotatePoint(cornerPos, rotation);

  // View vector (from isometric view)
  const viewVector = {
    x: Math.SQRT1_2,  // cos(45°)
    y: -0.5,         // -sin(30°)
    z: Math.SQRT1_2   // cos(45°)
  };

  // Dot product with view vector
  const dotProduct = 
    rotated.x * viewVector.x + 
    rotated.y * viewVector.y + 
    rotated.z * viewVector.z;

  // Corner is visible if it's on the front side (negative dot product)
  return dotProduct < 0;
}

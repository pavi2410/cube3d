import { Vec3 } from '../../types';

export const CUBE_VERTICES: Vec3[] = [
  // Front face (z = 0.5)
  { x: -0.5, y: -0.5, z: 0.5 },  // bottom-left
  { x: 0.5, y: -0.5, z: 0.5 },   // bottom-right
  { x: 0.5, y: 0.5, z: 0.5 },    // top-right
  { x: -0.5, y: 0.5, z: 0.5 },   // top-left
  
  // Back face (z = -0.5)
  { x: -0.5, y: -0.5, z: -0.5 }, // bottom-left
  { x: 0.5, y: -0.5, z: -0.5 },  // bottom-right
  { x: 0.5, y: 0.5, z: -0.5 },   // top-right
  { x: -0.5, y: 0.5, z: -0.5 }   // top-left
];

export const CUBE_FACES = [
  { indices: [0, 1, 2, 3], color: 'rgba(200, 200, 200, 0.8)' }, // front (z = 0.5)
  { indices: [5, 4, 7, 6], color: 'rgba(180, 180, 180, 0.8)' }, // back (z = -0.5)
  { indices: [4, 0, 3, 7], color: 'rgba(160, 160, 160, 0.8)' }, // left (x = -0.5)
  { indices: [1, 5, 6, 2], color: 'rgba(160, 160, 160, 0.8)' }, // right (x = 0.5)
  { indices: [4, 5, 1, 0], color: 'rgba(140, 140, 140, 0.8)' }, // bottom (y = -0.5)
  { indices: [3, 2, 6, 7], color: 'rgba(220, 220, 220, 0.8)' }  // top (y = 0.5)
]; 
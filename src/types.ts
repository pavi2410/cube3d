// Core types for the 3D cube editor
export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export type Point2D = {
  x: number;
  y: number;
};

export type ViewState = {
  panX: number;
  panY: number;
  zoom: number;
};

export type Selection = {
  type: 'none' | 'face' | 'edge' | 'corner';
  index: number;
};

export type CubeState = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  displayMode: DisplayMode;
};

export type DisplayMode = 'none' | 'axes' | 'normals';

export type ObjectState = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type EnvironmentState = {
  view: ViewState;
}; 
import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Vec3, Point2D, Selection, ViewState } from '../types';

// New types for state organization
type ObjectState = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

type EnvironmentState = {
  view: ViewState;
};

type InteractionState = {
  isDragging: boolean;
  isPanning: boolean;
  dragStart: Point2D | null;
  dragStartObject: ObjectState;
};

type UseInteractionProps = {
  objectState: ObjectState;
  setObjectState: Dispatch<SetStateAction<ObjectState>>;
  environmentState: EnvironmentState;
  setEnvironmentState: Dispatch<SetStateAction<EnvironmentState>>;
  selection: Selection;
  setSelection: (sel: Selection) => void;
};

export const useInteraction = ({
  objectState,
  setObjectState,
  environmentState,
  setEnvironmentState,
  selection,
  setSelection
}: UseInteractionProps) => {
  const [state, setState] = useState<InteractionState>({
    isDragging: false,
    isPanning: false,
    dragStart: null,
    dragStartObject: objectState
  });

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGElement>) => {
    if (e.button === 0) { // Left mouse button
      if (selection.type === 'none') {  // Only pan if nothing is selected
        e.preventDefault();
        setState(prev => ({
          ...prev,
          isPanning: true,
          dragStart: { x: e.clientX, y: e.clientY }
        }));
      } else {  // If something is selected, handle dragging
        setState(prev => ({
          ...prev,
          isDragging: true,
          dragStart: { x: e.clientX, y: e.clientY },
          dragStartObject: objectState
        }));
      }
    } else if (e.button === 1) { // Middle mouse button
      e.preventDefault();
      setState(prev => ({
        ...prev,
        isPanning: true,
        dragStart: { x: e.clientX, y: e.clientY }
      }));
    }
  }, [selection, objectState]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGElement>) => {
    if (!state.dragStart) return;

    const dx = e.clientX - state.dragStart.x;
    const dy = e.clientY - state.dragStart.y;

    if (state.isPanning) {
      setEnvironmentState(prev => ({
        ...prev,
        view: {
          ...prev.view,
          panX: prev.view.panX + dx,
          panY: prev.view.panY + dy
        }
      }));
      setState(prev => ({
        ...prev,
        dragStart: { x: e.clientX, y: e.clientY }
      }));
    } else if (state.isDragging) {
      switch (selection.type) {
        case 'face': {
          const moveScale = 0.01;
          setObjectState(prev => ({
            ...prev,
            position: {
              x: state.dragStartObject.position.x + dx * moveScale,
              y: state.dragStartObject.position.y + dy * moveScale,
              z: state.dragStartObject.position.z
            }
          }));
          break;
        }
        case 'edge': {
          const rotateScale = 0.5;
          setObjectState(prev => ({
            ...prev,
            rotation: {
              x: state.dragStartObject.rotation.x + dy * rotateScale,
              y: state.dragStartObject.rotation.y + dx * rotateScale,
              z: state.dragStartObject.rotation.z
            }
          }));
          break;
        }
        case 'corner': {
          const scaleScale = 0.005;
          setObjectState(prev => ({
            ...prev,
            scale: {
              x: Math.max(0.1, state.dragStartObject.scale.x * (1 + dx * scaleScale)),
              y: Math.max(0.1, state.dragStartObject.scale.y * (1 + dy * scaleScale)),
              z: Math.max(0.1, state.dragStartObject.scale.z * (1 + (dx + dy) * scaleScale))
            }
          }));
          break;
        }
      }
    }
  }, [state, selection, setObjectState, setEnvironmentState]);

  const handleMouseUp = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      isPanning: false,
      dragStart: null
    }));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<SVGElement>) => {
    e.preventDefault();
    const zoomFactor = 0.001;
    const newZoom = environmentState.view.zoom * (1 - e.deltaY * zoomFactor);
    setEnvironmentState({
      view: {
        ...environmentState.view,
        zoom: Math.max(0.1, Math.min(5, newZoom))
      }
    });
  }, [environmentState.view, setEnvironmentState]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const rotateAmount = 5;
    const scaleAmount = 0.1;

    switch (e.key) {
      case 'ArrowLeft':
        setObjectState(prev => ({
          ...prev,
          rotation: { ...prev.rotation, y: prev.rotation.y - rotateAmount }
        }));
        break;
      case 'ArrowRight':
        setObjectState(prev => ({
          ...prev,
          rotation: { ...prev.rotation, y: prev.rotation.y + rotateAmount }
        }));
        break;
      case 'ArrowUp':
        setObjectState(prev => ({
          ...prev,
          rotation: { ...prev.rotation, x: prev.rotation.x - rotateAmount }
        }));
        break;
      case 'ArrowDown':
        setObjectState(prev => ({
          ...prev,
          rotation: { ...prev.rotation, x: prev.rotation.x + rotateAmount }
        }));
        break;
      case 'x':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, x: prev.scale.x + scaleAmount }
        }));
        break;
      case 'X':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, x: Math.max(0.1, prev.scale.x - scaleAmount) }
        }));
        break;
      case 'y':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, y: prev.scale.y + scaleAmount }
        }));
        break;
      case 'Y':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, y: Math.max(0.1, prev.scale.y - scaleAmount) }
        }));
        break;
      case 'z':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, z: prev.scale.z + scaleAmount }
        }));
        break;
      case 'Z':
        setObjectState(prev => ({
          ...prev,
          scale: { ...prev.scale, z: Math.max(0.1, prev.scale.z - scaleAmount) }
        }));
        break;
    }
  }, [setObjectState]);

  return {
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onWheel: handleWheel
    },
    state: {
      isDragging: state.isDragging,
      isPanning: state.isPanning
    },
    keyboardHandler: handleKeyDown
  };
}; 
import { useState, useEffect } from 'react';
import { Selection, DisplayMode, ObjectState, EnvironmentState } from './types';
import { useInteraction } from './hooks/useInteraction';
import { Cube } from './components/geometry/Cube';
import { Grid } from './components/grid/Grid';
import { Axes } from './components/axes/Axes';
import { InfiniteAxes } from './components/axes/InfiniteAxes';
import { InfoPanel } from './components/ui/InfoPanel';
import { DebugPanel } from './components/ui/DebugPanel';
import { Normals } from './components/geometry/Normals';
import { ControlPanel } from './components/ui/ControlPanel';

// Constants with type annotations
const DEFAULT_OBJECT_STATE: ObjectState = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

const DEFAULT_ENVIRONMENT_STATE: EnvironmentState = {
  view: {
    panX: 0,
    panY: 0,
    zoom: 1
  }
};

// Main App Component
export default function App() {
  // State with type annotations
  const [objectState, setObjectState] = useState<ObjectState>(DEFAULT_OBJECT_STATE);
  const [environmentState, setEnvironmentState] = useState<EnvironmentState>(DEFAULT_ENVIRONMENT_STATE);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('none');
  const [selection, setSelection] = useState<Selection>({ type: 'none', index: -1 });

  // Center point for projection
  const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  // Interaction handlers
  const { handlers, state, keyboardHandler } = useInteraction({
    objectState,
    setObjectState,
    environmentState,
    setEnvironmentState,
    selection,
    setSelection
  });

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);
    return () => window.removeEventListener('keydown', keyboardHandler);
  }, [keyboardHandler]);

  // Add control handlers
  const handleReset = () => {
    setObjectState(DEFAULT_OBJECT_STATE);
    setEnvironmentState(DEFAULT_ENVIRONMENT_STATE);
    setSelection({ type: 'none', index: -1 });
  };

  const handleZoomIn = () => {
    setEnvironmentState((prev: EnvironmentState) => ({
      ...prev,
      view: {
        ...prev.view,
        zoom: Math.min(5, prev.view.zoom * 1.2)
      }
    }));
  };

  const handleZoomOut = () => {
    setEnvironmentState((prev: EnvironmentState) => ({
      ...prev,
      view: {
        ...prev.view,
        zoom: Math.max(0.1, prev.view.zoom / 1.2)
      }
    }));
  };

  const handleCenter = () => {
    setObjectState((prev: ObjectState) => ({
      ...prev,
      position: { x: 0, y: 0, z: 0 }
    }));
    setEnvironmentState((prev: EnvironmentState) => ({
      ...prev,
      view: {
        ...prev.view,
        panX: 0,
        panY: 0
      }
    }));
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') handleReset();
      if (e.key === 'c' || e.key === 'C') handleCenter();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleReset, handleCenter, handleZoomIn, handleZoomOut]);

  // Double click handler for axes toggle
  const handleDoubleClick = () => {
    setDisplayMode(prev => {
      switch (prev) {
        case 'none': return 'axes';
        case 'axes': return 'normals';
        case 'normals': return 'none';
        default: return 'none';
      }
    });
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#1a1a1a',
      overflow: 'hidden'
    }}>
      <svg
        width="100%"
        height="100%"
        style={{
          cursor: state.isPanning 
            ? 'grabbing' 
            : state.isDragging 
              ? 'grabbing'
              : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        {...handlers}
        onDoubleClick={handleDoubleClick}
      >
        <defs>
          <pattern 
            id="hatch" 
            patternUnits="userSpaceOnUse" 
            width="4" 
            height="4"
            patternTransform="rotate(22.5)"
          >
            <line 
              x1="0" 
              y1="0" 
              x2="0" 
              y2="4" 
              stroke="white" 
              strokeWidth="1" 
              opacity="0.3"
            />
          </pattern>
        </defs>

        {/* Background grid */}
        <Grid center={center} view={environmentState.view} />

        {/* Infinite axes */}
        <InfiniteAxes center={center} view={environmentState.view} />

        {/* Cube */}
        <Cube
          position={objectState.position}
          rotation={objectState.rotation}
          scale={objectState.scale}
          view={environmentState.view}
          selection={selection}
          onSelect={(type, index) => setSelection({ type, index })}
          onDeselect={() => setSelection({ type: 'none', index: -1 })}
        />

        {/* Display based on mode */}
        {displayMode === 'axes' && (
          <Axes
            position={objectState.position}
            rotation={objectState.rotation}
            scale={objectState.scale}
            view={environmentState.view}
            center={center}
          />
        )}
        {displayMode === 'normals' && (
          <Normals
            position={objectState.position}
            rotation={objectState.rotation}
            scale={objectState.scale}
            view={environmentState.view}
            center={center}
          />
        )}
      </svg>

      {/* UI Overlays */}
      <InfoPanel />
      <DebugPanel
        position={objectState.position}
        rotation={objectState.rotation}
        scale={objectState.scale}
        view={environmentState.view}
        selection={selection}
        displayMode={displayMode}
      />

      {/* Add ControlPanel */}
      <ControlPanel
        onReset={handleReset}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
      />
    </div>
  );
}

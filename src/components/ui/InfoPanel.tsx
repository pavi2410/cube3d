import { MousePointer, MousePointerClick, Move, Maximize, RotateCcw, Eye, Keyboard } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const InfoPanel = () => {
  const ButtonStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.8)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '6px',
      padding: '2px',
      display: 'flex',
      gap: '2px',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      color: 'white',
      fontSize: '12px'
    }}>
      <Tooltip icon={MousePointer} description="Hover faces/edges" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <MousePointer size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={MousePointerClick} description="Drag to move/rotate" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <MousePointerClick size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={Move} description="Middle click + drag to pan" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <Move size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={Maximize} description="Scroll to zoom" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <Maximize size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={RotateCcw} description="R to reset view" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <RotateCcw size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={Eye} description="Double click to toggle axes" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <Eye size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={Keyboard} description="Arrow keys to rotate" iconSize={16} position="top">
        <button style={ButtonStyle}>
          <Keyboard size={16} />
        </button>
      </Tooltip>
    </div>
  );
};

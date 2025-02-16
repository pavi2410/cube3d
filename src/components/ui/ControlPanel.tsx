import { ViewState, Vec3 } from '../../types';
import { Home, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Tooltip } from './Tooltip';

type ControlPanelProps = {
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
};

export const ControlPanel = ({
  onReset,
  onZoomIn,
  onZoomOut,
  onCenter
}: ControlPanelProps) => {
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
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '2px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '6px',
      backdropFilter: 'blur(10px)',
    }}>
      <Tooltip icon={RotateCcw} description="Reset All (R)" iconSize={16} position="left">
        <button 
          onClick={onReset} 
          style={ButtonStyle}
        >
          <RotateCcw size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={Home} description="Center Cube (C)" iconSize={16} position="left">
        <button 
          onClick={onCenter} 
          style={ButtonStyle}
        >
          <Home size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={ZoomIn} description="Zoom In (+)" iconSize={16} position="left">
        <button 
          onClick={onZoomIn} 
          style={ButtonStyle}
        >
          <ZoomIn size={16} />
        </button>
      </Tooltip>
      <Tooltip icon={ZoomOut} description="Zoom Out (-)" iconSize={16} position="left">
        <button 
          onClick={onZoomOut} 
          style={ButtonStyle}
        >
          <ZoomOut size={16} />
        </button>
      </Tooltip>
    </div>
  );
}; 
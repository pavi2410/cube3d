import { useState } from 'react';
import type { Vec3, ViewState, Selection, DisplayMode } from '../../types';
import { Minus, Plus } from 'lucide-react';

type DebugPanelProps = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  view: ViewState;
  selection: Selection;
  displayMode: DisplayMode;
};

export const DebugPanel = ({ 
  position, 
  rotation, 
  scale, 
  view, 
  selection, 
  displayMode 
}: DebugPanelProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const formatNumber = (n: number) => n.toFixed(2);
  const formatVec3 = (v: Vec3) => 
    `(${formatNumber(v.x)}, ${formatNumber(v.y)}, ${formatNumber(v.z)})`;

  const ButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '8px',
      padding: '6px',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '12px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      minWidth: isMinimized ? 'auto' : '200px',
    }}>
      <div 
        onClick={() => setIsMinimized(!isMinimized)}
        style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: isMinimized ? 'none' : '1px solid rgba(255,255,255,0.2)', 
          paddingBottom: isMinimized ? 0 : '4px',
          marginBottom: isMinimized ? 0 : '4px',
          fontWeight: 'bold',
          color: '#888',
          cursor: 'pointer'
        }}>
        Debug Info
        <div 
          style={ButtonStyle}
          title={isMinimized ? "Expand" : "Collapse"}
        >
          {isMinimized ? <Plus size={14} /> : <Minus size={14} />}
        </div>
      </div>
      {!isMinimized && (
        <>
          <div>Position: {formatVec3(position)}</div>
          <div>Rotation: {formatVec3(rotation)}°</div>
          <div>Scale: {formatVec3(scale)}</div>
          <div>View:</div>
          <div style={{ paddingLeft: '12px' }}>
            Pan: ({formatNumber(view.panX)}, {formatNumber(view.panY)})
          </div>
          <div style={{ paddingLeft: '12px' }}>
            Zoom: {formatNumber(view.zoom)}x
          </div>
          <div>Selection:</div>
          <div style={{ paddingLeft: '12px' }}>
            Type: {selection.type}
            {selection.type !== 'none' && `, Index: ${selection.index}`}
          </div>
          <div>Display Mode: {displayMode}</div>
        </>
      )}
    </div>
  );
}; 
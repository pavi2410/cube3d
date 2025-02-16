import { useState, type ReactNode } from 'react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipProps = {
  icon: React.ElementType;
  description: string;
  iconSize?: number;
  children?: ReactNode;
  position?: TooltipPosition;
};

export const Tooltip = ({
  icon: Icon,
  description,
  iconSize = 16,
  children,
  position = 'top'
}: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const content = children || <Icon size={iconSize} />;

  const getTooltipStyle = (position: TooltipPosition): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'sans-serif',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '4px',
        cursor: 'help'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {content}
      {showTooltip && (
        <div style={getTooltipStyle(position)}>
          {description}
        </div>
      )}
    </div>
  );
}; 
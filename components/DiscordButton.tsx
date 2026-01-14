'use client';

import React, { useState } from 'react';

const DiscordButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://discord.gg/H4jkBz9tg6', '_blank');
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '62px', 
        right: '50px', 
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          marginRight: '15px',
          padding: '8px 14px',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          position: 'relative'
        }}
      >
        Join the Curious Circle
        {/* Triangle Arrow */}
        <div style={{
          position: 'absolute',
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '6px solid #333'
        }} />
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#5865F2',
          color: 'white',
          fontSize: '28px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: isHovered ? '0 6px 16px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.3)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Replace with your Discord Icon or Emojis */}
        💬
      </button>
    </div>
  );
};

export default DiscordButton;
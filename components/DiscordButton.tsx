'use client';

import React from 'react';

const DiscordButton = () => {
  const handleClick = () => {
    // Replace with your Discord invite link
    window.open('https://discord.gg/H4jkBz9tg6', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      title="Join Our Community"
      style={{
        position: 'fixed',
        bottom: '62px',
        right: '50px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#5865F2',
        color: 'white',
        fontSize: '28px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        zIndex: 9999,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      }}
    >
      💬
    </button>
  );
};

export default DiscordButton;



import React, { useState, useEffect } from 'react';

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState('red');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLight(prev => {
        if (prev === 'red') return 'green';
        if (prev === 'green') return 'yellow';
        return 'red';
      });
      setIsButtonDisabled(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualChange = () => {
    if (!isButtonDisabled) {
      setActiveLight(prev => {
        if (prev === 'red') return 'green';
        if (prev === 'green') return 'yellow';
        return 'red';
      });
      setIsButtonDisabled(true);
    }
  };

  const getLightStyle = (color) => ({
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '15px auto',
    backgroundColor: activeLight === color ? color : '#444',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: activeLight === color 
      ? `0 0 20px ${color}, 0 0 40px ${color}`
      : '0 0 5px rgba(0, 0, 0, 0.5)',
    border: '2px solid #222',
  });

  return (
    <div
      style={{
        width: '120px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        border: '3px solid #333',
      }}
      role="region"
      aria-label="Traffic Light"
    >
      <div
        style={getLightStyle('red')}
        aria-label={activeLight === 'red' ? 'Red light active' : 'Red light inactive'}
      ></div>
      <div
        style={getLightStyle('yellow')}
        aria-label={activeLight === 'yellow' ? 'Yellow light active' : 'Yellow light inactive'}
      ></div>
      <div
        style={getLightStyle('green')}
        aria-label={activeLight === 'green' ? 'Green light active' : 'Green light inactive'}
      ></div>
      <button
        onClick={handleManualChange}
        disabled={isButtonDisabled}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: isButtonDisabled ? '#666' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease, transform 0.1s ease',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: isButtonDisabled ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.3)',
          transform: isButtonDisabled ? 'none' : 'scale(1)',
        }}
        onMouseDown={() => !isButtonDisabled && (document.activeElement.style.transform = 'scale(0.95)')}
        onMouseUp={() => !isButtonDisabled && (document.activeElement.style.transform = 'scale(1)')}
      >
        Change Light
      </button>
    </div>
  );
};

export default TrafficLight;
import React from 'react';
import scotiabankLogo from './scotiabank-logo.png'; // Replace with your actual logo file

const ScotiabankLogo = () => {
  return (
    <div className="scotiabank-logo">
      <img src={scotiabankLogo} alt="Scotiabank Logo" style={{ width: '100px', height: '50px' }} />
    </div>
  );
}

export default ScotiabankLogo;

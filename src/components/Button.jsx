import React from 'react';
import './Button.css';

function Button({ onClick, customWidth, customText, color, textColor }) {
  return(
    <>
      <button 
        onClick={onClick}
        style={{ 
          padding: 20, 
          borderRadius: 20, 
          width: customWidth, 
          backgroundColor: color || null,
          color: textColor || null
      }}>
        {customText}
      </button> 
    </>
  )
};

export default Button;

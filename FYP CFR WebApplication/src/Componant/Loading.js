import React from 'react';
import '../Style.css';
//call and dislay loading screen 
const Loading = () => {
  return (
    <div className="align-center">
      <div className="loader" />
      <span className="Loading-Screen-Text">Loading...</span>
    </div>
  )
};

export default Loading;

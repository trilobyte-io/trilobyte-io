import React from 'react';

const Needle = ({ value }) => {
  const rotation = (value / 100) * 180 - 90; // Calculate the rotation angle

  return (
      <div
      className="needle"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    ></div>
  );
};

export default Needle;
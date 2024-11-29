import { Progress } from 'antd';
import React from 'react';


const RatingCircle = ({ rating }) => {
const roundedRating = rating.toFixed(1); 
  return (
    <div className="flex items-center space-x-2 ">
      <Progress
        type="circle"
        percent={roundedRating * 10} // rating out of 10, so multiply by 10
        width={40} // Adjust the width if needed
        strokeColor="#4caf50" // Customize color as needed
        format={() => <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{roundedRating}</span>}
      />
    </div>
  );
};

export default RatingCircle;

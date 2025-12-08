import React from 'react';
import { Wheel } from 'react-custom-roulette'; 
import type { Prize } from '../data/prizes';



interface SpinnerProps {
  mustSpin: boolean;
  prizeNumber: number;
  data: Prize[];
  onStopSpinning: () => void;
}

const Spinner: React.FC<SpinnerProps> = ({ mustSpin, prizeNumber, data, onStopSpinning }) => {
  
  
  return (
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      onStopSpinning={onStopSpinning}
      outerBorderColor="#3a3a3a"
      outerBorderWidth={12}
      radiusLineColor="#3a3a3a"
      radiusLineWidth={3}
      fontSize={16}
      textDistance={70}
    />
  );
};

export default Spinner;
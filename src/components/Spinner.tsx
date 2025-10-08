import React from 'react';
import * as Roulette from 'react-custom-roulette';
import type { Prize } from '../data/prizes';

const Wheel = (Roulette as any).default.Wheel;

interface SpinnerProps {
  mustSpin: boolean;
  prizeNumber: number;
  data: Prize[];
  onStopSpinning: () => void;
}

const Spinner: React.FC<SpinnerProps> = ({ mustSpin, prizeNumber, data, onStopSpinning }) => {
  if (!Wheel) {
    return <div>Loading Wheel...</div>;
  }
  
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
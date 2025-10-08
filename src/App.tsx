import { useState } from 'react';
import Spinner from './components/Spinner';
import { prizeData } from './data/prizes';

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinClick = () => {
    if (isSpinning) return;
    const newPrizeNumber = Math.floor(Math.random() * prizeData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsSpinning(true);
    setSpinResult(null);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setIsSpinning(false);
    const winningPrize = prizeData[prizeNumber].option;
    
    let resultMessage = '';
    if (winningPrize.includes('ZONK')) {
      resultMessage = `OH NO! Better luck next time!`;
    } else if (winningPrize.includes('COIN')) {
      const randomCoin = Math.floor(Math.random() * 1000) + 50;
      resultMessage = `WOW! You won ${randomCoin} Coins!`;
    } else if (winningPrize.includes('TICKET')) {
       resultMessage = `SWEET! You got 1 free Ticket!`;
    } else {
      resultMessage = `CONGRATS! You won a ${winningPrize}!`;
    }
    
    setSpinResult(resultMessage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#88d4ec] p-4 font-sans">
      <div className="bg-white rounded-3xl border-4 border-black p-8 text-center w-full max-w-2xl shadow-[10px_10px_0px_#2c3e50]">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          LUCKY WHEEL
        </h1>
        <p className="text-gray-600 mb-8 text-xl">
          Spin & Win Awesome Prizes!
        </p>
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute top-[-20px] text-6xl drop-shadow-lg z-10">🔻</div>
          <Spinner
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            data={prizeData}
            onStopSpinning={handleStopSpinning}
          />
        </div>
        <button 
          className="w-full px-8 py-5 text-2xl font-bold text-white bg-gradient-to-b from-[#ff7a5a] to-[#ff5a5a] rounded-2xl border-4 border-black shadow-[6px_6px_0px_#2c3e50] transform transition-transform duration-150 hover:scale-[1.02] active:translate-y-1 active:shadow-[2px_2px_0px_#2c3e50] disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:active:translate-y-0 disabled:cursor-not-allowed" 
          onClick={handleSpinClick} 
          disabled={isSpinning}>
          {isSpinning ? 'SPINNING...' : 'SPIN NOW!'}
        </button>
        {spinResult && (
          <div className="mt-8 p-6 bg-[#fffbe0] border-4 border-dashed border-[#f6e05e] rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
            <h2 className="text-3xl font-semibold text-[#c05621] animate-pulse">
              {spinResult}
            </h2>
          </div>
        )}
      </div>
      <footer className="text-center mt-6 text-white text-opacity-80">
        <p>&copy; 2025 Lucky Games</p>
      </footer>
    </div>
  );
}

export default App;
import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import Spinner from '../components/Spinner';
import { prizeData } from '../data/prizes';
import { CLAIMER_CONTRACT_ADDRESS, ClaimerABI } from '../data/Claimer';
import { NFT_CONTRACT_ADDRESS, NFTABI } from '../data/NFT';

interface ClaimData {
  prizeType: string;
  amount: number;
  signature: `0x${string}`;
  contractAddress: `0x${string}`;
}

function Spin() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isClaiming } = useWriteContract();
  
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [claimData, setClaimData] = useState<ClaimData | null>(null);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleSpinClick = () => {
    if (isSpinning || !isConnected) return;
    const newPrizeNumber = Math.floor(Math.random() * prizeData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsSpinning(true);
    setSpinResult(null);
    setClaimData(null);
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setIsSpinning(false);
    
    const winningPrize = prizeData[prizeNumber].option;
    const prizeKey = winningPrize.replace(/[^a-zA-Z]/g, "").trim();

    if (winningPrize.includes('ZONK')) {
      setSpinResult("OH NO! Better luck next time!");
      return;
    }

    try {
      const response = await fetch('/api/Spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, prizeType: prizeKey })
      });
      
      const data = await response.json();
      setClaimData(data);
      setSpinResult(`CONGRATS! You won ${data.amount} ${prizeKey}!`);
    } catch (err) {
      setSpinResult("Error getting reward signature.");
    }
  };

  const handleClaim = () => {
    if (!claimData || !address) return;

    if (claimData.prizeType === 'NFT') {
      writeContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTABI,
        functionName: 'signatureMint',
        args: [address, claimData.signature],
      });
    } else {
      writeContract({
        address: CLAIMER_CONTRACT_ADDRESS as `0x${string}`,
        abi: ClaimerABI,
        functionName: 'claimToken',
        args: [claimData.contractAddress, BigInt(claimData.amount), claimData.signature],
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl border-4 border-black p-8 text-center w-full max-w-2xl shadow-[10px_10px_0px_#2c3e50]">
        <h1 className="text-5xl font-bold text-gray-800 mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          LUCKY WHEEL
        </h1>
        
        {!isConnected && (
          <p className="text-red-500 font-bold mb-4 animate-bounce">
            ⚠️ Please Connect Wallet to Play!
          </p>
        )}

        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute top-[-20px] text-6xl z-10">🔻</div>
          <Spinner
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            data={prizeData}
            onStopSpinning={handleStopSpinning}
          />
        </div>

        {!claimData ? (
          <button 
            className="w-full px-8 py-5 text-2xl font-bold text-white bg-gradient-to-b from-[#ff7a5a] to-[#ff5a5a] rounded-2xl border-4 border-black shadow-[6px_6px_0px_#2c3e50] disabled:bg-gray-400 disabled:shadow-none transition-transform active:translate-y-1" 
            onClick={handleSpinClick} 
            disabled={isSpinning || !isConnected}
          >
            {isSpinning ? 'SPINNING...' : isConnected ? 'SPIN NOW!' : 'CONNECT FIRST'}
          </button>
        ) : (
          <button 
            className="w-full px-8 py-5 text-2xl font-bold text-white bg-green-500 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#1a5e20] hover:bg-green-600 transition-all active:translate-y-1"
            onClick={handleClaim}
            disabled={isClaiming || isConfirming}
          >
            {isClaiming ? 'CONFIRMING...' : isConfirming ? 'WAITING...' : isSuccess ? 'CLAIMED! ✅' : 'CLAIM REWARD! 🎁'}
          </button>
        )}

        {spinResult && (
          <div className="mt-8 p-6 bg-[#fffbe0] border-4 border-dashed border-[#f6e05e] rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
            <h2 className="text-3xl font-semibold text-[#c05621] animate-pulse">
              {spinResult}
            </h2>
            {isSuccess && <p className="text-green-600 font-bold mt-2">Transaction Successful!</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Spin;
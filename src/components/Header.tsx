import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsModalOpen(false);
  };

  return (
    <header className="w-full p-4 bg-white border-b-4 border-black shadow-lg flex justify-between items-center z-20">
      <div className="text-3xl font-extrabold text-[#ff5a5a]">
        Web3 Spinner
      </div>

      <div>
        {isConnected ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono bg-gray-100 p-2 rounded border border-black shadow-[2px_2px_0px_#000]">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button 
              onClick={() => disconnect()}
              className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg border-2 border-black hover:bg-gray-300 transition active:translate-y-0.5"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-[#ff7a5a] text-white font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#ff5a5a] active:translate-y-1 active:shadow-none transition"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-md">
          <div className="bg-white rounded-3xl border-4 border-black p-6 w-full max-w-sm shadow-[10px_10px_0px_#000] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-800">Select Wallet</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="w-full p-4 flex items-center justify-between bg-[#f7fafc] border-2 border-black rounded-xl font-bold hover:bg-[#edf2f7] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none"
                >
                  <span>{connector.name}</span>
                  {connector.icon && (
                    <img src={connector.icon} alt={connector.name} className="w-8 h-8" />
                  )}
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500 font-medium">
              New to wallets? <a href="https://ethereum.org/wallets/" target="_blank" rel="noreferrer" className="text-[#ff7a5a] underline">Learn more</a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
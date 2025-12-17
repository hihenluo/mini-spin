import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Header: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsModalOpen(false);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied!');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full p-4 bg-white border-b-4 border-black shadow-lg flex justify-between items-center z-20">
      <div className="text-3xl font-extrabold text-[#ff5a5a]">
        Web3 Spinner
      </div>

      <div className="relative" ref={menuRef}>
        {isConnected ? (
          <>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-black rounded-lg font-mono font-bold shadow-[3px_3px_0px_#000] hover:bg-gray-200 transition active:translate-y-0.5 active:shadow-none"
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
              <span className="text-xs">▼</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_#000] overflow-hidden z-30">
                <button 
                  onClick={copyAddress}
                  className="w-full px-4 py-3 text-left font-bold hover:bg-gray-100 border-b-2 border-black flex items-center gap-2"
                >
                  📋 Copy Address
                </button>
                <button 
                  onClick={() => { disconnect(); setIsMenuOpen(false); }}
                  className="w-full px-4 py-3 text-left font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  🚪 Disconnect
                </button>
              </div>
            )}
          </>
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
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl border-4 border-black p-6 w-full max-w-sm shadow-[10px_10px_0px_#000]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-800">Select Wallet</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black text-2xl font-bold">✕</button>
            </div>
            <div className="flex flex-col gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="w-full p-4 flex items-center justify-between bg-[#f7fafc] border-2 border-black rounded-xl font-bold hover:bg-[#edf2f7] shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <span>{connector.name}</span>
                  {connector.icon && <img src={connector.icon} alt={connector.name} className="w-8 h-8" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
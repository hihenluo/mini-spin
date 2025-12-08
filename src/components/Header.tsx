import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-white border-b-4 border-black shadow-lg flex justify-between items-center z-20">
      <div className="text-3xl font-extrabold text-[#ff5a5a]">
        Web3 Spinner
      </div>
      <div className="connect-wallet-placeholder">
        <button className="px-4 py-2 bg-[#ff7a5a] text-white font-semibold rounded-lg shadow-md hover:bg-[#ff5a5a] transition">
          Connect Wallet (Soon)
        </button>
      </div>
    </header>
  );
};

export default Header;
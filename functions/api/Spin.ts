import { ethers } from 'ethers';
import { TOKEN_CONTRACTS } from '../../src/data/Token';
import { NFT_CONTRACT_ADDRESS } from '../../src/data/NFT';
import { CLAIMER_CONTRACT_ADDRESS } from '../../src/data/Claimer';

const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY || '';
const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY);

export default async function handler(req: any, res: any) {
  const { address, prizeType }: { address: string; prizeType: string } = req.body;

  if (!address || !prizeType) {
    return res.status(400).json({ error: "Missing required data" });
  }

  const amount = Math.floor(Math.random() * 9) + 1;

  try {
    let signature: string;
    
    if (prizeType === 'NFT') {
      signature = await generateNFTSignature(address);
      return res.json({ 
        prizeType, 
        amount: 1, 
        signature, 
        contractAddress: NFT_CONTRACT_ADDRESS 
      });
    } else {
      const tokenAddress = TOKEN_CONTRACTS[prizeType as keyof typeof TOKEN_CONTRACTS];
      
      if (!tokenAddress) throw new Error("Invalid Token Type");
      
      signature = await generateTokenSignature(address, tokenAddress, amount);
      return res.json({ 
        prizeType, 
        amount, 
        signature, 
        contractAddress: CLAIMER_CONTRACT_ADDRESS 
      });
    }
  } catch (error) {
    console.error("Signature Error:", error);
    return res.status(500).json({ error: "Failed to generate signature" });
  }
}

async function generateTokenSignature(user: string, tokenAddress: string, amount: number) {
  const domain = {
    name: "TokenClaimer",
    version: "1",
    chainId: 42220, 
    verifyingContract: CLAIMER_CONTRACT_ADDRESS
  };

  const types = {
    ClaimRequest: [
      { name: "user", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "nonce", type: "uint256" }
    ]
  };

  const nonce = 0; 

  const value = { user, token: tokenAddress, amount, nonce };
  return await signer.signTypedData(domain, types, value);
}

async function generateNFTSignature(recipient: string) {
    const domain = {
        name: "Wheel of Fun",
        version: "1",
        chainId: 42220,
        verifyingContract: NFT_CONTRACT_ADDRESS
    };

    const types = {
        MintRequest: [
            { name: "recipient", type: "address" },
            { name: "tokenId", type: "uint256" }
        ]
    };

    const tokenId = 1; 

    return await signer.signTypedData(domain, types, { recipient, tokenId });
}
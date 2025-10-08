
export interface Prize {
  option: string;
  style?: {
    backgroundColor?: string;
    textColor?: string;
  };
}

export const prizeData: Prize[] = [
  { 
    option: '🪙 COIN', 
    style: { backgroundColor: '#fef273', textColor: '#8c5a0c' } 
  },
  { 
    option: '💎 GEM', 
    style: { backgroundColor: '#81e6d9', textColor: '#234e52' } 
  },
  { 
    option: '🎟️ TICKET', 
    style: { backgroundColor: '#ff9b85', textColor: '#702c22' } 
  },
  { 
    option: '💣 ZONK', 
    style: { backgroundColor: '#a0aec0', textColor: '#2d3748' } 
  },
  { 
    option: '⭐ STAR', 
    style: { backgroundColor: '#faf089', textColor: '#744210' } 
  },
  { 
    option: '❤️ HEART', 
    style: { backgroundColor: '#fbb6ce', textColor: '#702459' } 
  },
  { 
    option: '🖼️ NFT', 
    style: { backgroundColor: '#d6bcfa', textColor: '#44337a' } 
  },
  { 
    option: '💨 ZONK', 
    style: { backgroundColor: '#e2e8f0', textColor: '#4a5568' } 
  },
];
import { http, createConfig } from 'wagmi'
import { celo } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [celo],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [celo.id]: http()
    
  },
})

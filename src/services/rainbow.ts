
  import '@rainbow-me/rainbowkit/styles.css'

  import {
    getDefaultWallets,
  } from '@rainbow-me/rainbowkit'
  import {
    chain,
    configureChains,
    createClient,
  } from 'wagmi'
  import { publicProvider } from 'wagmi/providers/public'
  import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
  
  
  const GnosisChain = {
    id: 100,
    name: 'Gnosis Chain',
    network: 'Gnosis',
    nativeCurrency: {
      decimals: 18,
      name: 'xDai',
      symbol: 'xDai',
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/gnosis',
    },
    blockExplorers: {
      default: { name: 'Gnosis Scan', url: 'https://gnosisscan.io/' },
    },
    iconUrls: ["https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png"],
    testnet: false,
  }
  
  export const { chains, provider } = configureChains(
    [chain.mainnet, GnosisChain],
    // @ts-ignore
    [
      jsonRpcProvider({ rpc: () => ({ http: "https://rpc.ankr.com/gnosis" }) }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  })

  export const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider
  })
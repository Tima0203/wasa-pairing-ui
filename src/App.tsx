import './App.css'
import ConnectWallet from './Components/ConnectWallet'
import * as buffer from "buffer"
import {RainbowKitProvider} from '@rainbow-me/rainbowkit'
import {WagmiConfig} from 'wagmi'

import { wagmiClient, chains } from './services/rainbow'
window.Buffer = buffer.Buffer

function App() {
  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={[chains[1]]} modalSize="compact" coolMode>
          <div className="App">
            <header className="App-header">
              <ConnectWallet />
            </header>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
  );
}

export default App;

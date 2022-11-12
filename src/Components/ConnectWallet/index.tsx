import { useEffect, useState } from 'react'
import { useSendTransaction } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import WasaSDK from 'wasa-sdk'

import { ZERO_ADDRESS } from '../../services/constants'
import { wagmiClient } from '../../services/rainbow'

import './styles.scss'

const ConnectWallet = () => {

  const [address, setAddress] = useState<string>(ZERO_ADDRESS)
  const { openConnectModal } = useConnectModal()
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const address = query.get('address')
    if (address) {
      setAddress(address)
    }
  }, [])

  const { sendTransaction } = useSendTransaction({
    mode: 'recklesslyUnprepared',
  })
  
  const handleDelegate = () => {
    const data = WasaSDK.voting.snapshot.prepareDelegate(address)
    sendTransaction?.({recklesslySetUnpreparedRequest: data})
  }

  return (
      <div className='wrapper'>
        <div className='title'>Sync your wallet using the link below</div>
        <div className='step'>STEP #1: press the button below  and choose the wallet from which you want to delegate your voting power</div>
        <div className='step'>STEP #2: sign in with the chosen wallet</div>
        <button onClick={openConnectModal} disabled={wagmiClient.status === 'connected'}>Sign in with wallet</button>
        <div className='step'>STEP #3: press the button below to choose the same wallet and sign the transaction to delegate your tokens to your device</div>
        <button onClick={handleDelegate} disabled={wagmiClient.status !== 'connected'}>Delegate</button>
      </div>
  );
}

export default ConnectWallet

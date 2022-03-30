import Mints from './mints';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import React, { FC, useCallback } from 'react';
import setWalletAddress from '../../App';



export const PrintPubKey = ({ setPublicKey }) => {
    const wallet = useWallet();

    //if (!publicKey) throw new WalletNotConnectedError();
    if (wallet.publicKey) {
    setPublicKey(wallet.publicKey.toBase58())
    }
    if (!wallet.publicKey) {
        setPublicKey(null);
    }

    return (
        <div></div>
    );
};


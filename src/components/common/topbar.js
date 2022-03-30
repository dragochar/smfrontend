import { useMemo } from 'react';
// import images from '../static/images';
import { useSelector } from 'react-redux';
import { clusterApiUrl } from '@solana/web3.js';
import { NavLink, useHistory } from 'react-router-dom';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import solMintsLogo from '../../assets/SolMints.png';
import React, { Component }  from 'react';
import images from '../../assets/images';

const wallets = [ getPhantomWallet() ]

export default function TopBar() {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;
    const history = useHistory();

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const data = useSelector((state) => state.data)

    return(
        <div className='top-bar'>
            <div>
                <div className='header-left'>
                    {/* <solMintsLogo/> */}
                    <img style={{'cursor':'pointer'}} onClick={() => history.push('/')} src={images['LOGO']} alt="" />
                </div>
            </div>
            <div className=''>
                <div className=''>
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    )
} 
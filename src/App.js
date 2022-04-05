import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { getMints } from './actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/home';


//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';



const App = () => {

  return (

    <ConnectionProvider endpoint={network}>
		<WalletProvider wallets={wallets} autoConnect>
			<WalletModalProvider>
				<Home />

			</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>

  );
};

export default App;
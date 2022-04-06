import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { getMints } from './actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';
import MintNavbar from './components/navbar/navbar';
import BasicLayout from './components/common/basiclayout';




//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';

const wallets = [getPhantomWallet(), getLedgerWallet()]

const opts = {
	preflightCommitment: "processed"
};

const App = () => {

  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);


  return (
    <BrowserRouter>
    <ConnectionProvider endpoint={network}>
		<WalletProvider wallets={wallets} autoConnect>
			<WalletModalProvider>
        <BasicLayout>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/mints" />} />
          <Route path="/mints" exact component={Home}/>
          <Route path="/mints/search" exact component={Home}/>

        </Switch>

        </BasicLayout>
			</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>
  </BrowserRouter>

  );
};

export default App;
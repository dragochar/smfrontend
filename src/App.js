import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { getMints } from './actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import Mints from './components/mints/mints';
import AdminWallets from './wallets/adminwallets';
import CyberWallets from './wallets/cyberapeWallets';
import brandLogo from './assets/caa.gif'
import Footer from './components/common/footer';
import Card from '@mui/material/Card';

import Form from './components/form/form';
import MintNavbar from './components/navbar/navbar';
//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';
import BasicLayout from './components/common/basiclayout';
//import monkeDAOLogo from './assets/images/monkedao';

// Constants
const TWITTER_HANDLE = 'solmapsnft';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const ADMIN_WALLET = 'FYFpbvpzWQMPBmG4joHGprsjiJsudkpqxjTepFEWeDUk';

const opts = {
	preflightCommitment: "processed"
};

const wallets = [getPhantomWallet(), getLedgerWallet()]

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [isAdminWallet, setIsAdminWallet] = useState(null);
  const dispatch = useDispatch();

  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);

  const address = userAccount.publicKey;
  if (walletContext.publicKey) {
    console.log(walletContext.publicKey.toBase58());
  }

  useEffect(() => {
    dispatch(getMints());
    console.log('got new mints');

  }, [dispatch]);


  const renderConnectedContainer = () => (
    <div>
        <Mints />
        <br></br>
    </div>
  );

  const renderUnauthenticatedContainer = () => (
    <div>
        <Card>
          <h2>Please make sure you connect with a wallet that holds a Cyber Ape.</h2>
        </Card>
        <br></br>
    </div>
  );

  const renderAdminContainer = () => (
    <div>
      <Mints />
      <br></br>
      <br></br>
      <Form />
      <br></br>
      <br></br>
      <br></br>
    </div>
  );



  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      //await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const PrintPubKey = ({ setPublicKey }) => {
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


  return (

    <ConnectionProvider endpoint={network}>
		<WalletProvider wallets={wallets} autoConnect>
			<WalletModalProvider>
				<BasicLayout>

					<div className="App">
							<div className={walletAddress ? 'authed-container' : 'container'}>
						<div className="header-container">
            <div>
            <img alt="CyberApeImg" src={brandLogo} width='100' height='100'></img>
						<p className="header main-text-logo">CyberApeMints</p>
						</div>
            <p className="sub-text">
							View upcoming mints, and vote on your favourites
						</p>
            <PrintPubKey setPublicKey={setWalletAddress} />

						{!AdminWallets.includes(walletAddress) && CyberWallets.includes(walletAddress) && walletAddress && renderConnectedContainer()}
            {!CyberWallets.includes(walletAddress) && !AdminWallets.includes(walletAddress) && walletAddress && renderUnauthenticatedContainer()}
						{AdminWallets.includes(walletAddress) && renderAdminContainer()} 
						</div>
					</div>
					</div>
				</BasicLayout>

			</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>

  );
};

export default App;


import React, { useEffect, useState, FC, useCallback } from 'react';
import { getMints } from '../../actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mints from '../mints/mints';
import AdminWallets from '../../wallets/adminwallets';
import CyberWallets from '../../wallets/cyberapeWallets';
import brandLogo from '../../assets/caa.gif'
import Footer from '../common/footer';
import Card from '@mui/material/Card';
import { Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Showcases from '../daoShowcases/showcases';
import './home.css';


import Form from '../form/form';
//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, useConnection, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey, Transaction} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';


// Constants
const TWITTER_HANDLE = 'realsolmints';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const {Token} = require('@solana/spl-token');



const opts = {
	preflightCommitment: "processed"
};

const wallets = [getPhantomWallet(), getLedgerWallet()]

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

      // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [isAdminWallet, setIsAdminWallet] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  //const { connection } = useConnection();
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);
  const { publicKey, sendTransaction } = useWallet();

  const address = userAccount.publicKey;
  if (walletContext.publicKey) {
    //console.log(walletContext.publicKey.toBase58());
  }

  const theme = createTheme({
    palette: {
      mode: 'dark',
      upcoming: {
        main: '#ff867c',
        contrastText: '#000000',
    },
    primary: {
      main: '#ff867c',
      contrastText: '#000000',
  },
    }
  });


  const renderConnectedContainer = () => (
    <div>
        <Mints page={page} />
            <div className="paginationContainer">
            <Pagination page={page} />
            </div>
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
      <div className="paginationContainer">
        <Pagination page={page} />
      </div>
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

    const onboardedDAOs = [
      {label: 'CyberApeAge', },
    ]



    return (
        <div className="App">
            <ThemeProvider theme={theme}>

            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <div>
                        <p className="home-header main-text-logo">SolMints</p>
                    </div>
                    <p className="sub-text">
                        Hi there, welcome to SolMints! 👋
                    </p>
                    <div className="move-up">
                    <iframe src='https://my.spline.design/solmints-0c49ca0c7934b8697c23300df3a6cd1a/' frameBorder='0' width='100%' height='210px'></iframe>
                    </div>
                    <br></br>
                    <Showcases />
                    {/*AdminWallets.includes(walletAddress) && renderAdminContainer()*/}
                    {/*<div className="explainer-text">Check out some of our DAO Partners!</div>*/}
                     
                </div>
            </div>
            </ThemeProvider>
        </div>
    )

}

export default Home;
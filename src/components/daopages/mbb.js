import React, { useEffect, useState } from 'react';
import { getMints } from '../../actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mints from '../mints/mints';
import TodayMints from '../mints/todayMints';
import AdminWallets from '../../wallets/adminwallets';
import CyberWallets from '../../wallets/cyberapeWallets';
import brandLogo from '../../assets/mbb.gif'
import Footer from '../common/footer';
import Card from '@mui/material/Card';
import { Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import RenderSelectButtons from '../common/renderSelectButtons';
import '../daopages/daopages.css';

import Form from '../form/form';
//Kellen Imports

import { account, Mint, util, Wallet, WalletI } from "easy-spl";
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { getPhantomWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BN, Provider, web3} from '@project-serum/anchor';

// Constants
const TWITTER_HANDLE = 'realsolmints';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const pageName = 'mbb';



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
  const [sort, setSort] = useState('Upcoming');


  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);

  const address = userAccount.publicKey;
  if (walletContext.publicKey) {
    //console.log(walletContext.publicKey.toBase58());
  }



  const renderConnectedContainer = () => (
    <div>
        <div>
        {sort==="Explore" ?  <Mints page={page} /> : <></>}
        {sort==="Upcoming" ?  <TodayMints /> : <></>}

        <div className="paginationContainer">
        {sort==="Explore" ? <Pagination page={page} pageName={pageName} /> : <></>}
        </div>
        <br></br>
        </div>
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

  const renderSelectButtons = () => {
    return (
    <RenderSelectButtons sort={sort} setSort={setSort} />
    )
  }

  const renderAdminContainer = () => {
    return (
      <div>
        <div>
      {sort==="Explore" ?  <Mints page={page} /> : <></>}
      {sort==="Upcoming" ?  <TodayMints /> : <></>}
      <div className="paginationContainer">
        {sort==="Explore" ? <Pagination page={page} /> : <></>}
        </div>
      <br></br>
      </div>
      <Form />
  </div>
    );
};



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
        <div className="App">
            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <div>
                        <img alt="MBBImg" src={brandLogo} width='100' height='100'></img>
                        <p className="header main-text-logo">BabyMints</p>
                    </div>
                    <div>
                      {walletAddress && renderSelectButtons()}
                    </div>
                    <div>
                    {walletAddress ? <p className="sub-text">View upcoming mints, and vote on your favourites ✨</p> :
                    <p className="sub-text">Connect a Solana wallet with an MBB to get started! 🍼</p>
                    }
                        
                    </div>
                    <PrintPubKey setPublicKey={setWalletAddress} />
                    {!AdminWallets.includes(walletAddress) && walletAddress && renderConnectedContainer()}
                    {AdminWallets.includes(walletAddress) && renderAdminContainer()}
                    
                   
                </div>
            </div>
        </div>
    )

}

export default Home;
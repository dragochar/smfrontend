import React, { useEffect, useState } from 'react';
import { getMints } from '../../actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mints from '../mints/mints';
import TodayMints from '../mints/todayMints';
import Giveaways from '../giveaways/giveaways';
import LikedMints from '../mints/likedMints';
import AdminUsers from '../../wallets/ggsgwallets';
import CyberWallets from '../../wallets/cyberapeWallets';
import brandLogo from '../../assets/tD.png'
import Footer from '../common/footer';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import GiveawayPagination from '../pagination/GiveawayPagination';
import RenderSelectButtons from '../common/renderSelectButtons';
import { getOneUserWithID } from '../../actions/users';
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
const pageName = 'td';
const dao = 'tDAO';




const opts = {
	preflightCommitment: "processed"
};

const wallets = [getPhantomWallet(), getLedgerWallet()]

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const [sort, setSort] = useState('Upcoming');
  const history = useHistory();
  const [userDBID, setUserDBID] = useState(JSON.parse(localStorage.getItem('user2')));
  const [user, setUser] = useState(null);


  const walletContext = useWallet();

  const network = "http://api.mainnet-beta.solana.com/";
  const connection = new Connection(network, 'processed');
  const provider = new Provider(connection, walletContext, opts.preflightCommitment);
  const userAccount = new Wallet(connection, provider.wallet);


  const date = new Date();
  const dateAsString = date.toString();
  const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];


  const renderConnectedContainer = () => (
    <div>
        <div>
        {sort==="Explore" ?  <Mints page={page} AdminWallets={AdminUsers} user={user} /> : <></>}
        {sort==="Upcoming" ?  <TodayMints dao={dao} AdminWallets={AdminUsers} setSort={setSort} user={user} /> : <></>}
        {sort==="Giveaways" ?  <Giveaways dao={dao} AdminWallets={AdminUsers} setSort={setSort} user={user} /> : <></>}


        <div className="paginationContainer">
        {sort==="Explore" ? <Pagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        {sort==="Giveaways" ? <GiveawayPagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        </div>
        <br></br>
        </div>
    </div>
  );

  const renderUnauthenticatedContainer = () => (
    <div>
        <Card>
          <h2>Please make sure you connect with a wallet that holds a Galactic Gecko NFT.</h2>
        </Card>
        <br></br>
    </div>
  );

  const renderSelectButtons = () => {
    return (
    <RenderSelectButtons sort={sort} setSort={setSort} pageName={pageName} />
    )
  }

  const renderAdminContainer = () => {
    return (
      <div>
        <div>
      {sort==="Explore" ?  <Mints page={page} AdminWallets={AdminUsers} user={user} /> : <></>}
      {sort==="Upcoming" ?  <TodayMints dao={dao} AdminWallets={AdminUsers} setSort={setSort} user={user} /> : <></>}
      {sort==="Giveaways" ?  <Giveaways dao={dao} AdminWallets={AdminUsers} setSort={setSort} wallet={user.data.discordID} user={user} /> : <></>}

      <div className="paginationContainer">
        {sort==="Explore" ? <Pagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        {sort==="Giveaways" ? <GiveawayPagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        </div>
      <br></br>
      </div>
      <Form dao={dao} />
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

  useEffect(async () => {
    if (localStorage.getItem('user2') !==null) {
    const ourUser = await dispatch(getOneUserWithID(userDBID.data));
    setUser(ourUser);
    }
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
            <div className={user!==null ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <div>
                        <img alt="DAO Logo" src={brandLogo} width='100' height='100'></img>
                        <p className="header main-text-logo">TrustMints</p>
                    </div>
                    <div>
                      {user!==null && renderSelectButtons()}
                    </div>
                    <div>
                    {user!==null ? <div className="sub-text"><p>View upcoming mints, and vote on your favourites ✨</p>
                    {/*<div className="time-text"><Typography variant="caption">(Times in {timezone})</Typography></div>*/}
                    </div> :
                    <p className="sub-text">Login with your Discord to get started! 🤝</p>
                    }
                    
                    </div>
                    {user!==null && !AdminUsers.includes(user.data.discordID) && renderConnectedContainer()}
                    {user!==null && AdminUsers.includes(user.data.discordID) && renderAdminContainer()}
                    
                </div>
            </div>
        </div>
    )

}

export default Home;
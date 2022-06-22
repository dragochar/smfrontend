import React, { useEffect, useState } from 'react';
import { getMints } from '../../actions/mints';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mints from '../mints/mints';
import TodayMints from '../mints/todayMints';
import Giveaways from '../giveaways/giveaways';
import LikedMints from '../mints/likedMints';
//import AdminUsers from '../../wallets/ggsgwallets';
import CyberWallets from '../../wallets/cyberapeWallets';
//import brandLogo from '../../assets/ggsg.gif'
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
import Admin from '../admin/admin';
import Form from '../form/form';

//const pageName = 'ggsg';
//const dao = 'ggsgDAO';




function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ brandLogo, pageName, dao, AdminUsers, textName }) => {

  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const [sort, setSort] = useState('Upcoming');
  const history = useHistory();
  const view = query.get('view') || '';
  const { currentUser } = useSelector((state) => state.user);


  const date = new Date();
  const dateAsString = date.toString();
  const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];


  const renderConnectedContainer = () => (
    <div>
        <div>
        {sort==="Explore" ?  <Mints page={page} AdminWallets={AdminUsers} dao={dao} pageName={pageName} /> : <></>}
        {sort==="Upcoming" ?  <TodayMints dao={dao} AdminWallets={AdminUsers} setSort={setSort} /> : <></>}
        {sort==="Giveaways" ?  <Giveaways dao={dao} AdminWallets={AdminUsers} setSort={setSort} wallet={currentUser.discordID} pageName={pageName} /> : <></>}


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
          <h2>Please make sure you connect a Discord account with the proper role.</h2>
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
      {sort==="Explore" ?  <Mints page={page} AdminWallets={AdminUsers} dao={dao} pageName={pageName} /> : <></>}
      {sort==="Upcoming" ?  <TodayMints dao={dao} AdminWallets={AdminUsers} setSort={setSort} /> : <></>}
      {sort==="Giveaways" ?  <Giveaways dao={dao} AdminWallets={AdminUsers} setSort={setSort} wallet={currentUser.discordID} pageName={pageName} /> : <></>}

      <div className="paginationContainer">
        {sort==="Explore" ? <Pagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        {sort==="Giveaways" ? <GiveawayPagination page={page} pageName={pageName} dao={dao} AdminWallets={AdminUsers} /> : <></>}
        </div>
      <br></br>
      </div>
      <Admin dao={dao} />
  </div>
    );
};

    useEffect(() => {
      if (view==='giveaways') {
        setSort('Giveaways');
      }
      if (view==='upcoming') {
        setSort('Upcoming');
      }
      if (view==='explore') {
        setSort('Explore');
      }

    }, [])
    


    return (
        <div className="App">
            <div className={currentUser!==null ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <div>
                    {textName==='BBA' ? <img alt="DAO Logo" src={brandLogo} width='300' height='300'></img>
                         : (<>
                        <img alt="DAO Logo" src={brandLogo} width='100' height='100'></img>
                        <p className="header main-text-logo">{textName}Mints</p></>)
                      }
                    </div>
                    <div>
                      {currentUser!==null && renderSelectButtons()}
                    </div>
                    <div>
                    {currentUser!==null ? <div className="sub-text"><p>View upcoming mints, and vote on your favourites ✨</p>
                    {/*<div className="time-text"><Typography variant="caption">(Times in {timezone})</Typography></div>*/}
                    </div> :
                    <p className="sub-text">Login with your Discord to get started! 🦎</p>
                    }
                    
                    </div>
                    {currentUser!==null && !AdminUsers.includes(currentUser.discordID) && renderConnectedContainer()}
                    {currentUser!==null && AdminUsers.includes(currentUser.discordID) && renderAdminContainer()}
                    {currentUser!==null && renderUnauthenticatedContainer()}
                    
                </div>
            </div>
        </div>
    )

}

export default Home;
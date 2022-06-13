import React, { useEffect, useState } from 'react';
import './App2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';
import Master from './master/master';
import DAOPage from './components/daopages/daopage';
import CAA from './components/daopages/caa';
import GGSG from './components/daopages/ggsg';
import Noot from './components/daopages/noot';
import MonkeDAO from './components/daopages/monkedao';
import BitBearAlpha from './components/daopages/bitbearalpha';
import InternalAlpha from './components/daopages/internalalpha';
import trustDAO from './components/daopages/trustdao';
import Auth from './components/common/auth';
import CheckDiscord from './components/giveaways/checkDiscord';
import MintNavbar from './components/navbar/navbar';
import BasicLayout from './components/common/basiclayout';
import ReactGA from 'react-ga4';


ReactGA.initialize("G-9EKCL3T07T");
ReactGA.send("pageview");



const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <div className="main-app">
        <BasicLayout>
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/auth" exact component={Auth} />
          <Route path="/checkdiscord" exact component={CheckDiscord} />
          <Route path="/ggsg" exact><DAOPage brandLogo={Master.ggsg.brandLogo} pageName={Master.ggsg.pageName}
          dao={Master.ggsg.dao} AdminUsers={Master.ggsg.AdminUsers} /></Route>
          <Route path="/bitbearalpha" exact><DAOPage brandLogo={Master.bitbearalpha.brandLogo} pageName={Master.bitbearalpha.pageName}
          dao={Master.bitbearalpha.dao} AdminUsers={Master.bitbearalpha.AdminUsers} /></Route>
          <Route path="/tD" exact><DAOPage brandLogo={Master.tD.brandLogo} pageName={Master.tD.pageName}
          dao={Master.tD.dao} AdminUsers={Master.tD.AdminUsers} /></Route>
          <Route path="/internalalpha" exact component={InternalAlpha}/>
          <Route path="/noot" exact component={Noot}/>
          <Route path="/ggsg" exact component={GGSG} />

          <Route path="/mints/search" exact component={Home}/>

        </Switch>
        </BasicLayout>
        </div>
  </BrowserRouter>

  );
};

export default App;
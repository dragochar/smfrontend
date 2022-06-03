import { useMemo } from 'react';
// import images from '../static/images';
import { useSelector } from 'react-redux';
import { clusterApiUrl } from '@solana/web3.js';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useDispatch } from 'react-redux';
// import solMintsLogo from '../../assets/SolMints.png';
import React, { Component, useState, useEffect }  from 'react';
import images from '../../assets/images';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getOneUserWithID } from '../../actions/users';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import './common.css';


const crypto = require('crypto')
const DiscordOauth2 = require("discord-oauth2");


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function TopBar() {

    //init stuff
    const location = useLocation();
    const history = useHistory();

    //Our User stuff
    const [userDBID, setUserDBID] = useState(JSON.parse(localStorage.getItem('user2')));
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    //Discord Stuff
    
    const query = useQuery();
    const code = query.get('code') || '';

    // UI Stuff
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    useEffect(async () => {
    if (localStorage.getItem('user2') !==null) {
        setUserDBID(JSON.parse(localStorage.getItem('user')));
        const ourUser = await dispatch(getOneUserWithID(userDBID.data));
        setUser(ourUser);
    }
    }, [location]);

    

    const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    });
    const theme2 = createTheme({
        palette: {
            primary: {
                main: '#1c1c1c',
                light: '#757ce8',
                dark: '#002884',
                contrastText: '#ffffff',
            }
        },
        });
    


    if (code!=='') {
        const API_ENDPOINT = 'https://discord.com/api/v10/oauth2/token';
        const CLIENT_ID = '978019233021706302';
        const CLIENT_SECRET = 'PXIjC2_mgELNFjHkJR00gsewv40Su3MD';
        const REDIRECT_URI = 'https://solmints.io/auth';
        const useroauth = new DiscordOauth2();


        const params = new URLSearchParams();
        params.append('client_id', CLIENT_ID);
        params.append('client_secret', CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', REDIRECT_URI);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        

    }

    const oauth = new DiscordOauth2({
        clientId: "978019233021706302",
        clientSecret: "PXIjC2_mgELNFjHkJR00gsewv40Su3MD",
        redirectUri: "https://solmints.io/auth",
    });

    const url = oauth.generateAuthUrl({
        scope: ["identify", "guilds", "guilds.members.read"],
        state: crypto.randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
    });

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push('/');
        setUser(null);
        setAnchorEl(null);

    };


    




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

                { user=== null ? <ThemeProvider theme={theme2}><Button href={url} variant="contained" >
                    Login
                    </Button></ThemeProvider> : (
                        <>
                        <div className="user-details">
                        <Chip
                            avatar={<Avatar alt="Natacha" src={user.data.avatarLink} />}
                            label={user.data.username}
                            onClick={handleClick}
                            variant="contained"
                            sx={{ borderColor: '#000000', borderWidth: '2px' }}
                            size="large"
                        />
                        </div>
                        <ThemeProvider theme={theme}>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            sx= {{ 
                                padding: '4px' }}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                        </ThemeProvider>
                        </>
                    )
                }
                    {/*<WalletMultiButton />*/}
                </div>
            </div>
        </div>
    )
}
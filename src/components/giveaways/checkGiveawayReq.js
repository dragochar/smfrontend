import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { updateFollowingTwitter } from '../../actions/users';
import axios from 'axios';

const crypto = require('crypto')
const DiscordOauth2 = require("discord-oauth2");

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const CheckGiveawayReq = ({ giveaways, pageName }) => {
    const [missingStuffOpen, setMissingStuffOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
      };
    
    const handleClose = () => {
    setState({ ...state, open: false });
    };

    const theme = createTheme({
        palette: {
            discord: {
                main: '#5865F2',
                contrastText: '#ffffff',
            },
            twitter: {
                main: '#00acee',
                contrastText: '#ffffff',
            },
        }

      });
    
      const oauth = new DiscordOauth2({
        clientId: "978019233021706302",
        clientSecret: "PXIjC2_mgELNFjHkJR00gsewv40Su3MD",
        redirectUri: `http://localhost:3000/checkdiscord`,
    });

    const url = oauth.generateAuthUrl({
        scope: ["identify", "guilds", "guilds.members.read"],
        state: crypto.randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
    });

    
    const checkTwitter = async () => {
        let approvedTwitter = [];
        for (let i=0; i<giveaways.length; i++) {
            let giveawayTwitter = giveaways[i].twitter.substring(20);
            console.log(`https://daospot.herokuapp.com/mints/giveaways/twitterCheck/${currentUser.twitter}/${giveawayTwitter}`);
            await axios.get(`https://daospot.herokuapp.com/mints/giveaways/twitterCheck/${currentUser.twitter}/${giveawayTwitter}`)
            .then(async (response) => {
                const boolean = response.data;
                if (boolean==="true") {approvedTwitter.push(giveaways[i].name)}
                let resp = await dispatch(updateFollowingTwitter(currentUser._id, giveaways[i]._id, boolean));
            })
        }
        


    }

    return (
        <>
            <ThemeProvider theme={theme}>

            <Stack spacing={2} direction="row" sx={{ float: 'left' }}>
            {currentUser.twitter==='' || currentUser.twitter===null ? 
            <Button className="sort-button" onClick={handleClick({vertical: 'top',horizontal: 'center',})} variant="contained" color="twitter">Check Twitter</Button>
            : (
            <Button className="sort-button" onClick={checkTwitter} variant="contained" color="twitter">Check Twitter</Button>
            )
            }
            {currentUser.twitter==='' || currentUser.twitter===null ? 
            <Button className="sort-button" onClick={handleClick({vertical: 'top',horizontal: 'center',})} variant="contained" color="discord">Check Discord</Button>
            : (
            <Button className="sort-button" href={url} variant="contained" color="discord">Check Discord</Button>
            )
            }
            </Stack>
            </ThemeProvider>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please add your Twitter and Wallet to your profile to enter giveaways.
            </Alert>
            </Snackbar>

        </>
    );
}

export default CheckGiveawayReq;


import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { updateUserTwitterWallet } from '../../actions/users';
import axios from 'axios';

const ProfileView = ({ setDialogOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [userTwitter, setUserTwitter] = useState(currentUser.twitter);
    const [userWallet, setUserWallet] = useState(currentUser.wallet);
    const dispatch = useDispatch();

    const theme = createTheme({
        palette: {
            mode: 'dark',
            input: {
                main: '#ffffff',
                darker: '#ffffff',
                contrastText: '#ffffff',
            },
            solana: {
                main: '#9945FF',
                contrastText: '#ffffff',

            }
        }
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentUser._id);

        if (userTwitter!=='' && userWallet!=='') {
            dispatch(updateUserTwitterWallet(currentUser._id, userTwitter, userWallet));
            setDialogOpen(false);
    }
    }


    return ( 
    <div>
        <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
            Enter Your Profile Details Here
        </DialogTitle>
        
        <DialogTitle sx={{ fontSize: 20, fontWeight: 400, color: "white" }}>
            Note: Your Twitter Username is Case Sensitive
        </DialogTitle>
        <ThemeProvider theme={theme}>
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Twitter (can't be empty)</InputLabel>
                <OutlinedInput
                variant="outlined" 
                label="Twitter (can't be empty)"
                required={true}
                notched={true}
                autoFocus={true}
                color="input"
                value={userTwitter}
                startAdornment={<InputAdornment position="start">@</InputAdornment>}
                onChange={(e) => setUserTwitter(e.target.value)}
                />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Wallet (can't be empty)</InputLabel>
                <OutlinedInput
                variant="outlined" 
                label="Wallet (can't be empty)"
                required={true}
                notched={true}
                color="input"
                value={userWallet}
                startAdornment={<InputAdornment position="start">◎</InputAdornment>}
                onChange={(e) => setUserWallet(e.target.value)}
                />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>

        <Button variant="contained" type="submit" color="solana" onClick={handleSubmit}>
            Save
        </Button>
        </FormControl>



        </ThemeProvider>


    </div>
    
    );
}

export default ProfileView;
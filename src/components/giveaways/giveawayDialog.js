import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CakeIcon from '@mui/icons-material/Cake';
import './giveaway.css';
import { enterGiveaway } from '../../actions/mints';


const GiveawayDialog = ({ giveaway, setDialogOpen, wallet }) => {

    const [entryData, setEntryData] = useState({
        wallet: wallet, twitter: '', discord: ''
    });

    const dispatch = useDispatch();

    const theme = createTheme({
        palette: {
            mode: 'dark',
            input: {
                main: '#ffffff',
                darker: '#ffffff',
                contrastText: '#ffffff',
            },
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let fullEntry = []
        fullEntry = [entryData.wallet, entryData.twitter, entryData.discord]

        dispatch(enterGiveaway(fullEntry, giveaway._id));

        setDialogOpen(false);
    }
    




    return(
        <div className="dialog">
            <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
                Enter Raffle For {giveaway.name}
            </DialogTitle>

            <ThemeProvider theme={theme}>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Your Twitter Username</InputLabel>
                            <OutlinedInput
                            variant="outlined" 
                            label="Twitter"
                            required={true}
                            fullWidth
                            color="input"
                            value={entryData.twitter}
                            onChange={(e) => setEntryData({ ...entryData, twitter: e.target.value })}
                            />
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Your Discord Username</InputLabel>
                            <OutlinedInput
                                variant="outlined" 
                                label="Discord"
                                fullWidth
                                color="input"
                                value={entryData.discord}
                                onChange={(e) => setEntryData({ ...entryData, discord: e.target.value })}
                            />
                    </FormControl> 
                </form>
                <Button variant="contained" color="info" endIcon={<CakeIcon />} onClick={handleSubmit}>
                    Enter
                </Button>
            </ThemeProvider>
        </div>
    );
}

export default GiveawayDialog;
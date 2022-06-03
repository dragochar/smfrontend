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


const WinnersDialog = ({ giveaway, setDialogOpen, wallet }) => {

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



    return(
        <div className="dialog">
            <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
                Winners of {giveaway.name}!
            </DialogTitle>

            <ThemeProvider theme={theme}>

                <Button variant="contained" color="info" endIcon={<CakeIcon />}>
                    Enter
                </Button>
            </ThemeProvider>
        </div>
    );
}

export default WinnersDialog;
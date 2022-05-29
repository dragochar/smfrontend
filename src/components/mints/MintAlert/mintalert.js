import React, { useEffect, useState } from 'react';
import { updateMint } from '../../../actions/mints';
import './mintalert.css';
import { Form as BSForm } from 'react-bootstrap';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import { deleteMint } from '../../../actions/mints';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Resizer from "react-image-file-resizer";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';
import discordAlert from '../../discord/discordAlert';
import { useDispatch } from 'react-redux';
import { createGiveaway } from '../../../actions/mints';


 

const AlertContent = ({ mint, walletAddress, AdminWallets, setGiveawayDialogOpen }) => {
    const [giveawayData, setGiveawayData] = useState({
        name: mint.name, description: '', numSpots: '', timeInHours: 24, DAO: mint.DAO, 'selectedFile': mint.selectedFile, discord: mint.discord, twitter: mint.twitter
    });
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        //if (mintData.mintDate==="") {setChecked(true)}

      }, []);

    const theme = createTheme({
      palette: {
          mode: 'dark',
          input: {
              main: '#ffffff',
              darker: '#ffffff',
              contrastText: '#ffffff',
          },
          info: {
              main: '#FFFFFF',
              contrastText: '#ffff66',
          },
          upcoming: {
            main: '#ff867c',
            contrastText: '#000000',
        },

      }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGiveaway(giveawayData));
        discordAlert(mint, giveawayData);
        setGiveawayDialogOpen(false);

    }

return (
    <div className="dialog">

        <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
        Giveaway Whitelist Spots For {mint.name}!
        </DialogTitle>

        <ThemeProvider theme={theme}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                
                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Number of Spots</InputLabel>
                        <OutlinedInput
                        variant="outlined" 
                        label="Number of Spots"
                        required={true}
                        fullWidth
                        color="input"
                        value={giveawayData.numSpots}
                        onChange={(e) => setGiveawayData({ ...giveawayData, numSpots: e.target.value })}
                        />
                </FormControl>

                <br></br>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Description / Rules of Giveaway</InputLabel>

                        <OutlinedInput
                            label="Description (Shift + Enter For New Line)"
                            fullWidth
                            multiline
                            color="input"
                            value={giveawayData.description}
                            onChange={(e) => setGiveawayData({ ...giveawayData, description: e.target.value })}
                        />
                </FormControl>

                <div>


                </div>
                

                <div>

                </div>
                

                <Button color="info" type="submit">
                Submit
                </Button>

            </form>
            </ThemeProvider>

    <br></br>

      
    {/*<Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 900 }}>Comments</Typography>*/}


</div>
);

}

export default AlertContent;
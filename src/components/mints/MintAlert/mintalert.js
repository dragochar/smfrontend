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
import Typography from '@mui/material/Typography';
import Resizer from "react-image-file-resizer";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import discordAlert from '../../discord/discordAlert';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { createGiveaway } from '../../../actions/mints';


 

const AlertContent = ({ mint, walletAddress, AdminWallets, setGiveawayDialogOpen }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [giveawayData, setGiveawayData] = useState({
        name: mint.name, description: '', mintID: mint._id, numSpots: '', timeInHours: 24, DAO: mint.DAO, 'selectedFile': mint.selectedFile, discord: mint.discord, twitter: mint.twitter,
        guildID: '', creator: currentUser.discordID, reqTwitter: false, reqDiscord: true,
    });
    const [checked, setChecked] = React.useState(false);
    const [twitterChecked, setTwitterChecked] = React.useState(false);
    const [discordChecked, setDiscordChecked] = React.useState(false);
    const dispatch = useDispatch();


    const handleTwitterCheck = () => {
        if (twitterChecked===false) {
            setTwitterChecked(true);
            setGiveawayData({ ...giveawayData, reqTwitter: true })
            setGiveawayData({ ...giveawayData, twitter: '' })
        }
        if (twitterChecked===true) {
            setTwitterChecked(false);
            setGiveawayData({ ...giveawayData, reqTwitter: false })
            setGiveawayData({ ...giveawayData, twitter: mint.twitter })
        }
    }

    const handleDiscordCheck = () => {
        if (discordChecked===false) {
            setDiscordChecked(true)
            setGiveawayData({ ...giveawayData, reqDiscord: true })
        }
        if (discordChecked===true) {
            setDiscordChecked(false)
            setGiveawayData({ ...giveawayData, reqDiscord: false })
        }
    }



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
                            multiline
                            color="input"
                            value={giveawayData.description}
                            onChange={(e) => setGiveawayData({ ...giveawayData, description: e.target.value })}
                        />
                </FormControl>

                <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormGroup sx={{ marginBottom: "30px" }}>
                            <FormControlLabel control={<Checkbox onChange={handleTwitterCheck} />} label="Require users to follow project twitter?" sx={{ color: "#ffffff" }} />
                        </FormGroup>
                    </FormControl>
                </div>
                {twitterChecked===true ?
                <FormControl sx={{ m: 1 }}>
                <Typography color="white" sx={{ marginBottom: "15px", marginTop: "-40px" }} gutterBottom variant="subtitle2">Copy and paste Twitter link please - case sensitive</Typography>              
                    <InputLabel htmlFor="outlined-adornment-amount">Twitter Link</InputLabel>
                        <OutlinedInput
                            variant="outlined"
                            label="Project Twitter"
                            required={true}
                            fullWidth
                            color="input"
                            value={giveawayData.twitter}
                            onChange={(e) => setGiveawayData({ ...giveawayData, twitter: e.target.value })}
                        />
                </FormControl>
                : (<></>)
                    
                }

                <div>
                
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormGroup sx={{ marginBottom: "30px" }}>
                            <FormControlLabel control={<Checkbox onChange={handleDiscordCheck} />} label="Require users to be in project Discord?" sx={{ color: "#ffffff" }} />
                        </FormGroup>
                    </FormControl>
                </div>
                {discordChecked===true ?   
                <FormControl sx={{ m: 1 }}>
                <Typography color="white" sx={{ marginBottom: "15px", marginTop: "-40px" }} gutterBottom variant="subtitle2">Please enter Server ID by right clicking on the server, and clicking 'COPY ID'</Typography>              
                    <InputLabel htmlFor="outlined-adornment-amount">Discord ID</InputLabel>
                        <OutlinedInput
                            variant="outlined" 
                            label="Discord ID"
                            required={true}
                            fullWidth
                            color="input"
                            value={giveawayData.guildID}
                            onChange={(e) => setGiveawayData({ ...giveawayData, guildID: e.target.value })}
                        />
                </FormControl>
                : (<></>)
                    
                }
                

                <div>

                </div>
                
                    <Button color="primary" onClick={handleSubmit}>
                        Send
                    </Button>

            </form>
            </ThemeProvider>

    <br></br>

      
    {/*<Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 900 }}>Comments</Typography>*/}


</div>
);

}

export default AlertContent;
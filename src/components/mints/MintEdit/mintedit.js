import React, { useState } from 'react';
import { updateMint } from '../../../actions/mints';
import './mintedit.css';
import { Form as BSForm } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import solanaLogo from '../../../assets/sol.svg';
import Divider from '@mui/material/Divider';
import discordLogo from '../../../assets/discord.svg';
import twitterLogo from '../../../assets/twitter.svg';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteMint } from '../../../actions/mints';
import AdminWallets from '../../../wallets/adminwallets';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Resizer from "react-image-file-resizer";
import { createTheme, ThemeProvider } from '@mui/material/styles';



const EditContent = ({ mint, walletAddress }) => {
    const [mintData, setMintData] = useState({
      creator: '', name: mint.name, description: mint.description, DAO: mint.dao, 'selectedFile': mint.selectedFile, mintDate: mint.mintDate, price: mint.price, supply: mint.supply, discord: mint.discord, twitter: mint.twitter
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
          info: {
              main: '#FFFFFF',
              contrastText: '#ffff66',
          }

      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      dispatch(updateMint(mint._id, mintData));

      setMintData({
          creator: '', name: '', description: '', DAO: 'caaDAO', 'selectedFile': '', mintDate: new Date(),
      });
    }
    const handleImageChange = async (event) => {
      try {
          const file = event.target.files[0];
          const image = await resizeFile(file);
          console.log(image);
          setMintData({ ...mintData, selectedFile: image })
        } catch (err) {
          console.log(err);
        }
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            500,
            500,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
            );
        });


    const renderDeleteButton = (mint) => (
        <IconButton color="info" aria-label="delete" onClick={()=>{dispatch(deleteMint(mint._id))}}>
          <DeleteOutlineIcon />
        </IconButton>
      )

    

return (
    <div className="dialog">

        <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
        Edit {mint.name}
        </DialogTitle>

        <ThemeProvider theme={theme}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                
                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                        <OutlinedInput
                        variant="outlined" 
                        label="Name"
                        required="true"
                        fullWidth
                        color="input"
                        value={mintData.name}
                        onChange={(e) => setMintData({ ...mintData, name: e.target.value })}
                        />
                </FormControl>

                <br></br>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>

                        <OutlinedInput
                            label="Description (Shift + Enter For New Line)"
                            fullWidth
                            multiline
                            color="input"
                            value={mintData.description}
                            onChange={(e) => setMintData({ ...mintData, description: e.target.value })}
                        />
                </FormControl>

                


                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={mintData.price}
                        onChange={(e) => setMintData({ ...mintData, price: e.target.value })}
                        startAdornment={<InputAdornment position="start">◎</InputAdornment>}
                        label="Price"
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Supply</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={mintData.supply}
                        onChange={(e) => setMintData({ ...mintData, supply: e.target.value })}
                        startAdornment={<InputAdornment position="start">#</InputAdornment>}
                        label="Supply"
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Discord Link</InputLabel>
                        <OutlinedInput
                        variant="outlined" 
                        label="Discord Link"
                        fullWidth
                        color="input"
                        value={mintData.discord}
                        onChange={(e) => setMintData({ ...mintData, discord: e.target.value })}
                        />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Twitter Link</InputLabel>
                        <OutlinedInput
                        variant="outlined" 
                        label="Twitter Link"
                        fullWidth
                        color="input"
                        value={mintData.twitter}
                        onChange={(e) => setMintData({ ...mintData, twitter: e.target.value })}
                        />
                </FormControl>


                <BSForm.Control 
                    type="hidden" 
                    size="sm"
                    placeholder="Enter your DAO"
                    value={mintData.DAO}
                    onChange={(e) => setMintData({ ...mintData, DAO: e.target.value })}
                />
                {/*
                <div>

                <h4 style={{ color:'azure' }}>Enter Date/Time Of Mint by clicking below</h4>
                
                <DatePicker
                    selected={mintData.mintDate}
                    value={mintData.mintDate}
                    onChange ={(date) => setMintData({ ...mintData, mintDate: date })}
                    showTimeSelect
                    dateFormat="Pp"
                />
                </div>
                */}

                <div>
                
                <h4 style={{ color:'azure' }}>Upload mint image (png/jpg only) below</h4>
                
                <input type="file" onChange={(event) => handleImageChange(event)} />

                </div>
                

                <Button color="info" type="submit">
                Submit
                </Button>

            </form>
            </ThemeProvider>

    <br></br>

    {AdminWallets.includes(walletAddress) && renderDeleteButton(mint)}

      
    {/*<Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 900 }}>Comments</Typography>*/}


</div>
);

}

export default EditContent;
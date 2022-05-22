import React, { useState } from 'react';
import { Button, Form as BSForm } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createMint } from '../../actions/mints'
import FileBase from 'react-file-base64';
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Resizer from "react-image-file-resizer";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import startOfDay from 'date-fns/startOfDay/index.js';


const Form = ({ dao }) => {
    const [mintData, setMintData] = useState({
        creator: '', name: '', description: '', DAO: 'bbaDAO', 'selectedFile': '', mintDate: startOfDay(new Date()),
    });
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);
    const [value, onChange] = useState(new Date());
    const [value1, setValue] = React.useState(new Date());

    const theme = createTheme({
        palette: {
            mode: 'dark',
            input: {
                main: '#ffffff',
                darker: '#ffffff',
                contrastText: '#ffffff',
            },
            upcoming: {
                main: '#ff867c',
                contrastText: '#000000',
            },
        }
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(createMint(mintData));
        setMintData({
            creator: '', name: '', description: '', DAO: {dao}, 'selectedFile': '', mintDate: new Date(),
        });
    }

    const handleImageChange = async (event) => {
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
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
    
    const handleCheck = (event) => {
        setChecked(event.target.checked);
        if (checked===true) {
            setMintData({ ...mintData, mintDate: "" })
        }

    };

    const renderDateTimePicker = () => {
        return (
            <DatePicker
            selected={mintData.mintDate}
            value={mintData.mintDate}
            onChange ={(date) => setMintData({ ...mintData, mintDate: date })}
            showTimeSelect
            dateFormat="Pp"
        />
        );
    };



    return (
        <div>
            <h2 style={{ color:'azure' }}>Admin Zone</h2>
            <ThemeProvider theme={theme}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                        <OutlinedInput
                        variant="outlined" 
                        label="Name"
                        required={true}
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

                


                <FormControl fullWidth sx={{ m: 1 }}>
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

                <FormControl fullWidth sx={{ m: 1 }}>
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

                <FormControl fullWidth sx={{ m: 1 }}>
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

                <FormControl fullWidth sx={{ m: 1 }}>
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

                <div>

                <h4 style={{ color:'azure' }}>Enter Date/Time Of Mint by clicking below</h4>
                <FormControl>
                    <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                        label='Unknown Mint Date/Time'
                    />
                </FormControl>
                {!checked && renderDateTimePicker()}
                
                </div>

                <div>
                
                <h4 style={{ color:'azure' }}>Upload mint image (png/jpg only) below</h4>
                
                <input type="file" onChange={(event) => handleImageChange(event)} />

                </div>
                

                <Button variant="secondary" type="submit">
                Submit
                </Button>

            </form>
            </ThemeProvider>
        </div>
        

        
    );
}

export default Form;

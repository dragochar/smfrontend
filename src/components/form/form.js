import React, { useState } from 'react';
import { Button, Form as BSForm } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createMint } from '../../actions/mints'
import FileBase from 'react-file-base64';
import TextField from '@mui/material/TextField';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DateTimePicker from '@mui/lab/DateTimePicker';
import Compress from "react-image-file-resizer";


const Form = () => {
    const [mintData, setMintData] = useState({
        creator: '', name: '', description: '', DAO: 'caaDAO', 'selectedFile': '', mintDate: new Date(),
    });
    const dispatch = useDispatch();
    const [value, onChange] = useState(new Date());
    const [value1, setValue] = React.useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(createMint(mintData));
        setMintData({
            creator: '', name: '', description: '', DAO: 'caaDAO', 'selectedFile': '', mintDate: new Date(),
        });
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <h2 style={{ color:'azure' }}>Admin Zone</h2>

            <BSForm onSubmit={handleSubmit}>
            <BSForm.Group className="mb-3" controlId="formBasicEmail">
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Enter project name"
                value={mintData.name}
                onChange={(e) => setMintData({ ...mintData, name: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Enter project description"
                value={mintData.description}
                onChange={(e) => setMintData({ ...mintData, description: e.target.value })}
            />
            <BSForm.Control 
                type="hidden" 
                size="sm"
                placeholder="Enter your DAO"
                value={mintData.DAO}
                onChange={(e) => setMintData({ ...mintData, DAO: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Project price (in Sol, if unknown please skip)"
                value={mintData.price}
                onChange={(e) => setMintData({ ...mintData, price: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Project supply (if unknown please skip)"
                value={mintData.supply}
                onChange ={(e) => setMintData({ ...mintData, supply: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Discord Link"
                value={mintData.discord}
                onChange ={(e) => setMintData({ ...mintData, discord: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Twitter Link"
                value={mintData.twitter}
                onChange ={(e) => setMintData({ ...mintData, twitter: e.target.value })}
            />
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

            <div>
            {/*
            <h4 style={{ color:'azure' }}>Upload mint image (png/jpg only) below</h4>
            <FileBase type="file" multiple={false}
            onDone={
            ({ base64 }) => {setMintData({ ...mintData, selectedFile: base64 })}
            } 

            />
            </div>
            */}



            </BSForm.Group>
            

            <Button variant="primary" type="submit">
             Submit
            </Button>
            </BSForm>
        </div>
        

        
    );
}

export default Form;

import React, { useState } from 'react';
import { Button, Form as BSForm } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createMint } from '../../actions/mints'
import FileBase from 'react-file-base64';
import TextField from '@mui/material/TextField';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";


const Form = () => {
    const [mintData, setMintData] = useState({
        creator: '', name: '', description: '', DAO: 'caaDAO', 'selectedFile': '', mintDate: new Date(),
    });
    const dispatch = useDispatch();
    const [value, onChange] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createMint(mintData));
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
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
                placeholder="Project price (in Sol)"
                value={mintData.price}
                onChange={(e) => setMintData({ ...mintData, price: e.target.value })}
            />
            <BSForm.Control 
                type="text" 
                size="sm"
                placeholder="Project supply"
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
            {/*
            <DatePicker
                selected={mintData.mintDate}
                value={mintData.mintDate}
                onChange ={(date) => setMintData({ ...mintData, mintDate: date })}
                showTimeSelect
                dateFormat="Pp"
            />
            */}
            </div>

            <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setMintData({ ...mintData, selectedFile: base64 })} />
            </div>



            </BSForm.Group>
            

            <Button variant="primary" type="submit">
             Submit
            </Button>
            </BSForm>
        </div>
        

        
    );
}

export default Form;

import React from 'react';
import Mint from './mint/mint';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import "./mints.css";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Footer from '../common/footer';
import CalendarTodayIcon from '@mui/icons-material/AccessAlarm';



const Mints = ({ setCurrentMintId }) => {
    const mints = useSelector((state) => state.mints);
    const firstFourMints = mints.slice(0, 4);
    const secondFourMints = mints.slice(4, 20);
    let newDate = new Date();
    let today = newDate.getDate();
    let month = newDate.getMonth();



    return (

            
            !mints.length ? <Spinner animation="border" variant="info" /> : (
                <div className="mints-container">
                    <div className="button-container">
                    </div>
                    <Chip sx={{ marginBottom: '25px' }}label=" TOP UPCOMING MINTS " color="secondary" icon={<CalendarTodayIcon />} />
                    <div>
                    <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} setCurrentMintId={setCurrentMintId} />
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                    <div className="sub-divider-text">Vote On Other Upcoming Projects </div>
                    <Grid container spacing={3}>
                    {secondFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} setCurrentMintId={setCurrentMintId} />
                        </Grid>
                    ))}
                    
                    </Grid>
                    
                </div>

            )
    );
}

export default Mints;
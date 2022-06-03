import React, { useState } from 'react';
import { getMintsBySort } from '../../actions/mints';
import { useDispatch } from 'react-redux';

import Mint from './mint/mint';
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
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Footer from '../common/footer';
import CalendarTodayIcon from '@mui/icons-material/AccessAlarm';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Pagination from '../pagination/Pagination';
import RenderSelectButtons from '../common/renderSelectButtons';


const Mints = ({ page, AdminWallets, user }) => {
    const { mints, isLoading } = useSelector((state) => state.mints);
    const firstFourMints = mints.slice(0, 4);
    const secondFourMints = mints.slice(4, 200);
    const secondRealFourMints = mints.slice(4, 8);

    let newDate = new Date();


    const theme = createTheme({
        palette: {
            upcoming: {
                main: '#ff867c',
                contrastText: '#000000',
            },
            mostLiked: {
                main: '#ff9800',
                contrastText: '#000000',
            },
            explore: {
                main: '#ffff6b',
                backgroundColor: 'fff666',
                contrastText: '#000000',
            },
        }
      });



    if (!mints.length && !isLoading) return 'No mints';


    const RenderExploreMints = () => {
        return (
            <div>
                <div>
                    <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallets={AdminWallets} user={user} />
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                    {page==='1' ? <></> : (<br></br>)}
                    {page==='1' ? <div className="sub-divider-text">Vote On Other Upcoming Projects</div> : (<br></br>)}
                    <Grid container spacing={3}>
                    {secondFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallets={AdminWallets} user={user} />
                        </Grid>
                    ))}
                    
                    </Grid>
                    <br></br>
            </div>     


        )
    }

        
    return (
        
            isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
                <>
                    <div className="date-and-filters-container">
                        <div className="today-icon">
                            {page==='1' ? <Chip sx={{ marginBottom: '25px' }}label=" TOP UPCOMING MINTS " color="secondary" icon={<CalendarTodayIcon />} /> : <></>}
                        </div>
                    </div>
                    <div className="mints-container">
                    {RenderExploreMints()}

                    </div>
                </>
            )
    );
}

export default Mints;
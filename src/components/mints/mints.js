import React, { useState } from 'react';
import { getMintsBySort } from '../../actions/mints';
import { useDispatch } from 'react-redux';

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
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Footer from '../common/footer';
import CalendarTodayIcon from '@mui/icons-material/AccessAlarm';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';


const Mints = ({ page }) => {
    const { mints, isLoading } = useSelector((state) => state.mints);
    const recentMints = mints.sort((a, b) => {return b.likes.length - a.likes.length})
    console.log('m', mints);

    console.log('rm', recentMints);
    const firstFourMints = mints.slice(0, 4);
    const secondFourMints = mints.slice(4, 200);
    const firstFourRecentMints = recentMints.slice(0, 4);
    const secondFourRecentMints = recentMints.slice(4, 200);
    let newDate = new Date();
    let today = newDate.getDate();
    let month = newDate.getMonth();
    const [sort, setSort] = useState('Upcoming');
    const dispatch = useDispatch();

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



    const handleFilterChange = (event) => {
        setSort(event.target.value);
      };

    if (!mints.length && !isLoading) return 'No mints';

    const RenderDefaultMints = () => {
        return (
            <div>
                <Box component="span" sx={{ p: 2, border: '2px red' }}>
                <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                </Grid>
                </Box>
                <br></br>
            </div>     


        )
    }

    const RenderLikedMints = () => {
        return (
            <div>
                    <Grid container spacing={3}>
                
                    </Grid>
                    <br></br>
            </div>     


        )
    }

    const RenderExploreMints = () => {
        return (
            <div>
                <div>
                    <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                    <div className="sub-divider-text">Vote On Other Upcoming Projects </div>
                    <Grid container spacing={3}>
                    {secondFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                    
                    </Grid>
                    <br></br>
            </div>     


        )
    }

    const RenderSelectButtons = () => {
        return (
        <ThemeProvider theme={theme}>
        <div className="center-on-mints">
        <Stack spacing={2} direction="row" sx={{ float: 'right' }}>
            {sort=='Upcoming' ? <Button className="sort-button" variant="contained" color="upcoming">Upcoming</Button> : (
                <Button onClick={() => {setSort('Upcoming')}} className="sort-button" variant="outlined" color="upcoming">Upcoming</Button>
            )}
            {sort=='Most Liked' ? <Button className="sort-button" variant="contained" color="mostLiked">Most Liked</Button> : (
                <Button onClick={() => {setSort('Most Liked')}} className="sort-button" color="mostLiked" variant="outlined">Most Liked</Button>
            )}
            {sort=='Explore' ? <Button className="sort-button" variant="contained" color="explore">Explore</Button> : (
                <Button onClick={() => {setSort('Explore')}} className="sort-button" variant="outlined" color="explore">Explore</Button>
            )}
        </Stack>
        </div>
        </ThemeProvider>
        );
    }
        
    return (
        
            isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
                <>
                    <div className="date-and-filters-container">
                        <div className="today-icon">
                            <Chip sx={{ marginBottom: '25px' }}label=" TOP UPCOMING MINTS " color="secondary" icon={<CalendarTodayIcon />} />
                        </div>
                        <div className="sort-selector-group">
                            {RenderSelectButtons()}
                        </div>
                    </div>
                    <div className="mints-container">
                    {sort=='Upcoming' && RenderDefaultMints()}
                    {sort=='Most Liked' && RenderLikedMints()}
                    {sort=='Explore' && RenderExploreMints()}
                    </div>
                </>
            )
    );
}

export default Mints;
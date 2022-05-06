import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayMints } from '../../actions/mints';
import '../mints/mints.css';
import Grid from '@mui/material/Grid';
import Mint from './mint/mint';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const TodayMints = ({ page, sort, setSort }) => {
    const { todayMints, isLoading } = useSelector((state) => state.mints);
    const firstFourMints = todayMints.slice(0, 4);
    const secondRealFourMints = todayMints.slice(4, 8);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodayMints());
    }, [dispatch]);

    return (
        isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
        <>
        <div>
            <div className="today-wrapper">
                <div className="chrono-text">Today</div>
                <Box component="span" sx={{ p: 2, border: '2px red' }}>
                <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </div>
            <div className="tomorrow-wrapper">
                <div className="chrono-text">Thursday</div>
                <Box component="span" sx={{ p: 2, border: '2px red' }}>
                <Grid container spacing={3}>
                    {secondRealFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </div>
            </div>
            </>
        ) 
    );

}

export default TodayMints;

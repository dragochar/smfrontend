import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMints } from '../../actions/mints';
import '../mints/mints.css';
import Grid from '@mui/material/Grid';
import Mint from './mint/mint';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { dayFromNumber } from '../common/dayFromNumber';


const LikedMints = ({ page, dao, AdminWallets, setSort }) => {
    var daoName = String(dao);
    const { mints, isLoading } = useSelector((state) => state.mints);
    const firstFourMints = mints.slice(0, 4);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMints(daoName, '1'));

    }, [dispatch]);



    return (
        isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
        <>
            <div>
             <div className="chrono-text-2">Most Liked Mints to Try And Get Whitelist For:</div>
                <Box component="span" sx={{ p: 2, border: '2px red' }}>
                <Grid container spacing={3}>
                    {firstFourMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallets={AdminWallets} />
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </div>
        </>
        ) 
    );

}

export default LikedMints;

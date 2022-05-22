import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayMints, getTomorrowMints, getTwoDaysMints } from '../../actions/mints';
import '../mints/mints.css';
import Grid from '@mui/material/Grid';
import Mint from './mint/mint';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const TodayMints = ({ page, dao, AdminWallets, setSort }) => {
    var daoName = String(dao);
    const { todayMints, tomorrowMints, twoDaysMints, isLoading } = useSelector((state) => state.mints);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTodayMints(daoName));
        dispatch(getTomorrowMints(daoName));
        dispatch(getTwoDaysMints(daoName));
    }, [dispatch]);

    if (todayMints.length===0) {setSort('Explore')}

    return (
        isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
        <>
        <div>
            <div className="today-wrapper">
                <div className="chrono-text">Today</div>
            </div>

                <Grid container spacing={3}>
                    {todayMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallets={AdminWallets} />
                        </Grid>
                    ))}
                </Grid>
            <div className="tomorrow-wrapper">
                <div className="chrono-text">Thursday</div>
            </div>
               <Grid container spacing={3}>
                    {tomorrowMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} />
                        </Grid>
                    ))}
                </Grid>
            <div className="two-days-wrapper">
                <div className="chrono-text">Friday</div>
            </div>
                {(twoDaysMints.length!==0) ? 
                <Grid container spacing={3}>
                    {twoDaysMints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallet={AdminWallets} />
                        </Grid>
                    ))}
                </Grid>
                :
                (
                <Typography variant="header2" sx={{ color: '#ffffff', fontWeight: 900 }}>
                    No Mints Available For This Day. Checkout Explore For More Mints!
                </Typography>
                )
                }
            </div>
            </>
        ) 
    );

}

export default TodayMints;

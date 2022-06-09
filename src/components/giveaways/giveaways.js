import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Giveaway from './giveaway';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import CheckGiveawayReq from './checkGiveawayReq';


const Giveaways = ({dao, AdminWallets, setSort, wallet, pageName }) => {
    const { giveaways, isLoading } = useSelector((state) => state.giveaways);


    if (giveaways.length===0) return <Typography variant="h5" color="white" sx={{fontWeight: 700}} >There Are No Whitelist Giveaways For Your DAO</Typography>;




    const RenderGiveaways = () => {
        return (
            <div>
                <div>
                    <Grid container spacing={3}>
                    {giveaways.map((giveaway) => (
                        <Grid item xs={6} sm={3} key={giveaway._id}>
                            <Giveaway giveaway={giveaway} wallet={wallet} AdminWallets={AdminWallets} />
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                    <br></br>
            </div>     


        )
    }



    return (  
        isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
            <>
                <div className="mints-container">
                <CheckGiveawayReq giveaways={giveaways} pageName={pageName} />
                {RenderGiveaways()}

                </div>
            </>
        )

    );
}

export default Giveaways;
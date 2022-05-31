import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Giveaway from './giveaway';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const Giveaways = ({dao, AdminWallets, setSort, wallet}) => {

    const { giveaways, isLoading } = useSelector((state) => state.giveaways);

    return <Typography variant="h5" color="white" sx={{fontWeight: 700}} >There Are No Whitelist Giveaways For Your DAO</Typography>;



    const RenderGiveaways = () => {
        return (
            <div>
                <div>
                    <Grid container spacing={3}>
                    {giveaways.map((giveaway) => (
                        <Grid item xs={6} sm={3} key={giveaway._id}>
                            <Giveaway giveaway={giveaway} wallet={wallet}/>
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
                {RenderGiveaways()}
                </div>
            </>
        )

    );
}

export default Giveaways;
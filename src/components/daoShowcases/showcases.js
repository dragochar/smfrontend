import React, { useState } from 'react';
import DAOShowcase from './daoShowcase';
import geckoLogo from '../../assets/ggsg.gif';
import bbaLogo from '../../assets/bitbearalpha.png';
import tDLogo from '../../assets/tD.png';
import Grid from '@mui/material/Grid';
import './showcases.css';



const Showcases = () => {

    const geckoLink = '/ggsg';
    const bbaLink = '/bitbearalpha';
    const tDLink = '/td';




    return (
        <>
            <div className="our-showcases-yo">
            <Grid container spacing={6}>
                <Grid item xs={6} sm={3}>
                    <DAOShowcase logo={geckoLogo} name='Galactic Gecko Space Garage' link={geckoLink} />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DAOShowcase logo={bbaLogo} name='Bit Bears / Alpha Alpha' link={bbaLink} />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <DAOShowcase logo={tDLogo} name='The Trust DAO' link={tDLink} />
                </Grid>

            </Grid>
            </div>

        </>
    );
}

export default Showcases;

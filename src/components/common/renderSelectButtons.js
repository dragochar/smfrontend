import React, { useEffect, useState } from 'react';
import '../mints/mints.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';




const RenderSelectButtons = ({ sort, setSort , pageName}) => {



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


    return (
        <ThemeProvider theme={theme}>
        <div className="center-on-mints">
        <Stack spacing={2} direction="row" sx={{ float: 'right' }}>
            {sort=='Upcoming' ? <Button className="sort-button" variant="contained" color="upcoming">Upcoming</Button> : (
                <Button onClick={() => {setSort('Upcoming')}} className="sort-button" variant="outlined" color="upcoming">Upcoming</Button>
            )}
            {sort=='Explore' ? <Button className="sort-button" variant="contained" color="mostLiked">Explore</Button> : (
                <Button onClick={() => {setSort('Explore')}} className="sort-button" color="mostLiked" variant="outlined">Explore</Button>
            )}
            {sort=='Giveaways' ? <Button className="sort-button" variant="contained" color="explore">Giveaways</Button> : (
                <Button onClick={() => {setSort('Giveaways')}} className="sort-button" variant="outlined" color="explore">Giveaways</Button>
            )}
        </Stack>
        </div>
    </ThemeProvider>
    );
}

export default RenderSelectButtons;
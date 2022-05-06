import React, { useEffect, useState } from 'react';
import '../mints/mints.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';




const RenderSelectButtons = ({ sort, setSort }) => {



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

export default RenderSelectButtons;
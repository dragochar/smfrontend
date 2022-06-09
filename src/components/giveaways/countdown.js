import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const Countdown = ({winTime, timeInHours, startTime}) => {

    const ourStartTime = new Date(startTime)
    const ourWinTime = new Date(winTime);
    const ourNowTime = new Date();

    const [timeLeft, setTimeLeft] = React.useState((ourWinTime - ourNowTime) / 36e5);

    const ourValue = (Math.round((timeLeft / timeInHours) * 100));

    let ourTextTime;

    if (timeLeft >= 1) {
        ourTextTime = Math.round(timeLeft);
        console.log(ourTextTime);

    }

    if (timeLeft < 1) {
        ourTextTime = Math.round(timeLeft * 60);
    }






    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={ourValue} sx={{ color: '#ffffff' }} />
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    {timeLeft>1 ? <Typography variant="caption" component="div" sx={{ color: '#ffffff' }}>
                        {`${ourTextTime}h`}
                    </Typography>
                    :
                    <Typography variant="caption" component="div" sx={{ color: '#ffffff' }}>
                        {`${ourTextTime}m`}
                    </Typography>
                    }
                    <br></br>
                </Box>
            </Box>

        </>
    );
}

export default Countdown;
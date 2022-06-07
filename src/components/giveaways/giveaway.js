import React, { useState, useEffect } from 'react';
import './giveaway.css';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import GiveawayDialog from './giveawayDialog';
import WinnersDialog from './winnersDialog';
import cx from 'clsx';
import Dialog from '@mui/material/Dialog';
import Countdown from './countdown';
import axios from 'axios';
import DetailContent from '../mints/MintDetail/mintdetail';



const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      boxShadow: 'none',
      borderRadius: 0,
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
  }));


const Giveaway = ({ giveaway, wallet, user }) => {
    const shadowStyles = useSoftRiseShadowStyles();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [winnerDialogOpen, setWinnerDialogOpen] = React.useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);
    const [alreadyVoted, setAlreadyVoted] = React.useState(false);
    const [mint, setMint] = React.useState(null);

    const numEntered = giveaway.entries.length;
    const winTime = new Date(giveaway.createdAt);
    winTime.setHours(winTime.getHours() + giveaway.timeInHours);
    console.log(winTime);
    const nowTime = new Date();

    const useStyles = makeStyles({
        root: {
        },
      });
    
    const styles = useStyles();

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleWinnerDialogOpen = () => {
      setWinnerDialogOpen(true);
    };

  const handleWinnerDialogClose = () => {
      setWinnerDialogOpen(false);
  };

  const handleDetailDialogOpen = async () => {
      setDetailDialogOpen(true);
      
    };

const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
};

function sleep (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}


    useEffect(() => {
      
      async function asyncFunction() {
        await axios.get(`https://daospot.herokuapp.com/mints/getMint/${giveaway.mintID}`)
        .then(async(response) => {
        setMint(response.data);
        })
        }

      asyncFunction();

      for (let i = 0; i < giveaway.entries.length; i++) {  
        if (giveaway.entries[i].includes(wallet)) {
          console.log(wallet);
          setAlreadyVoted(true); 
        }
      }

    }, []);

    const renderGiveawayActive = () => {

      return (
        <div>
           <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
            <CardActionArea onClick={handleDetailDialogOpen}>
            <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={giveaway.selectedFile} alt="Giveaway" />
            <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{giveaway.name}</Typography>
                <Typography variant="h5" color="white" sx={{fontWeight: 400}} >{giveaway.numSpots} Spots</Typography>
                <Typography variant="h6" color="white" sx={{fontWeight: 200}} >{numEntered-1} Entered</Typography>
            </CardContent>
            </CardActionArea>
            <CardContent>
                <div><Countdown winTime={winTime} timeInHours={giveaway.timeInHours} startTime={giveaway.createdAt} /></div>
                { !alreadyVoted ? <Button variant="contained" onClick={handleDialogOpen}>Enter Raffle</Button> : (
                  <Button variant="contained" color="success">Already Entered</Button> 
                )}
            </CardContent>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                fullWidth
                maxWidth='xl'
            >
                <GiveawayDialog giveaway={giveaway} setDialogOpen={setDialogOpen} wallet={wallet} setAlreadyVoted={setAlreadyVoted} />
            </Dialog>
            <Dialog
                open={detailDialogOpen}
                onClose={handleDetailDialogClose}
                fullWidth
                maxWidth='lg'
            >
                <DetailContent mint={mint} walletAddress={user.data.discordID} user={user} />
            </Dialog>
        </Card>
        </div>



      );


    }

    const renderGiveawayFinished = () => {


      return (
        <div>
            <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
              <CardActionArea onClick={console.log}>
              <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={giveaway.selectedFile} alt="Giveaway" />
              <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{giveaway.name}</Typography>
                <Typography variant="h5" color="white" sx={{fontWeight: 400}} >{giveaway.numSpots} Spots</Typography>
                <Typography variant="h6" color="white" sx={{fontWeight: 200}} >{giveaway.entries.length} Entered</Typography>
                <Button variant="contained" color="secondary" onClick={handleWinnerDialogOpen}>View Winners</Button>

              </CardContent>
              </CardActionArea>
              <Dialog
                open={winnerDialogOpen}
                onClose={handleWinnerDialogClose}
                fullWidth
                maxWidth='lg'
              >
                <WinnersDialog giveaway={giveaway} setDialogOpen={setWinnerDialogOpen} wallet={wallet} />
              </Dialog>
        </Card>

        </div>
      );
    }


    
    
    return (

      <div>

        {nowTime<winTime && renderGiveawayActive()}
        {nowTime>winTime && renderGiveawayFinished()}

       </div>

    );
}

export default Giveaway;
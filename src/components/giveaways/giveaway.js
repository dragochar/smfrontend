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
import cx from 'clsx';
import Dialog from '@mui/material/Dialog';


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


const Giveaway = ({ giveaway, wallet }) => {
    const shadowStyles = useSoftRiseShadowStyles();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alreadyVoted, setAlreadyVoted] = React.useState(false);



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


    useEffect(() => {
      for (let i = 0; i < giveaway.entries.length; i++) {  
        if (giveaway.entries[i].includes(wallet)) {
          setAlreadyVoted(true); 
        }
      }

    }, []);


    
    
    return (

        <div>
        <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
            <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={giveaway.selectedFile} alt="Giveaway" />
            <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{giveaway.name}</Typography>
                <Typography variant="h5" color="white" sx={{fontWeight: 400}} >{giveaway.numSpots} Spots</Typography>
                <Typography variant="h6" color="white" sx={{fontWeight: 200}} >{giveaway.entries.length} Entered</Typography>
                { !alreadyVoted ? <Button variant="contained" onClick={handleDialogOpen}>Enter Raffle</Button> : (
                  <Button variant="contained" color="success">Already Entered</Button> 
                )}
            </CardContent>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <GiveawayDialog giveaway={giveaway} setDialogOpen={setDialogOpen} wallet={wallet} />
            </Dialog>
        </Card>

    </div>

    );
}

export default Giveaway;
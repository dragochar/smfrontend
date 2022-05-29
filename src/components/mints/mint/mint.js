import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { HandThumbsUp, HandThumbsUpFill, HandThumbsDown, HandThumbsDownFill } from 'react-bootstrap-icons';
import { likeMint, dislikeMint } from '../../../actions/mints'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './mint.css';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import solanaLogo from '../../../assets/sol.svg';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DetailContent from '../MintDetail/mintdetail';
import EditContent from '../MintEdit/mintedit';
import AlertContent from '../MintAlert/mintalert';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, compareAsc } from 'date-fns'
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { createTheme, ThemeProvider } from '@mui/material/styles';



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


const family = 'Rubik';

const Mint = ({ mint, AdminWallets }) => {
    const shadowStyles = useSoftRiseShadowStyles();
    const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState(null);
    const [progressNow, setProgressNow] = useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [giveawayDialogOpen, setGiveawayDialogOpen] = React.useState(false);



    const checkIfWalletIsConnected = async () => {
        try {
          const { solana } = window;
    
          if (solana) {
            if (solana.isPhantom) {
              const response = await solana.connect({ onlyIfTrusted: true });

              setWalletAddress(response.publicKey.toString());
            }
          } else {
            alert('Solana object not found! Get a Phantom Wallet 👻');
          }
        } catch (error) {
          console.error(error);
        }
        //hi there
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        setProgressNow(((mint.likes.length)/((mint.likes.length)+(mint.dislikes.length))*100));

      }, []);

    const getLiked = () => {
      return mint.likes.includes(walletAddress)

    }
    

    const useStyles = makeStyles({
      root: {
      },
    });

  const styles = useStyles();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleGiveawayDialogOpen = () => {
    setGiveawayDialogOpen(true);
  };

  const handleGiveawayDialogClose = () => {
    setGiveawayDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const renderSupply = (mint) => (
    <Typography variant="body2" sx={{ color: '#14F195', fontWeight: 900 }}>{mint.supply} Supply</Typography>
  )

  const renderNullSupply = () => (
    <Typography variant="body2" sx={{ color: '#449c77', fontWeight: 900 }}>Supply TBA</Typography>
  )

  const renderPrice = (mint) => (
    <div className="votes-block">
      <Typography variant="body2" sx={{ color: '#14F195', fontWeight: 900 }}>{mint.price}&nbsp;</Typography>
      <img className="inline-logo" src={solanaLogo} alt="Sol" width="12" height="12"></img>
    </div>
  )

  const renderNullPrice = () => (
    <div className="votes-block">
      <Typography variant="body2" sx={{ color: '#449c77', fontWeight: 900 }}>Price TBA&nbsp;</Typography>
      <img className="inline-logo" src={solanaLogo} alt="Sol" width="12" height="12"></img>
    </div>
  )
  

  const Likes = () => {
    return mint.likes.find((like) => like === (walletAddress))
      ? (

        <><HandThumbsUpFill />&nbsp;{mint.likes.length}</>
      ) : (
        <><HandThumbsUp />&nbsp;{mint.likes.length}</>
      );
  }

  const Dislikes = () => {
    return mint.dislikes.find((dislike) => dislike === (walletAddress))

      ? (
        <><HandThumbsDownFill />&nbsp;{mint.dislikes.length}</>
      ) : (
        <><HandThumbsDown />&nbsp;{mint.dislikes.length}</>
      );
  }

  const changeRatioLike = () => {

    return mint.likes.find((like) => like === (walletAddress))
      ? (

        <>{setProgressNow(((mint.likes.length-1)/((mint.likes.length-1)+(mint.dislikes.length))*100))}</>
      ) : (
        <>{setProgressNow(((mint.likes.length+1)/((mint.likes.length+1)+(mint.dislikes.length))*100))}</>
      );
  }

  const changeRatioDislike = () => {
    return mint.dislikes.find((dislike) => dislike === (walletAddress))

      ? (
        <>{setProgressNow(((mint.likes.length)/((mint.likes.length)+(mint.dislikes.length-1))*100))}</>
      ) : (
        <>{setProgressNow(((mint.likes.length)/((mint.likes.length)+(mint.dislikes.length+1))*100))}</>
      );
  }


  const renderMintDate = () => {
    const theme = createTheme({
      palette: {
        mode: 'dark',
          date: {
              main: '#ffefed',
              contrastText: '#000000',
          },
          upcoming: {
            main: '#ff867c',
            contrastText: '#000000',
        },
      }
    });
    if (mint.mintDate===null) return (
        <ThemeProvider theme={theme}>
        <Chip label="Date TBA" icon={<CalendarMonthIcon />} color="date" variant="outlined" />
        </ThemeProvider>
    )

    let date = new Date(mint.mintDate.toString());
    const timezoneOffset = ((new Date()).getTimezoneOffset()/60);
    date.setTime(date.getTime() - timezoneOffset * 60 * 60 * 1000);
    let day = date.getDay();
    let formatDatePending = new Intl.DateTimeFormat("en-GB", {
      month: "long",
      day: "2-digit",
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)


    return (
    <ThemeProvider theme={theme}>
    <Chip label={formatDatePending} icon={<CalendarMonthIcon />} color="date" variant="outlined" />
    </ThemeProvider>
    )
  }

  const renderEditButton = (mint) => (
    <IconButton sx={{ color: "white", float: "right" }} aria-label="edit" onClick={handleEditDialogOpen}>
      <EditIcon />
    </IconButton>
  )

  const renderGiveawayButton = (mint) => (
    <IconButton sx={{ color: "white", float: "right" }} aria-label="giveaway" onClick={handleGiveawayDialogOpen}>
      <AddAlertIcon />
    </IconButton>
  )

    return (
        <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
          <CardActionArea onClick={handleDialogOpen}>
          
            <CardMedia sx={{ borderRadius: 5 }}component="img" height="200" image={mint.selectedFile} alt="mint" />
            <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{mint.name}</Typography>
                {/*<Typography variant="h5" color="white" sx={{fontWeight: 400}} >{mint.mintDate}</Typography>*/}
                {mint.price!=null && renderPrice(mint)} 
                {mint.price==null && renderNullPrice()} 
                {mint.supply!=null && renderSupply(mint)}
                {mint.supply==null && renderNullSupply()}
                {renderMintDate()}



                </CardContent>
                </CardActionArea>
                <div>{AdminWallets.includes(walletAddress) && renderEditButton(mint)}</div>
                <div>{AdminWallets.includes(walletAddress) && renderGiveawayButton(mint)}</div>
                <CardContent>
                <div className="votes-block">
                <IconButton size='small' color='primary' onClick={() => {
                  dispatch(likeMint(mint._id, walletAddress));
                  changeRatioLike();
                  }}>
                  <Likes />
                </IconButton>

                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <IconButton color="error" size='small' onClick={() => {
                  dispatch(dislikeMint(mint._id, walletAddress));
                  changeRatioDislike();
                  }}>
                  <Dislikes />
                </IconButton>
                </div>
                <ProgressBar now={progressNow} />
                    
            </CardContent>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
          >
            <DetailContent mint={mint} walletAddress={walletAddress} />
          </Dialog>
          <Dialog
            open={editDialogOpen}
            onClose={handleEditDialogClose}
          >
            <EditContent mint={mint} walletAddress={walletAddress} AdminWallets={AdminWallets} />
          </Dialog>
          <Dialog
            open={giveawayDialogOpen}
            onClose={handleGiveawayDialogClose}
          >
            <AlertContent mint={mint} walletAddress={walletAddress} AdminWallets={AdminWallets} setGiveawayDialogOpen={setGiveawayDialogOpen} />
          </Dialog>
        </Card>
    );
}

export default Mint;
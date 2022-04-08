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
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, compareAsc } from 'date-fns'
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

const Mint = ({ mint }) => {
    const shadowStyles = useSoftRiseShadowStyles();
    const dispatch = useDispatch();
    const [walletAddress, setWalletAddress] = useState(null);
    const [progressNow, setProgressNow] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [youLiked, setYouLiked] = React.useState(false);

    const day = Date.parse(mint.mintDate);

    const [likeLoading, setLikeLoading] = useState(false);


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

  const handleDialogClose = () => {
    setDialogOpen(false);
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
  

  const Likes = ({ setYouLiked }) => {
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

  const renderMintDate = () => {
    let date = new Date(mint.mintDate.toString());
    let day = date.getDay();
    let formatDate = new Intl.DateTimeFormat("en-GB", {
      month: "long",
      day: "2-digit"
    }).format(date)



    return (
    <Chip label={formatDate} icon={<CalendarMonthIcon />} variant="outlined" />
    )
  }

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
                {/*mint.mintDate && renderMintDate()*/}



                </CardContent>
                </CardActionArea>
                <CardContent>
                <div className="votes-block">
                <IconButton size='small' color='primary' onClick={() => {
                  dispatch(likeMint(mint._id, walletAddress));
                  setProgressNow(((mint.likes.length)/((mint.likes.length)+(mint.dislikes.length))*100));
                  }}>
                  <Likes />
                </IconButton>

                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <IconButton color="error" size='small' onClick={() => {
                  dispatch(dislikeMint(mint._id, walletAddress));
                  setProgressNow(((mint.likes.length)/((mint.likes.length)+(mint.dislikes.length))*100));
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
        </Card>
    );
}

export default Mint;
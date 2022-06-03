import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CardMedia from '@mui/material/CardMedia';
import './mintdetail.css';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import solanaLogo from '../../../assets/sol.svg';
import Divider from '@mui/material/Divider';
import discordLogo from '../../../assets/discord.svg';
import twitterLogo from '../../../assets/twitter.svg';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteMint } from '../../../actions/mints';
import AdminWallets from '../../../wallets/adminwallets';
import CommentSection from '../../comments/CommentSection';
import TwitterStats from '../../twitter/TwitterStats.js';





const DetailContent = ({ mint, walletAddress, user }) => {

  const dispatch = useDispatch();


  return (
    <div className="dialog">

        <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
          {mint.name}
        </DialogTitle>
        <div className="center">
        <CardMedia sx={{ borderRadius: 5, maxWidth: 300, maxHeight: 300, border: 1, marginLeft: 'auto', marginRight: 'auto'}} component="img" width="300" height="300" image={mint.selectedFile} alt="mint" />
        </div>
        <DialogContent sx={{ width: 600, maxWidth: 600 }}>

        <div className="links">
          <div className="votes-block">
            <img className="discord-inline-logo" src={discordLogo} alt="Discord" width="12" height="12"></img>
            <Link href={mint.discord} target="_blank">&nbsp;Discord</Link>
          </div>
          <div className="votes-block">
            <img className="twitter-inline-logo" src={twitterLogo} alt="Twitter" width="12" height="12"></img>
            <Link href={mint.twitter} target="_blank">&nbsp;Twitter</Link>
          </div>
        </div>
      


        <div className="votes-block">
          <Typography variant="body2" sx={{ color: '#e6e6e6', fontWeight: 900 }}>{mint.price}&nbsp;</Typography>
          <img className="inline-logo" src={solanaLogo} alt="Sol" width="12" height="12"></img>
        </div>
        <Typography variant="body2" sx={{ color: '#e6e6e6', fontWeight: 900 }}>{mint.supply} Supply</Typography>

        <div className="description-box">
          <DialogContentText sx={{ color: '#e6e6e6' }}>{mint.description}</DialogContentText>
        </div>

        <br></br>
          
        </DialogContent>
        <CommentSection mint={mint} walletAddress={walletAddress} user={user} />


    </div>
  );
}

export default DetailContent;
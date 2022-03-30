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
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteMint } from '../../../actions/mints';
import AdminWallets from '../../../wallets/adminwallets';





const DetailContent = ({ mint, walletAddress }) => {

  const dispatch = useDispatch();

  const renderDeleteButton = (mint) => (
    <IconButton color="info" aria-label="delete" onClick={()=>{dispatch(deleteMint(mint._id))}}>
      <DeleteOutlineIcon />
    </IconButton>
  )

  return (
    <div className="dialog">

        <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
          {mint.name}
        </DialogTitle>
        <div className="center">
        <CardMedia sx={{ borderRadius: 5, maxWidth: 300, maxHeight: 300, border: 1, marginLeft: 'auto', marginRight: 'auto'}} component="img" width="300" height="300" image={mint.selectedFile} alt="mint" />
        </div>
        <DialogContent sx={{ width: 550, maxWidth: 550 }}>

        <div className="links">
          <div className="votes-block">
            <img className="inline-logo" src={discordLogo} alt="Discord" width="12" height="12"></img>
            <Link href={mint.discord}>&nbsp;Discord</Link>
          </div>
          
        </div>


        <div className="votes-block">
          <Typography variant="body2" sx={{ color: '#e6e6e6', fontWeight: 900 }}>{mint.price}&nbsp;</Typography>
          <img className="inline-logo" src={solanaLogo} alt="Sol" width="12" height="12"></img>
        </div>
        <Typography variant="body2" sx={{ color: '#e6e6e6', fontWeight: 900 }}>{mint.supply} Supply</Typography>

        
          <DialogContentText sx={{ color: '#e6e6e6' }}>{mint.description}</DialogContentText>

        <br></br>
        {AdminWallets.includes(walletAddress) && renderDeleteButton(mint)}

          
        </DialogContent>

        <Divider />
        {/*<Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 900 }}>Comments</Typography>*/}


    </div>
  );
}

export default DetailContent;
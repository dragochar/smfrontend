import React, { useState } from 'react';
import { getMintsBySort, getMintsBySearch } from '../../actions/mints';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Mint from './mint/mint';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import "./mints.css";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Footer from '../common/footer';
import CalendarTodayIcon from '@mui/icons-material/AccessAlarm';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Pagination from '../pagination/Pagination';
import RenderSelectButtons from '../common/renderSelectButtons';
import TextField from '@mui/material/TextField';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Mints = ({ page, AdminWallets, dao, pageName  }) => {
    const { mints, isLoading } = useSelector((state) => state.mints);
    const { currentUser } = useSelector((state) => state.user);
    const query = useQuery();
    const history = useHistory();
    const currentPage = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    let newDate = new Date();


    const theme = createTheme({
        palette: {
            mode: 'dark',
            explore: {
                main: '#ffff6b',
                backgroundColor: 'fff666',
                contrastText: '#000000',
            },
        }
      });



    if (!mints.length && !isLoading) return 'No mints';

    const searchMint = () => {
        if(search.trim()) {
            dispatch(getMintsBySearch(search, dao, page));
            history.push(`/${pageName}?view=explore?searchQuery=${search || 'none'}`)
        }
    }

    const handleKeyPress = (e) => {
        console.log('key pressed');
        if (e.keyCode === 13) {
          searchMint();
        }
      };


    const RenderExploreMints = () => {
        return (
            <div>
                    <ThemeProvider theme={theme}>
                    <Grid item xs={12} sm={6} md={2}>
                    <div className="search-container">
                        <TextField
                            sx={{ display: 'inline-block', marginRight: "5px" }}
                            name="Search" 
                            variant="outlined" 
                            label="Search"
                            onKeyPress={handleKeyPress}
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <SearchIcon />
                            //         </InputAdornment>
                            //     )
                            // }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button sx={{ marginTop: "8px" }} className="search-button" onClick={searchMint} variant="contained" color="explore">Search</Button>
                        </div>
                    </Grid>
                    </ThemeProvider>
                <div>
                    <Grid container spacing={3}>
                    {mints.map((mint) => (
                        <Grid item xs={6} sm={3} key={mint._id}>
                            <Mint mint={mint} AdminWallets={AdminWallets} />
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                    
                    <br></br>
            </div>     


        )
    }

        
    return (
        
            isLoading ? <CircularProgress sx={{ color: '#14F195' }} /> : (
                <>
                    <div className="date-and-filters-container">

                    </div>
                    <div className="mints-container">
                    {RenderExploreMints()}

                    </div>
                </>
            )
    );
}

export default Mints;
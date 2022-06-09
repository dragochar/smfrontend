import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { updateInDiscord } from '../../actions/users';
import CircularProgress from '@mui/material/CircularProgress';
import '../../App.css';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function sleep (milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }



const CheckDiscord = () => {

    const dispatch = useDispatch();
    const query = useQuery();
    const code = query.get('code') || '';
    const { currentUser } = useSelector((state) => state.user);
    
    const history = useHistory();

    // We pass our 'code' to the backend
    //const userID = dispatch(getOrCreateUser(code));
    useEffect(async () => {

        try {
            await sleep(2000);
            while (currentUser.length > 0) {
            console.log(code, "and", currentUser)
            let userData = await dispatch(updateInDiscord(code, currentUser._id));
            await sleep(600);
            console.log(userData);

            try {
                history.push('/');
            } catch (error) {
                console.log(error);
            }
        }

        } catch (error) {
            console.log(error);
        }

    }, []);

    return (
        <div className="App">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <CircularProgress sx={{ color: '#14F195' }} />
    </div>
    );
}

export default CheckDiscord;
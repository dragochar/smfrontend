import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getUser } from '../../actions/users';
import CircularProgress from '@mui/material/CircularProgress';
import '../../App.css';






function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function sleep (milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }



const Auth = () => {
    // This page will be accessed only via redirect when clicking on 'Sign In With Discord'
    // Once authorized and sent here, discord will issue a 'code' query parameter we can use
    // to get the access_token which in turn gives details of the current user
    const dispatch = useDispatch();
    const query = useQuery();
    const code = query.get('code') || '';
    const { user, isLoading } = useSelector((state) => state.user);
    const history = useHistory();


    // We pass our 'code' to the backend
    //const userID = dispatch(getOrCreateUser(code));
    useEffect(async () => {

        try {
            let userData = await dispatch(getUser(code));
            console.log('auth returned', userData);
            await sleep(600);
            console.log(userData);
            try {
                dispatch({ type: 'AUTH', data: userData });
                history.push('/');
            } catch (error) {
                console.log(error);
            }



        } catch (error) {
            console.log(error);
        }

    }, []);



    return(
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

export default Auth;
import React, { useEffect, useState } from 'react';
import { getTwitterStats } from '../../actions/twitter';
import { useDispatch, useSelector } from 'react-redux';




const TwitterStats = ({}) => {

    const { twitterStats } = useSelector((state) => state.twitter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTwitterStats('zacyungblut'));

    }, [dispatch]);

    return(
        <>
            {console.log('testingyo', twitterStats)}
        </>
    );

}

export default TwitterStats;
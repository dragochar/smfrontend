import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, BrowserRouter } from 'react-router-dom';
import { getMints } from '../../actions/mints';

import useStyles from './styles';

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={5}
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/mints?page=${1}`} />
            )}
        />
    )
}

export default Paginate;
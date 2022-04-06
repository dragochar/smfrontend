import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, BrowserRouter } from 'react-router-dom';
import { getMints } from '../../actions/mints';

import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.mints);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (page) {
            dispatch(getMints(page));
            console.log("got mints");
        }
    }, [dispatch, page]);

    return (
        <div>
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/mints?page=${item.page}`} />
            )}
        />

        </div>
    );
};

export default Paginate;
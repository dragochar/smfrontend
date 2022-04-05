import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, BrowserRouter } from 'react-router-dom';

import useStyles from './styles';

const Paginate = () => {
    const classes = useStyles();


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
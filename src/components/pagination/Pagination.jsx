import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, BrowserRouter } from 'react-router-dom';
import { getMints } from '../../actions/mints';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import useStyles from './styles';


const theme = createTheme({
    palette: {
      primary: {
          main: '#14F195'
      },
    },
});

const Paginate = ({ page }) => {
    const { numberOfPages, isLoading } = useSelector((state) => state.mints);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (page) {
            dispatch(getMints(page));
        }
    }, [dispatch, page]);

    if (isLoading) return (<div></div>);

    return (
        <div>
        <ThemeProvider theme={theme}>
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            showFirstButton 
            showLastButton
            sx= {{
                borderColor: 'rgb(41, 53, 76)',
            }}
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} color='primary' component={Link} to={`/caa?page=${item.page}`} sx= {{
                    color: 'white',
                    borderColor: 'rgb(41, 53, 76)',
                }}

                />
            )}
        />
        </ThemeProvider>
        </div>
    );
};

export default Paginate;
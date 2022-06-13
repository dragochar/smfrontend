import React, { useState, useEffect } from 'react';
import Form from '../form/form';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getOldMints } from '../../actions/mints';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import './admin.css';


const Admin = ({ dao }) => {
    const dispatch = useDispatch();
    const [func, setFunc] = useState('');
    const { oldMints } = useSelector((state) => state.mints);
    const [rows, setRows] = useState([]);


    const theme = createTheme({
        palette: {
            create: {
                main: '#64ffda',
                contrastText: '#000000',
            },
            past: {
                main: '#fff59d',
                contrastText: '#000000',
            },
        }
      });
    
      const theme2 = createTheme({
        palette: {
            mode: "dark"
        }
      });
    
    const clickCreate = () => {
        setFunc('Create');
    }
    const clickPast = () => {
        setFunc('Past');
        let foundRows = [];
        const ourMints = oldMints.data;
        for (let i=0; i<ourMints.length; i++) {
            foundRows.push({
                id: i+1,
                name: ourMints[i].name,
                price: ourMints[i].price,
                supply: ourMints[i].supply,
                likes: ourMints[i].likes.length,
                dislikes: ourMints[i].dislikes.length,
                twitter: ourMints[i].twitter,
                mintDate: ourMints[i].mintDate,
            })
        }
        setRows(foundRows);



    }

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 200,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Mint Price',
          width: 90,
          editable: true,
        },
        {
          field: 'supply',
          headerName: 'Supply',
          width: 90,
          editable: true,
        },
        {
            field: 'likes',
            headerName: 'Likes',
            width: 100,
            editable: true,
        },
        {
            field: 'dislikes',
            headerName: 'Dislikes',
            width: 100,
            editable: true,
        },
        {
            field: 'twitter',
            headerName: 'Twitter',
            width: 230,
            editable: true,
        },
        {
            field: 'mintDate',
            headerName: 'Mint Date',
            width: 200,
            editable: true,
        },
      ];

    

    const renderPastMints = () => {

        return (
        <> 
            <ThemeProvider theme={theme2}>
            <div style={{ height: 700, width: '100%' }}>
            <DataGrid 
                rows={rows}
                columns={columns}
                //pageSize={100}
                rowsPerPageOptions={[100]}
                checkboxSelection
                disableSelectionOnClick
            />
            </div>
            </ThemeProvider>
            <br></br>
            <br></br>

        </>
        );
    }



    useEffect(() => {
        dispatch(getOldMints(dao));
    
    }, [])
    


    return (
        <>
            <h2 style={{ color:'azure', fontWeight: '700' }}>Admin Zone</h2>
            <div className="center">
            <ThemeProvider theme={theme}>
                <Stack spacing={2} direction="row">
                    {func=='Create' ? <Button className="sort-button" variant="contained" color="create">Create</Button> : (
                        <Button onClick={() => {clickCreate()}} className="sort-button" variant="outlined" color="create">Create</Button>
                    )}
                    {func=='Past' ? <Button className="sort-button" variant="contained" color="past">View Past Mints</Button> : (
                        <Button onClick={() => {clickPast()}} className="sort-button" color="past" variant="outlined">View Past Mints</Button>
                    )}
                </Stack>
            </ThemeProvider>
            </div>
            {func==='Create' ? <Form dao={dao} /> : (<><br></br><br></br></>)}
            {func==='Past' && renderPastMints()}
            {console.log('adminyo', oldMints)}

        </>
    );
}

export default Admin;


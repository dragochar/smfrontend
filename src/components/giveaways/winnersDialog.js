import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CakeIcon from '@mui/icons-material/Cake';
import { DataGrid } from '@mui/x-data-grid';
import './giveaway.css';
import Typography from '@mui/material/Typography';



const WinnersDialog = ({ giveaway, setDialogOpen, wallet }) => {

    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            input: {
                main: '#ffffff',
                darker: '#ffffff',
                contrastText: '#ffffff',
            },
        }
    });

    const columns = [
        { field: 'id', headerName: '#', width: 90, hide: true },
        {
          field: 'userName',
          headerName: 'Discord',
          width: 200,
          editable: true,
        },
        {
          field: 'twitter',
          headerName: 'Twitter',
          width: 150,
          editable: true,
          hide: true,
        },
        {
          field: 'wallet',
          headerName: 'Wallet',
          width: 500,
          editable: true,
          hide: true,
        },
      ];


    useEffect(() => {
        let foundRows = [];
        for (let i=0; i<giveaway.winners.length; i++) {
            foundRows.push({
                id: i+1,
                userName: `<@${giveaway.winners[i][0]}>`,
                twitter: giveaway.winners[i][1],
                wallet: giveaway.winners[i][2],
            })
            setRows(foundRows);
            console.log(foundRows);

        }

    }, []);

    


    const rows2 = [
        { id: 1, userName: 'Snow', twitter: 'Jon', wallet: '35' },
        { id: 2, userName: 'Lannister', twitter: 'Cersei', wallet: '42' },
        { id: 3, userName: 'Lannister', twitter: 'Jaime', wallet: '45' },
        { id: 4, userName: 'Stark', twitter: 'Arya', wallet: '16' },
        { id: 5, userName: 'Targaryen', twitter: 'Daenerys', wallet: 'nu' },
        { id: 6, userName: 'Melisandre', twitter: 'yo', wallet: '15' },
        { id: 7, userName: 'Clifford', twitter: 'Ferrara', wallet: '44' },
        { id: 8, userName: 'Frances', twitter: 'Rossini', wallet: '36' },
        { id: 9, userName: 'Roxie', twitter: 'Harvey', wallet: '65' },
    ];





    return(
        <div className="dialog">
            <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
                Winners of {giveaway.name}!
            </DialogTitle>

           


            <ThemeProvider theme={theme}>
                <div style={{ height: 400, width: '100%' }}>
                {rows.length>1 ?
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    checkboxSelection
                    disableSelectionOnClick
                />
                : (<></>)
                }
                </div>

            </ThemeProvider>
        </div>
    );
}

export default WinnersDialog;
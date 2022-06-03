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


const WinnersDialog = ({ giveaway, setDialogOpen, wallet }) => {

    const dispatch = useDispatch();

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
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];


    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];





    return(
        <div className="dialog">
            <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
                Winners of {giveaway.name}!
            </DialogTitle>


            <ThemeProvider theme={theme}>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    rows={rows} 
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
                </div>

                <Button fullWidth variant="contained" color="info" endIcon={<CakeIcon />}>
                    Enter
                </Button>
            </ThemeProvider>
        </div>
    );
}

export default WinnersDialog;
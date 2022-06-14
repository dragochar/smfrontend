import React, { useState, useEffect } from 'react';
import Form from '../form/form';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getOldMints, updateMintSymbol } from '../../actions/mints';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from '@mui/material/DialogTitle';
import SymbolDemo from '../../assets/symbol_demo.png';
import Dialog from '@mui/material/Dialog';
import './admin.css';


const Admin = ({ dao }) => {
    const dispatch = useDispatch();
    const [func, setFunc] = useState('');
    const { oldMints } = useSelector((state) => state.mints);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentSymbol, setCurrentSymbol] = useState('');
    const [currentMintID, setCurrentMintID] = useState('');

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }


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
            var dayOfMint = new Date(ourMints[i].mintDate);
            var datestring = dayOfMint.getDate()  + "/" + (dayOfMint.getMonth()+1) + "/" + dayOfMint.getFullYear();
            let fpString = ourMints[i].floorPrice;
            if (typeof(ourMints[i].floorPrice)!=="undefined") {fpString=`◎ ${ourMints[i].floorPrice}`}
            let profitString = '';
            let profitValue = (Math.round((ourMints[i].floorPrice - ourMints[i].price)* 100)/100);
            let percentCalcValue;
            let percentString;
            //here we calculate the percentage change from floor price
            if (ourMints[i].floorPrice > ourMints[i].price) {
                percentCalcValue = Math.round((((ourMints[i].floorPrice / ourMints[i].price)*100)*100)/100);
                percentString = `(+${percentCalcValue}%)`;
            }
            else if (ourMints[i].floorPrice < ourMints[i].price) {
                percentCalcValue = Math.round(((((ourMints[i].floorPrice - ourMints[i].price) / ourMints[i].price)*100)*100)/100);
                percentString = `(${percentCalcValue}%)`;
            } else {
                percentCalcValue=0;
                percentString = `(+${percentCalcValue}%)`;
            }

            if (typeof(ourMints[i].floorPrice)!=="undefined" && typeof(ourMints[i].price)!=="undefined") {
                profitString=`◎ ${profitValue} ${percentString}`
            }
            let volumeValue = '';
            if (typeof(ourMints[i].volumeAll)!=="undefined") {
                volumeValue = (Math.round((ourMints[i].volumeAll)*100)/100);
            }
            let avgSaleValue = '';
            if (typeof(ourMints[i].avgPrice24hr)!=="undefined") {
                avgSaleValue = (Math.round((ourMints[i].avgPrice24hr)*100)/100);
            }

            foundRows.push({
                id: i+1,
                _id: ourMints[i]._id,
                name: ourMints[i].name,
                price: ourMints[i].price,
                supply: ourMints[i].supply,
                likes: ourMints[i].likes.length,
                dislikes: ourMints[i].dislikes.length,
                twitter: ourMints[i].twitter,
                mintDate: datestring,
                symbol: ourMints[i].symbol,
                profit: profitString,
                floorPrice: fpString,
                listedCount: ourMints[i].listedCount,
                volumeAll: volumeValue,
                avgPrice24hr: avgSaleValue,
            })
        }
        setRows(foundRows);



    }

    const columns = [
        { field: 'id', headerName: '#', width: 90 },
        { field: '_id', headerName: '_id', width: 10, hide: true },
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
            width: 100,
            editable: true,
        },
        {
            field: 'symbol',
            headerName: 'Symbol',
            width: 100,
            hide: true,
        },
        {
            field: "addSymbol",
            headerName: "Add ME",
            sortable: false,
            renderCell: (params) => {
                const api = params.api;
                const nowRow = {};
                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                    (c) => (nowRow[c.field] = params.getValue(params.id, c.field))
                );
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api = params.api;
                const thisRow = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
        
                //return alert(JSON.stringify(thisRow, null, 4));
                //open dialog with this as props
                setCurrentMintID(thisRow._id)
                setOpen(true);
              };
            {console.log(nowRow)}
            if(typeof(nowRow.symbol)==="undefined") return <Button variant="contained" onClick={onClick}>Add</Button>
            if(typeof(nowRow.symbol)!=="undefined") return (
                <Button variant="contained" color="success" onClick={onClick}>Edit</Button>
            );

            }
          },
          {
            field: 'floorPrice',
            headerName: 'Floor Price',
            width: 100,
            editable: true,
            },
          {
            field: 'profit',
            headerName: 'Profit',
            width: 170,
            editable: true,
            },
            {
                field: 'listedCount',
                headerName: 'Listed Count',
                width: 100,
                editable: true,
            },
            {
                field: 'volumeAll',
                headerName: 'Volume',
                width: 150,
                editable: true,
            },
            {
                field: 'avgPrice24hr',
                headerName: '24h Avg Price',
                width: 150,
                editable: true,
            },
      ];

      function AddSymbolDialog() {

        const submit = async () => {
            if (currentSymbol.trim()) {
                await dispatch(updateMintSymbol(currentMintID, currentSymbol))
                await dispatch(getOldMints(dao));
                handleDialogClose();
            }
        }

        return(
            <div className="dialog">
                <DialogTitle sx={{ fontSize: 30, fontWeight: 700, color: "white" }}>
                    Add/Edit this mint's MagicEden Name
                </DialogTitle>
                <div className="center-in-dialog">
                <img alt="demo" src={SymbolDemo} width='800' height='200'></img>
                </div>
                <ThemeProvider theme={theme2}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">MagicEden Name</InputLabel>
                        <OutlinedInput
                            variant="outlined" 
                            label="MagicEden name"
                            required={true}
                            fullWidth
                            value={currentSymbol}
                            onChange={(e) => setCurrentSymbol(e.target.value)}
                        />
                </FormControl>
                </ThemeProvider>
                <Button variant="contained" onClick={submit}>Save</Button>
            </div>
        );
      }

    

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
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth
                maxWidth='md'
            >
                <AddSymbolDialog />
            </Dialog>
            {func==='Create' ? <Form dao={dao} /> : (<><br></br><br></br></>)}
            {func==='Past' && renderPastMints()}

        </>
    );
}

export default Admin;


import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { useHistory } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import cx from 'clsx';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';

import '../mints/mint/mint.css';





const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      boxShadow: 'none',
      borderRadius: 0,
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
  }));




const DAOShowcase = ({logo, name, link}) => {

    const shadowStyles = useSoftRiseShadowStyles();


    const history = useHistory();


    const useStyles = makeStyles({
        root: {
        },
      });
    
    const styles = useStyles();

    
    const routeChange = () => { 
        let path = link; 
        console.log(path);
        history.push(path);
    }

  


    return (
        <div>
            <Card className={cx(styles.root, shadowStyles.root)} sx={{ maxWidth: 345, borderColor: '#2b384e', borderRadius: 5, backgroundColor: 'rgba(240, 248, 255, 0)' }} variant="outlined">
                <CardActionArea onClick={routeChange}>
                    <CardMedia sx={{ borderRadius: 5 }}component="img" height="260" image={logo} alt="DAO Showcase" />
                    <CardContent className="card-content" sx={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
                        <Typography variant="h5" color="white" sx={{fontWeight: 700}} >{name}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


        </div>
    );
}

export default DAOShowcase;
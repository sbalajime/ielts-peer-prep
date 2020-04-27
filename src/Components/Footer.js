import React from 'react';
import { AppBar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
        textAlign: 'center'
    }
});



const FooterComponent = () => {
    const classes = useStyles();
    return (<AppBar position="static">
        <Typography variant="h6" className={classes.title}>
            IELTS Peer Prep
    </Typography>
    </AppBar>)
}

export default FooterComponent
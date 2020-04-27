import React from 'react';
import { AppBar, Typography, makeStyles, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: 12,
        padding: theme.spacing(1)
    }
}));



const FooterComponent = () => {
    const classes = useStyles();
    return (<AppBar position="static">
        <Typography variant="h6" component="p" className={classes.title}>
            Built by <a href="https://sbalaji.me">Balaji</a> and <a href="https://github.com/srivishnuc">Sri Vishnu</a>
        </Typography>
    </AppBar>)
}

export default FooterComponent
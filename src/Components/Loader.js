import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        //display: 'flex',
        //flexGrow: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //'& > * + *': {
        //    marginLeft: theme.spacing(2),
        //},
        position: 'fixed',
        left: '50%',
        top: '50%'
    }
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default Loader;
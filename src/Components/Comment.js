import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    author: {
        textAlign: 'right',
        fontSize: '15px',
        fontWeight: 'bold'
    }
}));

const Comment = (props) => {
    const { value, fullName } = props;
    const classes = useStyles();
    return (<Paper elevation={3} className={classes.wrapper}>
        <Box><Typography component="p">{value}</Typography>
            <Typography component="p" className={classes.author}>{fullName}</Typography>
        </Box></Paper>)
}



export default Comment;
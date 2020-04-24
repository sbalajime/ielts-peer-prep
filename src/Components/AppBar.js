import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '../Components/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
        textAlign: 'center'
    }
});



const AppBarComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleLogout = () => {

        localStorage.removeItem('token');
        history.push('/');

    }
    return (<AppBar position="static">
        <Toolbar>
            <Drawer history={history} />
            <Typography variant="h6" className={classes.title}>
                IELTS Peer Prep
    </Typography>
            <Tooltip title="Logout" aria-label="logout" arrow><Button color="inherit" onClick={handleLogout}><ExitToAppIcon fontSize="large" /></Button></Tooltip>

        </Toolbar>
    </AppBar>)
}

export default AppBarComponent
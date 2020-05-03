import React from 'react';
import '../App.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import CONSTANTS from '../constants';
import { putData } from '../Utils/Api';
import SnackBar from '../Components/SnackBar';




const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
            height: '60px'
        }, [theme.breakpoints.down('md')]: {
            '& > *': {
                margin: theme.spacing(1),
                width: '30ch',
                height: '40px'
            }
        },
    },
    button: {
        width: 'auto', textAlign: 'center'
    }
});




class Login extends React.Component {

    constructor() {
        super()
        this.state = { email: "", password: "", error: {}, showSnackBar: false, snackBarMsg: '', snackBarType: '' }
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState({ [id]: value, error: { [id]: false } })
    }

    handleLoginResp = (resp) => {
        if (resp.status == 'success') {
            const { data } = resp;

            if (data) {
                localStorage.setItem('token', data);
                this.setState({ email: "", password: "" });
                this.props.history.push('/')
            }
        } else if (resp.status == 'failed') {
            this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'error' });
        } else {
            this.setState({ showSnackBar: true, snackBarMsg: 'Issue with server!', snackBarType: 'error' });
        }

    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ apiError: false, apiErrMessage: '', showSnackBar: false });
    }

    handleClick = () => {
        const { email, password, error } = this.state;
        let isValidEmail = email.trim() && CONSTANTS.EMAIL_REGEX.test(email);
        if (!isValidEmail && !password.trim()) {
            this.setState({ error: { password: true, email: true } });
        } else if (!isValidEmail) {
            this.setState({ error: { email: true } })
        } else if (!password.trim()) {
            this.setState({ error: { ...error, password: true } });
        } else {
            putData(`/user/login`, { email, password }, this.handleLoginResp);
        }
    }

    render() {

        const { email, password, error: { email: emailError, password: passError }, showSnackBar, snackBarMsg, snackBarType } = this.state;
        const { classes } = this.props;
        return (
            <Box display="flex">
                <Grid container spacing={0} alignItems="center"
                    justify="center"
                    style={{ minHeight: "100vh" }}>
                    <Grid item lg={8} md={6} sm={4} xs={1}>
                        <div />
                    </Grid>
                    <Grid item lg={4} md={6} sm={8} xs={11} >
                        <Box height="auto" my="auto" mr={4}>
                            <Paper elevation={3} >
                                <Box display="flex" flexDirection="column" bgcolor="background.paper" p={5} alignItems="center" textAlign="center">
                                    <Typography variant="h4" gutterBottom>
                                        Login
                                    </Typography>
                                    <form className={classes.root} noValidate autoComplete="off">
                                        <TextField type="email" id="email" label="Email" variant="outlined" helperText={emailError ? "Please enter a valid email" : ""} error={emailError} size="small" value={email} onChange={this.handleChange} />
                                        <TextField type="password" id="password" label="Password" variant="outlined" helperText={passError ? "Please enter a password" : ""} error={passError} size="small" value={password} onChange={this.handleChange} />
                                        <div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" classes={{ root: classes.button }} onClick={this.handleClick}>Login</Button></div>
                                    </form>
                                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                                        <Typography>
                                            Create a new account
                                        </Typography>
                                    </Link>
                                    <SnackBar open={showSnackBar} autoHideDuration={5000} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        )
    }
}


export default withStyles(useStyles)(Login)
import React from 'react';
import '../App.css'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CONSTANTS from '../constants';
import { postData } from '../Utils/Api';
import Loader from '../Components/Loader'
import SnackBar from '../Components/SnackBar';


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
            height: '60px'
        },
        [theme.breakpoints.down('md')]: {
            '& > *': {
                margin: theme.spacing(1),
                width: '30ch',
                height: '40px'
            }
        },
    },
    button: {
        width: 'auto', textAlign: 'center', marginTop: 20
    }
});


class Signup extends React.Component {

    constructor() {
        super()
        this.state = { email: "", password: "", rpass: "", fullName: "", error: {}, apiError: false, apiErrMessage: '', loading: false }
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState({ [id]: value })
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackBar: false });
    }

    handleSignupResp = (resp) => {
        this.setState({ loading: false }, () => {
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
        })
    }

    handleClick = () => {
        let { email, password, rpass, fullName, error } = this.state;
        email = email.trim();
        password = password.trim();
        rpass = rpass.trim();
        fullName = fullName.trim();
        let isValidEmail = email.trim() && CONSTANTS.EMAIL_REGEX.test(email);
        if (!isValidEmail && !password.trim() && !rpass.trim()) {
            this.setState({ error: { password: true, email: true, rpass: true } });
        } else if (!isValidEmail) {
            this.setState({ error: { email: true } })
        } else if (!password.trim()) {
            this.setState({ error: { ...error, email: false, password: true } });
        } else if (password !== rpass) {
            this.setState({ error: { ...error, email: false, password: false, rpass: true } });
        } else if (!fullName) {
            this.setState({ error: { email: false, password: false, rpass: false, fullName: true } });
        } else {
            this.setState({ error: {}, loading: true }, () => {
                postData(`/user/`, { email, password, fullName }, this.handleSignupResp);
            })

        }
    }


    render() {

        const { email, password, rpass, showSnackBar, snackBarMsg, snackBarType, fullName, error: { email: errEmail, password: errPassword, rpass: errRpass, fullName: errFullName }, loading } = this.state;
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
                                {loading ? <Loader /> : <Box display="flex" flexDirection="column" bgcolor="background.paper" p={5} alignItems="center" textAlign="center">
                                    <Typography variant="h4" gutterBottom>
                                        SignUp
                                    </Typography>
                                    <form className={classes.root} noValidate autoComplete="off">
                                        <TextField type="text" id="fullName" label="Name" variant="outlined" size="small" error={errFullName} helperText={errFullName ? "Enter Full Name" : ""} value={fullName} onChange={this.handleChange} />
                                        <TextField type="email" id="email" label="Email" variant="outlined" size="small" error={errEmail} helperText={errEmail ? "Enter email" : ""} value={email} onChange={this.handleChange} />
                                        <TextField type="password" id="password" label="Password" variant="outlined" size="small" error={errPassword} helperText={errPassword ? "Enter Password" : ""} value={password} onChange={this.handleChange} />
                                        <TextField type="password" id="rpass" label="Confirm Password" variant="outlined" size="small" error={errRpass} helperText={errRpass ? "Enter the same password as above" : ""} value={rpass} onChange={this.handleChange} />
                                        <div style={{ marginTop: 20, width: '100%' }}><Button onClick={this.handleClick} variant="contained" color="primary" classes={{ root: classes.button }}>Signup</Button></div>
                                    </form>
                                    <Link to="/login" style={{ textDecoration: 'none', marginTop: 20 }}>
                                        <Typography>
                                            Already have an account
                                </Typography>
                                    </Link>
                                </Box>}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <SnackBar open={showSnackBar} autoHideDuration={5000} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
            </Box >
        )
    }
}


export default withStyles(useStyles)(Signup)
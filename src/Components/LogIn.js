import React from 'react';
import '../App.css'
import Homeimg from './HomeImg.js'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
            height: '40px'
        },
    },
    button: {
        width: 'auto', textAlign: 'center', marginTop: 20
    }
});


class Login extends React.Component {

    constructor() {
        super()
        this.state = { email: "", pass: "", rpass: "", batch: "" }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

        const { email, pass, rpass } = this.state;
        const { classes } = this.props;

        return (
            <Box display="flex" bgcolor="background.paper">
                <Homeimg />
                <Box height="auto" my="auto" width="30vw" mr={4}>
                    <Paper elevation={3} >
                        <Box display="flex" flexDirection="column" bgcolor="background.paper" p={5} alignItems="center" textAlign="center">
                            <Typography variant="h4" gutterBottom>
                                Login
                            </Typography>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="email" label="Email" variant="outlined" size="small" value={email} onChange={this.handleChange} />
                                <TextField id="password" label="Password" variant="outlined" size="small" value={pass} onChange={this.handleChange} />
                                <Button variant="contained" color="primary" classes={{ root: classes.button }}>Login</Button>
                            </form>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                <Typography>
                                    Create a new account
                                </Typography>
                            </Link>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        )
    }
}


export default withStyles(useStyles)(Login)
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

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
            height: '40px'
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
        this.state = { email: "", password: "" }
    }

    handleChange = (e) => {
        const { id, value } = e.target
        this.setState({ [id]: value })
    }

    handleClick = () => {
        const { email, password } = this.state
        fetch(`http://localhost:5000/user/login`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(result => {
                {
                    console.log(result)
                    this.setState({ email: "", password: "" })
                    //this.props.history.push('/write')
                }
            })
    }

    render() {

        const { email, pass } = this.state;
        const { classes } = this.props;
        let a = 0;
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
                                        <TextField type="email" id="email" label="Email" variant="outlined" size="small" value={email} onChange={this.handleChange} />
                                        <TextField type="password" id="password" label="Password" variant="outlined" size="small" value={pass} onChange={this.handleChange} />
                                        <div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" classes={{ root: classes.button }} onClick={this.handleClick}>Login</Button></div>
                                    </form>
                                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                                        <Typography>
                                            Create a new account
                                </Typography>
                                    </Link>
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
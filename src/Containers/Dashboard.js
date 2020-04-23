import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    card: {
        width: 'auto',
        padding: theme.spacing(3),
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    }, form: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1)
        }
    },
    button: {
        width: 'auto', textAlign: 'center'
    },
    taskSelector: {
        width: 200
    },
    essayCard: {
        width: 275,
    }, menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
});

class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Box bgcolor="primary.main" display="flex" minHeight="100vh" flexDirection="column">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
          </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Paper elevation={3} className={classes.card}>
                    <div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" onClick={() => { this.props.history.push('/write') }}>Write</Button></div>
                    <div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" onClick={() => { this.props.history.push('/review') }}>Review</Button></div>
                    <Card className={classes.essayCard}>
                        <CardContent>

                            <Typography component="h6">
                                Write about the following topic:
                                Using a computer every day can have more negative than positive effects on your children.
                                Do you agree or disagree?
                                Give reasons for your answer and include any relevant examples from your own knowledge or experience.
        </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Balaji S
        </Typography>
                            <Typography variant="body2" component="p">
                                24/04/2020
          <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Box >)
    }
}


export default withStyles(useStyles)(Dashboard);
import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '../Components/AppBar';

import EssayCard from '../Components/EssayCard';

import { getData } from '../Utils/Api';


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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',

        },
        '& > *': {
            margin: theme.spacing(1)
        }
    }
});


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essays: []
        }
    }
    componentDidMount() {
        getData('/essay', this.handleEssays)
    }

    handleEssays = (res) => {
        console.log('res', res)
        if (res.status === 'success') {
            this.setState({ essays: res.rows })
        }
    }
    render() {
        const { classes } = this.props;
        const { essays } = this.state
        return (
            <Box bgcolor="primary.main" display="flex" minHeight="100vh" flexDirection="column">
                <AppBar />
                <Paper elevation={3} className={classes.card}>
                    <Box className={classes.cardContainer}>
                        {essays.map((essay, index) => <EssayCard key={index} {...essay} />)}
                    </Box>
                </Paper>
            </Box >)
    }
}


export default withStyles(useStyles)(Dashboard);
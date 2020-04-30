import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import Loader from '../Components/Loader';

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
        display: 'flex', flexDirection: 'column',
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
            essays: [], loading: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true }, () => getData('/essay', this.handleEssays));

    }

    handleEssays = (res) => {
        this.setState({ loading: false }, () => {
            if (res.status === 'success') {
                this.setState({ essays: res.rows })
            }
        })

    }
    render() {
        const { classes } = this.props;
        const { essays, loading } = this.state;

        return (
            <Box bgcolor="primary.main" display="flex" minHeight="100vh" flexDirection="column">
                <AppBarComponent />

                <Paper elevation={3} className={classes.card}>
                    {loading ? <Loader /> : <Box className={classes.cardContainer}>
                        {essays.map((essay, index) => <EssayCard key={index} {...essay} />)}
                    </Box>}
                </Paper>
                <FooterComponent />
            </Box >)
    }
}


export default withStyles(useStyles)(Dashboard);
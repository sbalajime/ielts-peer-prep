import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles, Fab } from '@material-ui/core';
import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import Loader from '../Components/Loader';
import Dropdown from '../Components/Dropdown'
import EssayCard from '../Components/EssayCard';
import EditIcon from '@material-ui/icons/Edit';
import SnackBar from '../Components/SnackBar';

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
    }, floatButton: {
        position: "fixed",
        bottom: '10%',
        right: '5%'
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
    taskSelector: {
        width: 100,
        height: 30,
        marginLeft: '7px',
        marginBottom: theme.spacing(2)

    },
    label: {
        color: '#000',
        marginBottom: theme.spacing(.5),
        marginLeft: '-5px', width: 100
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
            essays: [], loading: false,
            filterEssays: [],
            submit: "all", showSnackBar: false, snackBarMsg: '', snackBarType: ''
        }
    }
    componentDidMount() {
        this.setState({ loading: true }, () => getData('/essay', this.handleEssays));

    }

    handleEssays = (res) => {
        this.setState({ loading: false }, () => {
            if (res.status === 'success') {
                this.setState({ essays: res.rows, filterEssays: res.rows })
            } else if (res.status == 'failed') {
                this.setState({ showSnackBar: true, snackBarMsg: res.msg, snackBarType: 'error' });
            } else {
                this.setState({ showSnackBar: true, snackBarMsg: 'Issue with server!', snackBarType: 'error' });
            }
        })
    }


    handleSelectChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value },
            () => {
                const { essays, submit } = this.state
                if (submit === 'all') {
                    this.setState({ filterEssays: essays })
                } else {
                    let filterEssay = essays.filter((essay) => {

                        return essay.submittedbyme.toString() === submit
                    })
                    this.setState({ filterEssays: filterEssay })
                }

            })
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ apiError: false, apiErrMessage: '', showSnackBar: false });
    }




    render() {
        const { classes } = this.props;
        const { filterEssays, submit, loading, showSnackBar, snackBarMsg, snackBarType } = this.state;
        return (
            <Box bgcolor="primary.main" display="flex" minHeight="100vh" flexDirection="column">
                <AppBarComponent />
                <Paper elevation={3} className={classes.card}>
                    <Dropdown value={submit} name={"submit"} handleSelectChange={this.handleSelectChange} className={classes.taskSelector} options={[{ label: 'Me', value: 'true' }, { label: 'Other', value: 'false' }, { label: 'All', value: 'all' }]} label="Submitted By" labelClass={classes.label} />
                    <Fab size="medium" className={classes.floatButton} onClick={() => this.props.history.push('/write')} color="primary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                    {loading ? <Loader /> : <Box className={classes.cardContainer}>
                        {filterEssays.map((essay, index) => <EssayCard key={index} {...essay} />)}
                    </Box>}
                </Paper>
                <SnackBar open={showSnackBar} autoHideDuration={5000} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
                <FooterComponent />
            </Box >)
    }
}


export default withStyles(useStyles)(Dashboard);
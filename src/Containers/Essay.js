import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import Dropdown from '../Components/Dropdown';
import CONSTANTS from '../constants';
import { postData } from '../Utils/Api'
import SnackBar from '../Components/SnackBar';
import Loader from '../Components/Loader';
import Grid from '@material-ui/core/Grid'

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    card: {
        flexGrow: 1,
        padding: theme.spacing(3),
        alignItems: 'center',
        display: 'flex', flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    }, form: {
        margin: theme.spacing(2),
        maxWidth: 700,
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1)
        }, [theme.breakpoints.up('sm')]: {
            width: 700
        }
    },
    button: {
        width: 'auto', textAlign: 'center'
    },
    taskSelector: {
        width: 200
    },
    selectContainer: {
        '& > *': {
            marginRight: 20
        }

    }
});



class Essay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            type: '',
            question: '',
            answer: '',
            duration: 0,
            minimumWords: 0,
            remSeconds: 0,
            timer: {
                minutes: '00',
                seconds: '00'
            },
            currentWords: 0,
            task: '',
            startTimer: false,
            showSnackBar: false, snackBarMsg: '', snackBarType: '', loading: false
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { task, startTimer } = this.state;
        if (prevState.remSeconds === 0) {
            clearInterval(this.durInterval);
        }
        if (startTimer && (startTimer !== prevState.startTimer)) {
            if (task == 'task_1') {
                clearInterval(this.durInterval);
                this.setState({ minimumWords: CONSTANTS.TASK_1_MINIMUM_WORDS, duration: CONSTANTS.TASK_1_DURATION, remSeconds: CONSTANTS.TASK_1_DURATION }, this.initiateTimer)
            } else {
                clearInterval(this.durInterval);
                this.setState({ minimumWords: CONSTANTS.TASK_2_MINIMUM_WORDS, duration: CONSTANTS.TASK_2_DURATION, remSeconds: CONSTANTS.TASK_2_DURATION }, this.initiateTimer)
            }


        }
    }

    initiateTimer = () => {
        this.durInterval = setInterval(() => {
            const { remSeconds } = this.state;
            let minutes = String(Math.floor(remSeconds / 60)).padStart(2, '0');
            let seconds = String(remSeconds - (minutes * 60)).padStart(2, '0');
            this.setState({ timer: { minutes, seconds }, remSeconds: remSeconds - 1 });
        }, 1000)
    }

    handleChange = (input, value) => {
        let currentWords = 0;
        if (input == 'answer') {
            currentWords = value.trim().replace(/\n/g, ' ').split(' ').length;
        }
        this.setState({ [input]: value, currentWords })
    }

    afterPost = (resp) => {
        this.setState({ loading: false }, () => {
            if (resp.status == 'success') {
                this.setState({ showSnackBar: true, snackBarMsg: 'Submitted Successfully', snackBarType: 'success' });
            } else if (resp.status == 'failed') {
                this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'error' });
            } else {
                this.setState({ showSnackBar: true, snackBarMsg: 'Issue with server!', snackBarType: 'error' });
            }
        });
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ apiError: false, apiErrMessage: '', showSnackBar: false });
    }

    handleClick = () => {
        const { answer, question, task, type } = this.state
        const body = { essay: answer, task, question, type }
        this.setState({ loading: true }, () => postData(`/essay`, body, this.afterPost));
    }

    handleSelectChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackBar: false }, () => {
            const { snackBarMsg } = this.state;
            if (snackBarMsg && snackBarMsg.match(/success/i) && snackBarMsg.match(/success/i).length) {
                this.props.history.push(`/`)
            }
        });
    }
    render() {

        const { classes } = this.props;
        const { minimumWords, duration, timer, loading, currentWords, answer, type, task, startTimer, apiErrMessage, apiError, question, showSnackBar, snackBarType, snackBarMsg } = this.state;

        return (
            <Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" flexDirection="column" >
                <AppBarComponent />
                <Paper elevation={3} className={classes.card}>
                    {loading ? <Loader /> :
                        <Grid container justify="center" spacing={1}>
                            <Grid item xs={10} sm={10} lg={8} spacing={1} className={classes.form}>

                                <Box display="flex" flexDirection="row" className={classes.selectContainer}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={12} lg={6} spacing={1} >
                                            <Dropdown name={"task"} value={task} handleSelectChange={this.handleSelectChange} className={classes.taskSelector} options={[{ label: 'Task 1', value: 'task_1' }, { label: 'Task 2', value: 'task_2' }]} label="Select Task" />
                                        </Grid>
                                        <Grid item xs={12} sm={12} lg={6} spacing={1}>
                                            <Dropdown name={"type"} value={type} handleSelectChange={this.handleSelectChange} className={classes.taskSelector} options={[{ label: 'Academic', value: 'Academic' }, { label: 'General', value: 'General' }]} label="Select Type" />
                                        </Grid>
                                    </Grid>

                                </Box>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Question"
                                    multiline
                                    rows={5}
                                    value={this.state.question}
                                    onChange={(e) => this.handleChange('question', e.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{ "data-gramm_editor": false, "data-gramm": false, spellCheck: false }}
                                    margin="normal"
                                />
                                {startTimer ?
                                    <div>

                                        <Box display="flex" flexDirection="row" justifyContent="flex-end" className={classes.root}>
                                            <Chip label={`Minimum Words: ${currentWords}/${minimumWords}`} color="primary" />
                                            <Chip label={`${timer.minutes}:${timer.seconds}`} color="primary" icon={<TimerOutlinedIcon />} />
                                        </Box>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Answer"
                                            multiline
                                            rows={20}
                                            value={this.state.answer}
                                            onChange={(e) => this.handleChange('answer', e.target.value)}
                                            variant="outlined"
                                            fullWidth={true}
                                            inputProps={{ "data-gramm_editor": false, "data-gramm": false, spellCheck: false }}
                                            margin="normal"
                                        />
                                        <div style={{ textAlign: 'right' }}><Button onClick={this.handleClick} variant="contained" color="primary" size="large">Submit</Button></div>
                                    </div> : <div style={{ textAlign: 'center' }}><Button variant="contained" color="primary" size="large" onClick={() => this.setState({ startTimer: true })} disabled={!(task && type && question)}>Start Timer</Button></div>}
                                <SnackBar open={showSnackBar} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
                            </Grid>



                        </Grid>
                    }

                </Paper>
                <FooterComponent />
            </Box >)
    }
}


export default withStyles(useStyles)(Essay);
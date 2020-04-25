import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import AppBar from '../Components/AppBar';

import Dropdown from '../Components/Dropdown';
import CONSTANTS from '../constants';
import { postData } from '../Utils/Api'
import SnackBar from '../Components/SnackBar';


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    card: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
    }
});



class Essay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
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
            apiError: false,
            apiErrMessage: ""
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
        if (resp.msg === 'successfull') {
            //const { data } = resp;
            //if (data) {
            this.setState({ question: "", answer: "", task: "" })
            //}
        } else {
            this.setState({ apiError: true, apiErrMessage: resp.msg })
        }


    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ apiError: false, apiErrMessage: '' });
    }

    handleClick = () => {
        const { answer, question, task } = this.state
        const body = { essay: answer, task, question }
        postData(`/essay`, body, this.afterPost)
    }

    handleSelectChange = (e) => {
        this.setState({ task: e.target.value })
    }
    render() {
        const { classes } = this.props;
        const { minimumWords, duration, timer, currentWords, answer, task, startTimer, apiErrMessage, apiError } = this.state;
        return (
            <Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" flexDirection="column" >
                <AppBar />
                <Paper elevation={3} className={classes.card}>
                    <Box margin={3} className={classes.form}>
                        <Dropdown value={task} handleSelectChange={this.handleSelectChange} className={classes.taskSelector} options={[{ label: 'Task 1', value: 'task_1' }, { label: 'Task 2', value: 'task_2' }]} label="Select Task" />

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
                            </div> : <div style={{ textAlign: 'center' }}><Button variant="contained" color="primary" size="large" onClick={() => this.setState({ startTimer: true })}>Start Timer</Button></div>}
                        <SnackBar open={apiError} type="error" message={apiErrMessage} handleClose={this.handleSnackBarClose} />
                    </Box>
                </Paper>
            </Box >)
    }
}


export default withStyles(useStyles)(Essay);
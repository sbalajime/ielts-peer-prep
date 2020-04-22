import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import CONSTANTS from '../constants';

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    button: {
        width: 'auto', textAlign: 'center'
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
            currentWords: 0
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { task } = this.state;
        if (prevState.remSeconds === 0) {
            clearInterval(this.durInterval);
        }
        if (task !== prevState.task) {
            if (task == 'task_1') {
                this.setState({ minimumWords: CONSTANTS.TASK_1_MINIMUM_WORDS, duration: CONSTANTS.TASK_1_DURATION, remSeconds: CONSTANTS.TASK_1_DURATION }, this.initiateTimer)
            } else {
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
    render() {
        const { classes } = this.props;
        const { minimumWords, duration, timer, currentWords, answer } = this.state;
        return (
            <Paper elevation={3} >
                <Box margin={3} >
                    <Select
                        native
                        value={this.state.task}
                        onChange={(e) => this.handleChange('task', e.target.value)}
                        label="Age"
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple'
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value='task_1'>Task 1</option>
                        <option value='task_2'>Task 2</option>
                    </Select>
                    <div>

                        <Chip label={`Minimum Words: ${currentWords}/${minimumWords}`} color="primary" />
                        <Chip label={`Duration: ${timer.minutes}:${timer.seconds}`} color="primary" />

                    </div>
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
                    <div style={{ textAlign: 'right' }}><Button variant="contained" color="primary" size="large">Submit</Button></div>
                </Box>
            </Paper>)
    }
}


export default withStyles(useStyles)(Essay);
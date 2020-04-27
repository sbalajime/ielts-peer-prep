import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import SnackBar from '../Components/SnackBar';

import { getData, postData } from '../Utils/Api';

const useStyles = (theme) => ({
    reviewSection: {
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    slideLabel: {
        marginRight: theme.spacing(4)
    },
    root: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    sliderRow: {
        padding: theme.spacing(2)
    },
    comments: {
        padding: theme.spacing(9),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        },
    }, answer: {
        whiteSpace: 'pre-line'
    }
});

function valueLabelFormat(value) {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map((item) => Number(item));
    return `${Math.round(coefficient)}e^${exponent}`;
}

const BandSlider = (props) => {
    const { classes, label, handleChange } = props;
    return (<Grid container spacing={1} className={classes.sliderRow}>
        <Grid item lg={6} sm={6} xs={6} ><Typography variant="body2" className={classes.slideLabel}>
            {label}
        </Typography>
        </Grid>
        <Grid item lg={6} sm={6} xs={6} >
            <Slider
                defaultValue={1}
                getAriaValueText={valueLabelFormat}
                aria-labelledby="discrete-slider-always"
                step={0.5}
                min={1}
                max={9}
                onChange={(e, val) => handleChange(label, val)}
                valueLabelDisplay="on"
            /></Grid>
    </Grid>)
}
class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            sliders: {}, showSnackBar: false, snackBarMsg: '', snackBarType: ''
        }
    }

    componentDidMount() {
        console.log('this.props', this.props)
        getData(`/essay/${this.props.match.params.id}`, this.processData);
    }

    processData = (res) => {
        if (res.status == 'success') {
            const { answer, question, task } = res.rows[0];
            this.setState({
                question,
                answer,
                task
            })
        }

    }

    handleSliderChange = (label, value) => {
        console.log('e', label, value);
        this.setState({
            sliders: {
                ...this.state.sliders,
                [label]: value
            }
        })
    }

    handleClick = () => {
        const { sliders } = this.state;
        postData('/review', { sliders, essayId: this.props.match.params.id }, this.handleReviewResp)
    }

    handleReviewResp = (resp) => {
        if (resp.status == 'success') {
            this.setState({ showSnackBar: true, snackBarMsg: 'Review given Successfully', snackBarType: 'success' })
        } else {
            this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'danger' })
        }

    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackBar: false }, () => {
            const { snackBarMsg } = this.state;
            if (snackBarMsg) {
                this.props.history.push(`/essay/${this.props.match.params.id}`)
            }
        });
    }

    render() {
        const { classes } = this.props;
        const { question, answer, task, sliders, showSnackBar, snackBarMsg, snackBarType } = this.state;
        console.log('SLIDERS', sliders);
        let bandDescriptors = [
            'Task Achievement',
            'Coherence and Cohesion',
            'Lexical Resource',
            'Grammatical Range and Accuracy'
        ]
        console.log(showSnackBar, snackBarMsg, snackBarType);
        return (
            <Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" flexDirection="column">
                <AppBarComponent />
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Question
                        </Typography>
                        <Typography variant="body2" component="p" gutterBottom>
                            {question}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Answer
                        </Typography>
                        <Typography variant="body2" component="p" gutterBottom className={classes.answer}>
                            {answer}
                        </Typography>
                    </CardContent>
                    <Divider className={classes.divider} />
                    <CardActions>
                        <Grid container spacing={5}>
                            <Grid item lg={6} sm={12} xs={12}>
                                {bandDescriptors.map((row, index) => <BandSlider key={index} classes={classes} label={row} handleChange={this.handleSliderChange} />)}
                            </Grid>
                            <Grid item lg={6} sm={12} xs={12}>
                                <Box className={classes.comments}><TextField
                                    id="outlined-multiline-static"
                                    label="Comments (*optional)"
                                    multiline
                                    rows={5}
                                    value={this.state.comments}
                                    onChange={(e) => this.handleChange('question', e.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{ "data-gramm_editor": false, "data-gramm": false, spellCheck: false }}
                                    margin=""
                                /></Box>
                            </Grid>
                            <Grid item lg={12} sm={12} xs={12}>
                                <div style={{ marginTop: 20, width: '100%', textAlign: 'right' }}><Button variant="contained" color="primary" classes={{ root: classes.button }} onClick={this.handleClick}>Submit Review</Button></div>
                            </Grid>
                        </Grid>
                        <SnackBar open={showSnackBar} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
                    </CardActions>
                </Card>
                <FooterComponent />
            </Box >

        )
    }
}

export default withStyles(useStyles)(Review);
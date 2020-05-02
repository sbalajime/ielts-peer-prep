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
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import SnackBar from '../Components/SnackBar';
import Loader from '../Components/Loader';
import Chip from '@material-ui/core/Chip'
import { wordCount } from '../constants/index'
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
        padding: theme.spacing(3),
        display: 'flex', flexDirection: 'column', alignItems: 'center'
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
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        },
    }, answer: {
        whiteSpace: 'pre-line'
    }, pageWrapper: {
        maxWidth: 1200,
        [theme.breakpoints.down('md')]: {
            maxWidth: 600
        }
    }, reviewSection: {
        height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'
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
            comment: '',
            sliders: {}, showSnackBar: false, snackBarMsg: '', snackBarType: '', loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, () => getData(`/essay/${this.props.match.params.id}`, this.processData));

    }

    processData = (res) => {
        this.setState({ loading: false }, () => {
            if (res.status == 'success') {
                if (typeof (res.rows[0]) === 'undefined' || res.rows[0].reviewedbyme || res.rows[0].submittedbyme)
                    this.props.history.push('/')
                else {
                    const { answer, question, task } = res.rows[0];
                    this.setState({
                        question,
                        answer,
                        task
                    })
                }

            }
        })

    }
    handleValueChange = (id, value) => {
        if (id === 'comment') {
            this.setState({ [id]: value })
        }
        else {
            this.setState({
                sliders: {
                    ...this.state.sliders, [id]: value
                }
            })
        }


    }

    handleClick = () => {
        const { sliders, comment } = this.state;
        if (Object.keys(sliders).length !== 4 || (comment.length == 0)) {
            console.log()
            this.setState({ showSnackBar: true, snackBarMsg: 'Please select all band selectors and give comments.', snackBarType: 'error' });
        } else {
            this.setState({ loading: true }, () => postData('/review', { sliders, essayId: this.props.match.params.id, comment }, this.handleReviewResp))
        }

    }

    handleReviewResp = (resp) => {
        this.setState({ loading: false }, () => {
            if (resp.status == 'success') {
                this.setState({ showSnackBar: true, snackBarMsg: 'Review given Successfully', snackBarType: 'success' })
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
        this.setState({ showSnackBar: false }, () => {
            const { snackBarMsg } = this.state;
            if (snackBarMsg && snackBarMsg.match(/success/i) && snackBarMsg.match(/success/i).length) {
                this.props.history.push(`/essay/${this.props.match.params.id}`)
            }
        });
    }

    handleChange = (e) => this.setState({ comment: e.target.value })
    render() {
        console.log('state', this.state);
        const { classes } = this.props;
        const { question, answer, comment, showSnackBar, snackBarMsg, snackBarType, loading } = this.state;
        let bandDescriptors = [
            'Task Achievement',
            'Coherence and Cohesion',
            'Lexical Resource',
            'Grammatical Range and Accuracy'
        ];
        console.log(this.state)
        return (
            <Box bgcolor="primary.main" display="flex" minHeight="100vh" flexDirection="column">
                <AppBarComponent />
                <Card className={classes.root}>
                    {loading ? <Loader /> :
                        <Grid container spacing={2} className={classes.pageWrapper}>
                            <Grid item xs={12} sm={12} lg={6} spacing={2}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        Question
                                    </Typography>
                                    <Typography variant="body1" component="p" gutterBottom>
                                        {question}
                                    </Typography>
                                    <Chip size="small" label={`Words: ${wordCount(answer)}`} color='primary' />
                                    <Divider className={classes.divider} />
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        Answer
                                    </Typography>
                                    <Typography variant="body2" component="p" gutterBottom className={classes.answer}>
                                        {answer}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12} sm={12} lg={6} spacing={2} className={classes.reviewSection}>
                                <CardActions>
                                    <Grid container>
                                        <Grid item lg={12} sm={12} xs={12}>
                                            {bandDescriptors.map((row, index) => <BandSlider key={index} classes={classes} label={row} handleChange={this.handleValueChange} />)}
                                        </Grid>
                                        <Grid item lg={12} sm={12} xs={12}>
                                            <Box className={classes.comments}><TextField
                                                id="outlined-multiline-static"
                                                label="Comments *"
                                                multiline
                                                rows={10}
                                                value={comment}
                                                onChange={this.handleChange}
                                                variant="outlined"
                                                fullWidth={true}
                                                //inputProps={{ "data-gramm_editor": false, "data-gramm": false, spellCheck: false }}
                                                margin=""
                                            /></Box>
                                        </Grid>
                                        <Grid item lg={12} sm={12} xs={12}>
                                            <div style={{ marginTop: 20, width: '90%', textAlign: 'right' }}><Button variant="contained" color="primary" disabled={showSnackBar} classes={{ root: classes.button }} onClick={this.handleClick}>Submit Review</Button></div>
                                        </Grid>
                                    </Grid>
                                    <SnackBar open={showSnackBar} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
                                </CardActions>
                            </Grid>
                        </Grid>}

                </Card>
                <FooterComponent />
            </Box >

        )
    }
}

export default withStyles(useStyles)(Review);
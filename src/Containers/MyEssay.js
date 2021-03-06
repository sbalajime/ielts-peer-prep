import React, { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import SnackBar from '../Components/SnackBar'
import Loader from '../Components/Loader';
import Comment from '../Components/Comment';



import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { getData } from '../Utils/Api';
import Chip from '@material-ui/core/Chip'
import { wordCount } from '../constants/index'

const useStyles = (theme) => ({
    card: {
        width: 'auto',
        padding: theme.spacing(3),
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    },
    answer: {
        fontSize: 16

    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    reviewSection: {
        width: '100%', padding: theme.spacing(3), margin: theme.spacing(2)
    },
    essaySection: {
        maxWidth: 500,
        marginBottom: theme.spacing(2)
    }, reviewWrapper: {
        marginBottom: theme.spacing(3)

    },
    slideLabel: {
        display: 'flex',
        alignItems: 'center'
    },
    slideValue: {
        textAlign: 'right', display: 'flex',
        alignItems: 'center'
    },
    sliderRow: {
        padding: theme.spacing(2),
    }, answer: {
        marginTop: "25px",
        lineHeight: '1.6',
        whiteSpace: 'pre-line'
    },
    pageWrapper: {
        maxWidth: 1200, margin: 'auto', padding: theme.spacing(1)
    },
    bandHeader: {
        marginBottom: theme.spacing(2)
    }
})

function valueLabelFormat(value) {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map((item) => Number(item));
    return `${Math.round(coefficient)}e^${exponent}`;
}

const ReviewRow = (props) => {
    const { classes, label, value } = props;
    return (
        <Grid container spacing={1} className={classes.sliderRow} >
            <Grid item lg={8} sm={8} xs={8} className={classes.slideLabel}><Typography component="p" >
                {label}
            </Typography>
            </Grid>
            <Grid item lg={4} sm={4} xs={4} className={classes.slideValue}>
                <Typography component="p" >
                    {value}
                </Typography>
            </Grid>
        </Grid>)
}
// let question = `Some people say that E- books and modern technology will totally replace traditional newspaper and magazines to what extent do you agree or disagree.`
// let answer = `Technology is flourishing by leaps and bounds and providing us new avenues while keeping ourselves update with latest news and current affairs. Therefore, a fair amount of people believe, a conventional way of newspaper reading will be disappeared.I do not completely accord on it because conventional newspaper are easiest and cheapest way to get news.IELTS WRITING TASK 2 QUESTION ANSWER

// To embark on, there are multiple reasons why the traditional ways of getting news are still popular. First of all, reading newspaper has become ardent habit of many people. Everyone whether from affluent or middle class are seen desperately waiting for paper in morning and enjoy it reading with cup of tea.Moreover, these are the portable, cheapest an easiest way of knowing about the global activities. It can be carried from one place to other in bag and available at economical price. It is so handy and merely by continuing flip of pages can make you omniscient. Secondly,electricity and other appliances are not required. Moreover,the other attachments are like icing on the cake. For instance, the Hindustan times has multiple attachments like women’s fashion, career guide, culinary art and so on.

// However, undoubtedly, technology has given the radical approach to reading news, for example, videos provide full and clear view to reading besides that we can download, share and forward it to our relatives and friends. Needless to say that technophobic will be having no place in this ever-advanced modern world.

// To conclude, the lives of people are drastically affected by advanced versions of technology yet, in my opinion, it will not be able to pose threat to the existence traditional newspaper and magazines.`



class MyEssay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSnackBar: false,
            snackBarMessage: '',
            snackBarType: '',
            review: [],
            essay: "", loading: false,
            showSnackBar: false,
            snackBarType: "",
            snackBarMsg: "",
            words: "", comments: [], noReview: false
        }
    }

    componentDidMount() {
        const loading = this.state
        this.setState({ loading: true }, () => {
            getData(`/review/${this.props.match.params.id}`, this.handleReviewResp);
        })
        this.setState({ loading: true }, () => {
            getData(`/essay/${this.props.match.params.id}`, this.handleEssayResp)
        })
    }


    handleEssayResp = (resp) => {
        this.setState({ loading: false }, () => {
            if (resp.status == 'success') {
                this.setState({ essay: resp.rows[0] })
            } else if (resp.status == 'failed') {
                this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'error' });
            } else {
                this.setState({ showSnackBar: true, snackBarMsg: 'Issue with server!', snackBarType: 'error' });
            }
        })
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackBar: false });
    }

    handleReviewResp = (resp) => {
        this.setState({ loading: false }, () => {
            if (resp.status == 'success') {
                console.log(resp.rows)
                if (typeof (resp.rows) == 'undefined' || typeof (resp.rows.reviews) == 'undefined' || resp.rows.reviews == null) {
                    this.setState({ noReview: true })
                }
                else {
                    let bandDescriptors = [
                        'Task Achievement',
                        'Coherence and Cohesion',
                        'Lexical Resource',
                        'Grammatical Range and Accuracy'
                    ];
                    let respReviews = resp.rows.reviews;
                    let sortedReviews = respReviews.sort((a, b) => bandDescriptors.indexOf(a.label) - bandDescriptors.indexOf(b.label))
                    this.setState({
                        review: sortedReviews, comments: resp.rows.comments_arr
                    })
                }

            } else {
                this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'error' })
            }
        })

    }




    render() {
        const { classes } = this.props;
        const { review, essay, showSnackBar, snackBarType, snackBarMsg, loading, comments, noReview } = this.state;


        return (<Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" flexDirection="column" >
            <AppBarComponent />
            <Paper elevation={3} className={classes.card}>
                <Box className={classes.pageWrapper}>
                    {loading ? <Loader /> : <Grid container spacing={{ lg: 5, sm: 5, xs: 2 }}>
                        <Grid item lg={6} sm={12} xs={12} >
                            <Box display="flex" flexDirection="column" alignItems="center"><Box className={classes.essaySection}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {essay.question}
                                </Typography>
                                <Chip size="small" label={`Words: ${wordCount(essay.answer)}`} color='primary' />
                                <Typography component="p" gutterBottom className={classes.answer}>
                                    {essay.answer}
                                </Typography>
                            </Box></Box>
                        </Grid>
                        <Grid item lg={6} sm={12} xs={12} >
                            {noReview ? <Typography variant="h5" component="h5" gutterBottom className={classes.bandHeader}>
                                Others Haven't reviewed your answer yet.
                                </Typography> : <Box height="100%" classes={classes.reviewSection} >
                                    <Typography variant="h5" component="h5" gutterBottom className={classes.bandHeader}>
                                        Band Descriptors
                                </Typography>
                                    <Paper elevation={3} className={classes.reviewWrapper}>
                                        {review.map((row, index) => <Fragment key={index}>
                                            <ReviewRow label={row.label} value={`${row.value}/9`} classes={classes} />
                                            <Divider />
                                        </Fragment>)}
                                    </Paper>
                                    <Typography variant="h5" component="h5" gutterBottom >
                                        Comments
                                </Typography>
                                    {comments.map((row, i) => <Comment key={i} value={row.comment} fullName={row.user_name} />)}
                                </Box>}

                        </Grid>
                    </Grid>}
                </Box>
            </Paper>
            <SnackBar open={showSnackBar} autoHideDuration={5000} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
            <FooterComponent />
        </Box >)
    }
}

export default withStyles(useStyles)(MyEssay);
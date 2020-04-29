import React, { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import AppBarComponent from '../Components/AppBar'
import FooterComponent from '../Components/Footer';
import SnackBar from '../Components/SnackBar'
import Loader from '../Components/Loader';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { getData } from '../Utils/Api';

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
        width: '100%'
    },
    essaySection: {
        padding: theme.spacing(3),
        maxWidth: 500
    }, reviewWrapper: {
        padding: theme.spacing(3)
    },
    slideLabel: {
        display: 'flex',
        alignItems: 'center'
    },
    sliderRow: {
        margin: '10px 0'
    }, answer: {
        whiteSpace: 'pre-line'
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
            <Grid item lg={8} sm={8} xs={8} className={classes.slideLabel}><Typography variant="h5" component="h2" >
                {label}
            </Typography>
            </Grid>
            <Grid item lg={4} sm={4} xs={4} className={classes.slideLabel}>
                <Typography variant="h5" component="h2" className={classes.answer}>
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


let comments = [{
    fullName: "Balaji S"
}]
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
            snackBarMsg: ""
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
            } else {
                this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'danger' })
            }
        })
    }

    handleReviewResp = (resp) => {
        this.setState({ loading: false }, () => {
            if (resp.status == 'success') {
                if (resp.rows.reviews.length === 0 || !resp.rows.reviewedbyme) {
                    this.props.history.push(`/`)
                }
                else {
                    this.setState({
                        review: resp.rows.reviews
                    })
                }

            } else {
                this.setState({ showSnackBar: true, snackBarMsg: resp.msg, snackBarType: 'danger' })
            }
        })

    }

    render() {
        const { classes } = this.props;
        const { review, essay, showSnackBar, snackBarType, snackBarMsg, loading } = this.state;

        return (<Box bgcolor="primary.main" display="flex" flex="1" minHeight="100vh" flexDirection="column" >
            <AppBarComponent />
            <Paper elevation={3} className={classes.card}>
                {loading ? <Loader /> : <Grid container spacing={{ lg: 5, sm: 5, xs: 2 }}>
                    <Grid item lg={6} sm={12} xs={12} >
                        <Box display="flex" flexDirection="column" alignItems="center"><Box className={classes.essaySection}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {essay.question}
                            </Typography>
                            <Typography variant="body2" component="p" gutterBottom className={classes.answer}>
                                {essay.answer}
                            </Typography>
                        </Box></Box>
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12} >
                        <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
                            <Paper elevation={3} className={classes.reviewWrapper}>
                                {review.map((row, index) => <Fragment key={index}>
                                    <ReviewRow label={row.label} value={`${row.value}/9`} classes={classes} />
                                    <Divider />
                                </Fragment>)}
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>}
            </Paper>
            <SnackBar open={showSnackBar} autoHideDuration={5000} type={snackBarType} message={snackBarMsg} handleClose={this.handleSnackBarClose} />
            <FooterComponent />
        </Box >)
    }
}

export default withStyles(useStyles)(MyEssay);
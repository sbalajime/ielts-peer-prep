import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    essayCard: {
        minWidth: 275
    },
    root: {
        boxShadow: `0 1px 3px ${theme.palette.primary.light}, 0 1px 2px ${theme.palette.primary.light}`,
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        cursor: 'pointer',
        width: 275,
        '&:hover': {
            boxShadow: `0 14px 28px ${theme.palette.primary.light}, 0 10px 10px ${theme.palette.primary.light}`
        }
    },
    question: {
        height: 100,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        display: '-webkit-box',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical',
    }, bottomText: {
        textAlign: 'right'
    },
    chipVisible: {
        visibility: 'visible'
    },
    chipHide: {
        visibility: 'hidden'
    }
}));


const EssayCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    return (<Card className={classes.root} onClick={() => history.push(`/${(props.reviewed_by_me || props.submittedbyme) ? 'essay' : 'review'}/${props.essayid}`)}>
        <CardContent>
            <Typography component="h6" className={classes.question}>
                {props.question}
            </Typography>
            {<Chip size="small" label={'You Reviewed'} color='primary' className={props.reviewed_by_me ? classes.chipVisible : classes.chipHide} icon={<DoneIcon />} />}
            <Typography color="textSecondary" className={classes.bottomText}>
                {props.username}
            </Typography>
            <Typography variant="body2" component="p" className={classes.bottomText}>
                {new Date(props.createdtime).toLocaleDateString()}
            </Typography>
        </CardContent>
    </Card>)
}


export default EssayCard;
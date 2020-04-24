import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
    }
}));


const EssayCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    return (<Card className={classes.root} onClick={() => history.push('/review')}>
        <CardContent>

            <Typography component="h6">
                {props.question}
            </Typography>
            <Typography color="textSecondary">
                {props.fullName}
            </Typography>
            <Typography variant="body2" component="p">
                {props.date}
            </Typography>
        </CardContent>
    </Card>)
}


export default EssayCard;
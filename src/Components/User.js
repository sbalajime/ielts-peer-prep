import React, { useState, useEffect } from 'react'
import { getData } from '../Utils/Api'
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    iconSize: {
        fontSize: 80
    }
});

function User() {
    const classes = useStyles();

    const [user, userChange] = useState([])

    const processUser = (res) => {
        if (res.status = "sucess") {
            userChange([res.rows[0].full_name])
        }
    }

    useEffect(
        () => {
            getData('/user/id', processUser)
        }

    )



    return (

        <React.Fragment>
            <AccountCircleIcon className={classes.iconSize} />
            <Typography>{user}</Typography>
        </React.Fragment >
    )


}

export default User;
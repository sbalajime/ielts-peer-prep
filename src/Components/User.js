import React, { useState, useEffect } from 'react'
import { getData } from '../Utils/Api'
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Typography, makeStyles } from '@material-ui/core/'



function User() {

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
            <Tooltip title={user} aria-label="logout" arrow>
                <AccountCircleIcon />
            </Tooltip>
        </React.Fragment >
    )


}

export default User;
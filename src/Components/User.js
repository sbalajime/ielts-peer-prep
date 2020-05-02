import React, { useState, useEffect } from 'react'
import { getData } from '../Utils/Api'

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
            <AccountCircleIcon />
            <Typography >{user}</Typography>
        </React.Fragment >
    )


}

export default User;
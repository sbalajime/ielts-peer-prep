import React, { useState, useEffect } from 'react'
import { getData } from '../Utils/Api'

import Typography from '@material-ui/core/Typography'

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
        <Typography >
            Welcome {user}
        </Typography>
    )


}

export default User;
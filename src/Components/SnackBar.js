import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackBar = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={props.duration || 3000} onClose={props.handleClose || (() => { })}>
            <Alert onClose={props.handleClose || (() => { })} severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackBar;
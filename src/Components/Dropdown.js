import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


const Dropdown = (props) => {
    const { value, handleSelectChange, className, label, labelClass, options, name } = props;
    return (
        <div>
            <InputLabel className={labelClass} variant="outlined" id="task-selector">{label}</InputLabel>
            <Select
                className={className}
                labelId="task-selector"
                id="demo-customized-select"
                value={value}
                name={name}
                onChange={handleSelectChange}
                input={<BootstrapInput />}            >
                {options.map((a, key) => {
                    return <MenuItem key={key} value={a.value}>{a.label}</MenuItem>
                })}
            </Select>
        </div>
    )
}


export default Dropdown;
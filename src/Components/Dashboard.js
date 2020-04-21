import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
    render() {
        return <div><div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" onClick={() => { this.props.history.push('/write') }}>Write</Button></div>
            <div style={{ marginTop: 20, width: '100%' }}><Button variant="contained" color="primary" onClick={() => { this.props.history.push('/review') }}>Review</Button></div></div>
    }
}


export default Dashboard
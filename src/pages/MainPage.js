import React, { Component } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';


class MainPage extends Component {

    render() {
        return (
            <div style={{height: '100vh', overflow: 'hidden'}}>
                <Sidebar />
            </div>       
        );
    }
}

export default MainPage

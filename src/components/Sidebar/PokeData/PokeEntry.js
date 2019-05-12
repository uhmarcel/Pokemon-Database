import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

class PokeEntry extends Component {

    state = {
        loaded: false
    }

    componentDidUpdate() {
        const {entryText, onLoad} = this.props;
        const {loaded} = this.state;
        if (!loaded && entryText) {
            this.setState({loaded: true})
            onLoad();
        }
    }

    render() {
        const entryText = this.props.entryText ? this.props.entryText : "Loading entry...";

        return (   
            <Card>
                <CardBody>
                    {entryText}
                </CardBody>
            </Card>
        );
    }
}

export default PokeEntry

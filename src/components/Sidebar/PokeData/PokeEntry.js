import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

class PokeEntry extends Component {

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

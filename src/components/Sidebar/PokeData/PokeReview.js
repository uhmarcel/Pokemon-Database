import React, { Component } from 'react';
import { Fade, Row, Col } from 'reactstrap';
import Type from '../../Utilities/Type';


class PokeReview extends Component {
    
    state = {
        loaded: false
    }

    componentDidUpdate() {
        const {types, onLoad} = this.props;
        const {loaded} = this.state;
        if (!loaded && types) {
            this.setState({loaded: true})
            onLoad();
        }
    }

    render() {
        const types = this.props.types;
        const display = types ? types.map(t => t.type.name) : [];

        return (  
            <Row>
                {display.map( currentDisplay =>
                    <Col xs='4' key={currentDisplay}>
                        <Fade>
                            <Type type={currentDisplay} />
                        </Fade>
                    </Col>
                )}
            </Row>
        )
    }

}

export default PokeReview

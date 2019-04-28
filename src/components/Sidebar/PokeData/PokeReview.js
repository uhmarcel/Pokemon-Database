import React, { Component } from 'react';
import { Fade, Row, Col } from 'reactstrap';
import Type from '../../Utilities/Type';


class PokeReview extends Component {

    render() {
        const types = this.props.types;

        const display = types ? types.map(t => t.type.name) : [];
        const show = types ? true : false;

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

import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';

const arrowStyles = {
    display: 'inline-block',
    borderLeft: '14px solid #aaa',
    borderTop: '9px solid transparent',
    borderBottom: '9px solid transparent'
    
}

class PokeEvolutions extends Component {

    render() {
        const base = this.props.evolutions.base;
        const evolutions = this.props.evolutions.evolutions;
        
        if (evolutions) {
            return (   
                <Row>
                    <Col className='p-0 text-center'>
                        <img src={base.imgurl} alt='item' className='img-fluid'/>
                    </Col>
                    
                    {evolutions.map( (evol, i) => {
                        const evoMsg = this.getEvolutionMsg(evol);

                        return (
                        <Fragment key={i}>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <div className='text-center'>
                                        <div style={arrowStyles}></div>
                                    </div>
                                    <small>{evoMsg}</small>
                                </div>
                            </div>
                            <Col className='p-0 text-center'>
                                <img src={evol.imgurl} alt='item' className='img-fluid'/>
                            </Col>
                        </Fragment>
                        )}
                    )}
                </Row>
            )
        }
        else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }

    getEvolutionMsg(evolution) {
        let message = '';
        if (evolution.atLvl) {
            message = 'lvl ' + evolution.atLvl;
        }
        return message;
    }


}

export default PokeEvolutions

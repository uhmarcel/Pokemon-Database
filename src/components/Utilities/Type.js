import React, { Component } from 'react';
import { capitalize, getTypeColor } from '../../library/utilities';


class Type extends Component {

    constructor(props) {
        super(props);
        this.style = {
            background: getTypeColor(this.props.type),
            borderRadius: '8px'
        }
    }

    render() {
        const type = this.props.type;
        const display = type ? capitalize(type) : '';

        return (  
            <div className='text-light text-center' style={this.style}> 
                {display}
            </div>
        )
    }

}

export default Type
import React, { Component, Fragment } from 'react';
import { Progress } from 'reactstrap';

class PokeStats extends Component {

    render() {
        const stats = this.props.stats;
        
        const display = stats[0] ? stats.map(s => s.base_stat) : Array(6);
        const maxStat = 150;

        return (   
            <Fragment>
                <div className="text-center">HP</div>
                <Progress color="danger" value={display[5]} max={maxStat}> <span className='text-right pr-2'>{display[5]}</span> </Progress>
                
                <div className="text-center">Attack</div>
                <Progress color="warning"value={display[4]} max={maxStat}> <span className='text-right pr-2'>{display[4]}</span> </Progress>
                
                <div className="text-center">Defense</div>
                <Progress color="warning" value={display[3]} max={maxStat}> <span className='text-right pr-2'>{display[3]}</span> </Progress>
                
                <div className="text-center">Sp. Atk</div>
                <Progress color="info" value={display[2]} max={maxStat}> <span className='text-right pr-2'>{display[2]}</span> </Progress>
                
                <div className="text-center">Sp. Def</div>
                <Progress color="success" value={display[1]} max={maxStat}> <span className='text-right pr-2'>{display[1]}</span> </Progress>
                
                <div className="text-center">Speed</div>
                <Progress color="primary"value={display[0]} max={maxStat}> <span className='text-right pr-2'>{display[0]}</span> </Progress>           
            </Fragment>
        )
    }
}

export default PokeStats

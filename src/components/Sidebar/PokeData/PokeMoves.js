import React, { Component } from 'react';
import { Table, Card } from 'reactstrap';
import { formatName } from '../../../library/utilities';
import Type from '../../Utilities/Type';

class PokeMoves extends Component {
    
    render() {
        const moveset = this.props.moveset; // {name, lvl, url}
        
        if (moveset) {
            return ( 
                <Card>
                    <Table hover size='sm' className='mb-1'>
                        <thead>
                            <tr>
                                <th className='text-center'>Lv.</th>
                                <th>Move</th>
                                <th>Type</th>
                                <th className='text-right'>Pow.</th>
                                <th className='text-right'>Acc.</th>
                            </tr>
                        </thead>
                        <tbody>
                        {moveset.map(m => 
                            <tr key={m.name} className="small">
                                <td className='text-right'> {m.lvl} </td>
                                <td> {formatName(m.name)} </td>
                                <td> {m.class !== 'status'? <Type type={m.type}/> : ''} </td>
                                <td className='text-right'> {m.power ? m.power : '-'} </td>
                                <td className='text-right'> {m.accuracy ? m.accuracy : '-'} </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Card>
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

}

export default PokeMoves

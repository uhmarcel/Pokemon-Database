import React, { Component } from 'react';
import Item from './Item';
import { getID } from '../../library/utilities';
import { Fade } from 'reactstrap';
import { List, AutoSizer, CellMeasurer,CellMeasurerCache } from 'react-virtualized';



class ItemList extends Component {
    
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 120
        });
        this.state = {
            focusIndex: undefined
        }
    }


    renderRow = ({index, key, parent, style}) => (
        <CellMeasurer 
            key = {key}
            cache = {this.cache}
            parent = {parent}
            columnIndex = {0}
            rowIndex={index}
        >
        {({ measure }) => (
            <div style={style} key={key}>         
                <Item 
                    entry  = {this.props.pokemons[index].entry_number}
                    name   = {this.props.pokemons[index].pokemon_species.name}
                    id     = {getID(this.props.pokemons[index].pokemon_species.url)}
                    onLoad = {measure}
                />
            </div>       
        )}
        </CellMeasurer>
    );


    render() {
        return (
            <Fade>
                <div style={{height: 'calc(100vh - 63px)'}}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List 
                                width = {width}
                                height = {height}
                                rowHeight = {this.cache.rowHeight}
                                rowRenderer = {this.renderRow}
                                rowCount = {this.props.pokemons.length} 
                                overscanRowCount = {20}
                                deferredMeasurementCache = {this.cache}
                                scrollToIndex = {this.state.focusIndex}
                            />
                        )}
                    </AutoSizer>
                </div>
            </Fade>
        )
    }

}

export default ItemList
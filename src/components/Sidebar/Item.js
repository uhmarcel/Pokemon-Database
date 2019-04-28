import React, { Component, Fragment } from 'react';
import { ListGroupItem, Row, Col, Collapse } from 'reactstrap';
import Pokedex from 'pokedex-promise-v2';

import { getImageByID, capitalize, getEntryText, processEvolutions, processMoves, processTypes } from '../../library/utilities'
import PokeEntry from './PokeData/PokeEntry';
import PokeStats from './PokeData/PokeStats';
import PokeEvolutions from './PokeData/PokeEvolutions';
import PokeReview from './PokeData/PokeReview';
import PokeMoves from './PokeData/PokeMoves';


const itemStyle = {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '0',
    paddingTop: '10px',
    paddingBottom: '10px'
}

const imgStyle = {
    height: '96px'
}


class Item extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapse: false,
            data: {
                stats: [],
                textEntry: '',
                evolutions: []
            }
        };
    }  

    componentDidMount() {
        this.props.onLoad();
    }

    toggle() {
        if (!this.state.data.entryText) {
            this.gatherPokeData(this.props.id)
            .then(data => this.setState({data}));
        }
        this.setState( prevState => ({ collapse: !prevState.collapse })); 
    }


    render() {
        const { types, entryText, stats, evolutions, moveset } = this.state.data;
        const img = getImageByID(this.props.id);
        const name = capitalize(this.props.name);
        const entryNumber = this.props.entry;

        let pokeData = '';
        if (this.state.collapse || 1===1) {
            pokeData = 
                <Fragment>
                    <PokeReview types={types}/>
                    <br/>
                    <PokeStats stats={stats} />
                    <br/>
                    <PokeEntry entryText={entryText} />
                    <br/>
                    <PokeEvolutions evolutions={evolutions} />
                    <br/>
                    <PokeMoves moveset={moveset}/>
                </Fragment>
        }

        return (
            <ListGroupItem action style={itemStyle} onClick={this.toggle}>
                <Row>
                    <Col xs='3' className='text-center'>
                        <div style={imgStyle}>
                            <img src={img} alt='item' style={imgStyle}/>
                        </div>
                    </Col>
                    <Col xs='6' className='align-self-center text-center'>
                        <p>{name}</p>
                    </Col>
                    <Col xs='3' className='align-self-center text-center'>
                        <p>{entryNumber}</p>
                    </Col>
                </Row>  

                <Collapse 
                    isOpen={this.state.collapse} 
                    onEntered={this.props.onLoad}
                    onExited={this.props.onLoad}
                    onExiting={this.remeasureItem}
                >
                    {pokeData}
                    <br/>
                </Collapse>       
            </ListGroupItem>
        )
    }

    
    async gatherPokeData(id) {
        let p = new Pokedex({protocol: 'https'});
        
        let [pokemon, pokemonSpecies] = 
            await Promise.all([
                p.getPokemonByName(id),
                p.getPokemonSpeciesByName(id)]);

        let movesetPromise = processMoves(pokemon.moves);
        let evolutionPromise = p.resource(pokemonSpecies.evolution_chain.url)

        let data = Object.assign( 
            {types: processTypes(pokemon.types)},
            {stats: pokemon.stats}, 
            {entryText: getEntryText(pokemonSpecies.flavor_text_entries)},
            {evolutions: processEvolutions((await Promise.resolve(evolutionPromise)).chain)},
            {moveset: await Promise.resolve(movesetPromise)})
            
        return data;
    }

    remeasureItem = () => {
        let intervalID = setInterval(this.props.onLoad, 30);
        setTimeout(() => clearInterval(intervalID), 500);
    }

}

export default Item
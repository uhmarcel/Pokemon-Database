import React, { Component, Fragment } from 'react';
import ItemSettings from './ItemSettings';
import ItemList from './ItemList';
import Pokedex from 'pokedex-promise-v2';


class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            filtered: []
        }
    }

    async componentDidMount() {
        this.applyPokedex("national");
    }

    async gatherPokesByPokedex(pokedex) {
        let p = new Pokedex({protocol: 'https'});
        let data = await p.getPokedexByName(pokedex)
        return data.pokemon_entries;
    }

    applyPokedex = async (pokedex) => {
        let pokes = await this.gatherPokesByPokedex(pokedex);
        this.setState({pokemons: pokes, filtered: pokes});
    }

    applyFilter = async (filterValue) => {
        const filter = filterValue.toLowerCase();
        const pokemons = this.state.pokemons;
        const filterFunction = (p) => {
            for (let i=0; i < filter.length; i++) {
                if (filter.charAt(i) !== p.pokemon_species.name.charAt(i)) 
                    return false;
            }
            return true;
        }
        const output = filter ? pokemons.filter(filterFunction) : pokemons;  
        this.setState({filtered: output});
    }


    render() {
        const filtered = this.state.filtered;
        const applyFilter = this.applyFilter;
        const applyPokedex = this.applyPokedex;

        return (
            <Fragment>
                <ItemSettings 
                    applyPokedex={applyPokedex}
                    applyFilter={applyFilter}
                />
                <ItemList 
                    pokemons={filtered}
                />
            </Fragment>
        )
    }
    
}

export default Sidebar

import React, { Component } from 'react';
import { ListGroupItem, Input, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Pokedex from 'pokedex-promise-v2';
import { formatName } from '../../library/utilities';

const styles = {
    // background: '#d8d8d8'
}


class ItemSettings extends Component {

    state = {
        pokedexs: [],
        input: '',
        dropdown: false
    }

    async componentDidMount() {
        let dexs = await this.gatherAllPokedexs();
        this.setState({pokedexs: dexs});
    }

    async gatherAllPokedexs() {
        let p = new Pokedex({protocol: 'https'});
        let data = await p.getPokedexsList();
        return data.results.map(e => e.name);
    }

    toggleDropdown = () => {
        this.setState(prevState => ({dropdown: !prevState.dropdown}));
    }


    render() {
        const pokedexs = this.state.pokedexs;
        const dropdown = this.state.dropdown;
        const applyFilter = this.props.applyFilter;
        const applyPokedex = this.props.applyPokedex;

        return (
            <ListGroupItem className='sticky-top bg-dark' style={{borderRadius: '0'}}>
                <InputGroup>
                    <Input 
                        type = "text" 
                        autoComplete = "off" 
                        placeholder = "Search" 
                        onChange = {e => applyFilter(e.target.value)} 
                        style = {styles}
                    />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdown} toggle={this.toggleDropdown}>
                        <DropdownToggle color='info' caret> Pokedex </DropdownToggle>
                        <DropdownMenu>
                            {pokedexs.map( dex => (
                                <DropdownItem 
                                    onClick={e => applyPokedex(e.target.name)}
                                    key={dex}
                                    name={dex}
                                >
                                    {formatName(dex)}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
            </ListGroupItem>
        );
    }

}

export default ItemSettings

import React, { Component } from 'react';
import { ListGroupItem, Input, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Pokedex from 'pokedex-promise-v2';
import { formatName } from '../../library/utilities';

class ItemSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokedexs: [],
            input: '',
            dropdown: false
        }
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
                    />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdown} toggle={this.toggleDropdown}>
                        <DropdownToggle color='info' caret> Dex </DropdownToggle>
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

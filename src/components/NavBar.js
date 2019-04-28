import React, { Component } from 'react';
//import { NavLink as Nlink, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';



class NavBar extends Component {

    constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
            isOpen: false
            };
        }
        toggle() {
            this.setState({
            isOpen: !this.state.isOpen
            });
        }
        render() {
            return (
            <div className='sticky-top'>
                <Navbar color='dark' dark expand="md">
                <NavbarBrand href="/">Pokedex</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default NavBar
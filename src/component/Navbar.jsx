import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBIcon,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer
    } from "mdbreact";

function NavbarComp(){

    const [id] = React.useState(localStorage.getItem('id'));
    const [name] = React.useState(localStorage.getItem('name'));
    const [isOpen, setIsopen] = React.useState(false)

    // React.useEffect(()=>{

    //     var id = localStorage.getItem('id');
    //     var name = localStorage.getItem('name');
    //     setID(id);
    //     setName(name);
    // });

    const toggleCollapse = () => {
        setIsopen(!isOpen)
      }

    const onClickLogOut = () =>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        window.location = '/';
    }

    return(
        <MDBNavbar color="indigo" dark expand="md">
          <MDBContainer fluid>
        <MDBNavbarBrand>
          <strong className="white-text">RUCIKA</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        {
            id ? (
                <>
                 <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink to="/customer">Customer</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem >
                        <MDBNavLink to="/order">Order</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/product">Product</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/supplier">Supplier</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default" right>
                                <MDBDropdownItem>
                                <MDBIcon icon="user-circle"/> &nbsp; 
                                    <span style={{fontStyle:'italic'}}>{name}</span>
                                </MDBDropdownItem>
                                <MDBDropdownItem href="/profile">Profile</MDBDropdownItem>
                                <MDBDropdownItem href="#!" onClick={onClickLogOut}>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                </>
            ) : null
        }
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    )
}

export default NavbarComp;
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Nav, NavDropdown, Navbar, Image, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBar from './searchBar';
import { twj } from 'tw-to-css';
import logo from '../logo-1.png';



function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch (logout())
    }


    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Nav.Link>                            
                            <Image src={logo}  style={twj("w-52")}/>
                        </Nav.Link>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <div style={twj("ml-auto")}>
                            <SearchBar />
                        </div>

                        <Nav style={twj("ml-auto")}>

                            <LinkContainer to='/'>
                                <Nav.Link>
                                    <i className='fas fa-home' style={twj("mr-2")}></i>Home
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart' style={twj("mr-2")}></i>Cart
                                </Nav.Link>
                            </LinkContainer>                            
                                
                            {
                                userInfo ? (  
                                    <Dropdown as={NavItem}>

                                        <Dropdown.Toggle as={NavLink} id='name'>
                                            <i className='fas fa-user' style={twj("mr-2")}></i>                                    
                                            {
                                                userInfo.isAdmin ? (
                                                    userInfo.name.split(' ')[0] + ' ' + '(Admin)'
                                                ) : (
                                                    userInfo.name.split(' ')[0]
                                                )
                                            }
                                        </Dropdown.Toggle>
                                        
                                        <Dropdown.Menu>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>                                     

                                            {
                                                userInfo.isAdmin && (
                                                    <>
                                                        <LinkContainer to='/admin/userlist'>
                                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                                        </LinkContainer>
                                                        
                                                        <LinkContainer to='/admin/productlist'>
                                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                                        </LinkContainer>
                                                        
                                                        <LinkContainer to='/admin/orderlist'>
                                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                                        </LinkContainer>
                                                    </>
                                                )
                                            }
                                                
                                            <NavDropdown.Item onClick={ logoutHandler }>
                                                Logout
                                            </NavDropdown.Item>  
                                        </Dropdown.Menu> 
                                    
                                    </Dropdown>

                                ) : (                            
                                        <LinkContainer to='/login'>
                                            <Nav.Link>
                                            <i className='fas fa-user' style={twj("mr-2")}></i>Login
                                            </Nav.Link>
                                        </LinkContainer>
                                    )
                            }
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
    
export default Header
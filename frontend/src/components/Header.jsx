import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'

// Header component
const Header = () => {
  const { cartItems } = useSelector(state => state.cart)

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="E-Commerce" />
              E-Commerce
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className='ms-auto'>
              <LinkContainer to="/cart">
                <Nav.Link>
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft:
                      '5px' }}>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                    )}
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
import './App.css';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useStore } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import SignupScreen from './screens/SignupScreen';





function App() {
const {state, ctxDispatch} = useStore();
const {cart, userInfo} = state;

const signoutHandler = () => {
  ctxDispatch({type: 'USER_SIGNOUT'});
  localStorage.removeItem('userInfo');
  localStorage.removeItem('shippingAddress');
}
  return (
    
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={2} />
        <header>
          <Navbar bg="dark" variant="dark">
              <Container fluid className='px-5'>
                <LinkContainer to="/">
                  <Navbar.Brand>Premium</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                  <Link to="/cart" className="nav-link">Cart
                    {
                      cart.cartItems.length > 0 && 
                        (<Badge pill bg="danger">
                          {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </Badge>)
                    }
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  )}
                </Nav>
              </Container>
          </Navbar>
        </header>
        <main className='bkmain'>
          <Container >
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route path="/cart" element={<CartScreen/>} />
              <Route path="/product/:slug" element={<ProductScreen/>} />
              <Route path="/signin" element={<SigninScreen/>} />
              <Route path="/signup" element={<SignupScreen/>} />
              <Route path="/shipping" element={<ShippingAddressScreen/>} />
              <Route path="/payment" element={<PaymentScreen/>} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Navbar bg="dark" varient="dark">
            <Container fluid className='px-5'>
              <Navbar.Text  className="text-white mx-auto">
                All rights reserved &copy; {new Date().getFullYear()}
              </Navbar.Text>
            </Container>
            
          </Navbar> 
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
<div className="text-center"></div>
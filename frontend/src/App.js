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
import SignupScreen from './screens/SignupScreen';
//import TestScreen from './screens/TestScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import { clearLocalStorage } from './utils';






function App() {
const {state, ctxDispatch} = useStore();
const {cart, userInfo} = state;

const signoutHandler = () => {
  ctxDispatch({type: 'USER_SIGNOUT'});
  clearLocalStorage();
}
  return (
    
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={2} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
              <Container fluid className='px-5'>
                <LinkContainer to="/">
                  <Navbar.Brand>Premium</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link">Cart
                  {
                    cart.cartItems.length > 0 && 
                      (<Badge pill bg="danger">
                        {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                      </Badge>)
                  }
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown" align="end">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="/signin"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">Sign In</Link>
                )}
              </Nav>
                </Navbar.Collapse>
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
              <Route path="/payment" element={<PaymentMethodScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path='/orderhistory' element={<OrderHistoryScreen/>} />
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
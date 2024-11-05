import './App.css';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
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
import { clearLocalStorage, getError } from './utils';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from './Component/SearchBox';






function App() {
const {state, ctxDispatch} = useStore();
const {cart, userInfo} = state;

const signoutHandler = () => {
  ctxDispatch({type: 'USER_SIGNOUT'});
  clearLocalStorage();
}

const [sidebarIsOpen, setSidebarIsOpen] =useState(false);
const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/category`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  fetchCategories();  
}, []);
  return (
    
    <BrowserRouter>
      <div className={sidebarIsOpen 
        ? "d-flex flex-column site-container active-cont" 
        : "d-flex flex-column site-container"}>
        <ToastContainer position="bottom-center" limit={2} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
              <Container fluid className='px-5'>
                <Button variant="dark" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                  <i className="fas fa-bars"></i>
                </Button>
                <LinkContainer to="/">
                  <Navbar.Brand>Premium</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <SearchBox />
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
        <div 
          className={
            sidebarIsOpen 
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column" 
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"}>
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer to={{pathname:`/search`, search:`?category=${category}`}}
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                  <Nav.Link className="text-white">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
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
              <Route path="/orderhistory" element={<OrderHistoryScreen/>} />
              <Route path="/profile" element={<ProfileScreen/>} />
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
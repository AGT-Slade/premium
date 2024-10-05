import './App.css';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useStore } from './Store';
import CartScreen from './screens/CartScreen';





function App() {
const {state} = useStore();
const {cart} = state;
  return (
    
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
              <Container fluid className='px-5'>
                <LinkContainer to="/">
                  <Navbar.Brand>Premium</Navbar.Brand>
                </LinkContainer>
                {<Nav className="me-auto">
                  <Link to="/cart" className="nav-link">Cart
                    {
                      cart.cartItems.length > 0 && 
                        (<Badge pill bg="danger">
                          {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </Badge>)
                    }
                  </Link>
                </Nav>}
              </Container>
          </Navbar>
        </header>
        <main className='bkmain'>
          <Container fluid className='px-5'>
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route path="/cart" element={<CartScreen/>} />
              <Route path="/product/:slug" element={<ProductScreen/>} />
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
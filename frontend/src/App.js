import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Premium</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/product/:slug" element={<ProductScreen/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

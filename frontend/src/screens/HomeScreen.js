import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(
    () => {
      const fetchProducts = async () => {
        const results = await axios.get('/api/products');
        setProducts(results.data);
      }
      fetchProducts();
    }, []
  );

    return (
        <div>
            <h1>Products</h1>
          <div className="products">
          {products.map((productArray) => 
             (
                <div className="product" key={productArray.slug}>
                  <Link to={`/product/${productArray.slug}`}>
                    <img src={productArray.image} alt={productArray.name} />
                  </Link>
                  <div className="product-info">
                    <Link to={`/product/${productArray.slug}`}>
                      <p>{productArray.name}</p>
                    </Link>
                    <p><strong>{productArray.price}</strong></p>
                    <button type="button">Add to cart</button>
                  </div>
                </div>
              )
          )}
          </div>
        </div>
    );
}export default HomeScreen;
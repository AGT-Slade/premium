import { Link } from 'react-router-dom';
import data from '../data.js';

function HomeScreen() {
    return (
        <div>
            <h1>Products</h1>
          <div className="products">
          {data.products.map((productArray) => 
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
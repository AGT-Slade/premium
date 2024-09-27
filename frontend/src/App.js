import './App.css';
import data from './data.js';

function App() {
  return (
    <div>
      <header>
        <a href="/" target="" rel=""><h1>Premium</h1></a>
      </header>
      <main>
        <h1>Products</h1>
        <div className="products">
        {data.products.map(
          function (productArray) {
            return (
              <div className="product" key={productArray.slug}>
                <a href={`/product/${productArray.slug}`}>
                  <img src={productArray.image} alt={productArray.name} />
                </a>
                <div className="product-info">
                  <a href={`/product/${productArray.slug}`}>
                    <p>{productArray.name}</p>
                  </a>
                  <p><strong>{productArray.price}</strong></p>
                  <button type="button">Add to cart</button>
                </div>
              </div>
            )
          }
        )}
        </div>
      </main>
    </div>
  );
}

export default App;

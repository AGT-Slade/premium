import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';


function reducer(state, action) {
  switch(action.type) {
    case 'FETCH_REQUEST': return {...state, loading: true };
    case 'FETCH_SUCCESS': return {...state, loading: false, products: action.payload };
    case 'FETCH_FAIL': return {...state, loading: false, error: action.payload};
    default: return state;
  }
}

function HomeScreen() {
  const [{loading, products, error}, dispatch] = useReducer(reducer, {
    loading:true, products: [], error: ''
  });
console.log(typeof error);
  

  useEffect(() => {
      const fetchProducts = async () => {
        dispatch({type: 'FETCH_REQUEST'});
        try {
          const results = await axios.get('/api/products');
          dispatch({type: 'FETCH_SUCCESS', payload: results.data});
        } catch (err) {
          dispatch({type: 'FETCH_FAIL', payload: err.message});
        }};
       
      fetchProducts();
    }, []
  );

    return (
        <div>
            <h1>Products</h1>
          <div className="products">
            {loading? <div>Loading...</div> 
            : error? <div>{error}</div> : (products.map((productArray) => 
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
           ))}
          </div>
        </div>
    );
}export default HomeScreen;
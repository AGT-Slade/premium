
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Component/Product';

const reducer = (state, action) => {
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
                : error? <div>{error}</div> :
                <Row>
                  {products.map((product) => 
                    (
                      <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                        <Product product = {product}/>
                      </Col> 
                    ))}
                </Row> 
                }
              </div>
            </div>
          );
}

export default HomeScreen;
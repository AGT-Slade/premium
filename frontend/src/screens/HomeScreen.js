
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Component/Product';
import {Helmet} from 'react-helmet-async';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { getError } from '../utils';

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
          dispatch({type: 'FETCH_FAIL', payload: getError(err)});
        }};
       
      fetchProducts();
    }, []
  );

  return (
            <div>
              <Helmet>
                <title>Premium</title>
              </Helmet>
                <h1 className="my-4 text-white">Products</h1>
              <div className="products">
                {loading? <LoadingBox/> : 
                error? <MessageBox variante="danger">{error}</MessageBox> :
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
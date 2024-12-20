import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Component/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { getError } from "../utils";
import { useStore } from "../Store";




const reducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_REQUEST': return {...state, loading: true };
      case 'FETCH_SUCCESS': return {...state, loading: false, product: action.payload };
      case 'FETCH_FAIL': return {...state, loading: false, error: action.payload};
      default: return state;
    }
  }

function ProductScreen() {
    const navigate =useNavigate();
    const params = useParams();
    const {slug} = params;

    const initialState = {
        loading: true,
        error: '',
        product: []
    }

    const [{loading, product, error}, dispatch] = useReducer(reducer, initialState);

  

      useEffect(() => {
          const fetchProducts = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
              const results = await axios.get(`/api/products/slug/${slug}`);
              dispatch({type: 'FETCH_SUCCESS', payload: results.data});
            } catch (err) {
              dispatch({type: 'FETCH_FAIL', payload: getError(err)});
            }};
           
          fetchProducts();
        }, [slug] 
      );


      const {state, ctxDispatch} = useStore();
      const {cart} = state;
       const addToCartHandler = async () => {
        
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/id/${product._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry. Maximum quantity available reached');
          return;
        } 
         ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: {...product, quantity}
        });
        navigate("/cart");
       }
    
    return(
          loading? <LoadingBox/> : 
          error? <MessageBox variante="danger">{error}</MessageBox> : 
          <div>
            <Row>
              <Col md={6} className="my-2">
                <img
                  className="img-large"
                  src="/images/p1.jpg"
                  alt={product.name}
                />
              </Col>
              <Col md={3} className="my-2">
                <ListGroup>
                  <ListGroup.Item>
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3} className="my-2">
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {
                              product.countInStock>0 ? 
                              <Badge pill bg="primary">In Stock</Badge> :
                              <Badge pill bg="danger">Not Available</Badge>
                            }
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {
                          product.countInStock>0 && (
                            <ListGroup.Item>
                              <div className="d-grid">
                                <Button onClick={addToCartHandler} variant="primary">Add to Cart</Button>
                              </div>
                            </ListGroup.Item>
                          )
                        }
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
           
          </div>
      );
}


            

export default ProductScreen;
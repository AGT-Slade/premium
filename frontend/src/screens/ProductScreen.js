import { useParams } from "react-router-dom";
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



const reducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_REQUEST': return {...state, loading: true };
      case 'FETCH_SUCCESS': return {...state, loading: false, product: action.payload };
      case 'FETCH_FAIL': return {...state, loading: false, error: action.payload};
      default: return state;
    }
  }

function ProductScreen() {
    const params = useParams();
    const {slug} = params;

    const [{loading, product, error}, dispatch] = useReducer(reducer, {
        loading:true, product: [], error: ''
      });
      
    
      useEffect(() => {
          const fetchProducts = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
              const results = await axios.get(`/api/product/${slug}`);
              dispatch({type: 'FETCH_SUCCESS', payload: results.data});
            } catch (err) {
              dispatch({type: 'FETCH_FAIL', payload: err.message});
            }};
           
          fetchProducts();
        }, [slug]
      );
    
    return(
          loading? <div>Loading...</div> : 
          error? <div>{error}</div> : 
          <div>
            <Row>
              <Col md={6}>
                <img
                  className="img-large"
                  src="/images/p1.jpg"
                  alt={product.name}
                />
              </Col>
              <Col md={3}>
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
              <Col md={3}>
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
                                <Button variant="primary">Add to Cart</Button>
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
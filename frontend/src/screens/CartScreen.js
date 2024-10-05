import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from "../Component/MessageBox";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';

function CartsScreen() {
    const {state, ctxDispatch} = useStore(); 
    const {cart} = state;
    const {cartItems} = cart;
    return (
        <div>
            <Helmet>
                <title>
                    Shopping Cart
                </title>
            </Helmet>
            <h1 className="text-white">Shopping Cart</h1>
            <Row>
                <Col md={8}>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>) : 
                    (
                       <ListGroup> 
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"/>{` `}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>                                   
                                        <Button variant="light" disabled={item.quantity === 1}>
                                        <i class="fa-solid fa-circle-minus"></i>
                                        </Button>{` `}
                                        <span>{item.quantity}</span>{` `}
                                        <Button variant="light">
                                            <i className="fa-solid fa-circle-plus"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light">
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                       </ListGroup> 
                    )
                }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items): $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            disabled={cartItems.length === 0}
                                            >Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartsScreen;
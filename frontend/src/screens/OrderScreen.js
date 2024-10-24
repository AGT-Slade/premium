import { useEffect, useReducer } from "react";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/esm/ListGroup";

function OrderScreen() {
    const reducer = (state, action) => {
        switch(action.type) {
            case 'FETCH_REQUEST':
                return { ...state, loading: true, error: '' };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, order: action.payload, error: '' };
            case 'FETCH_FAIL':
                return { ...state, loading: false, error: action.payload };
            default:
                return state;
        }
    }

    const [{loading, error, order}, dispatch] = useReducer(reducer, {loading: true, order: {}, error: ''});
    const {state: {userInfo}} = useStore();
    const params = useParams();
    const {id: orderId} = params;
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`http://localhost:3000/api/orders/id/${orderId}`, {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                });
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: getError(err)});
            }
        }
        if (!userInfo) {
            return navigate('/login');
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
       
    }, [order, orderId, userInfo, navigate]);

    return (
        loading ? <LoadingBox/> :
        error? <MessageBox variante="danger">{error}</MessageBox> :
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3 text-white">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                <strong>Address:</strong> {`${order.shippingAddress.address}, 
                                ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, 
                                ${order.shippingAddress.country}`}
                            </Card.Text>
                            {order.isDelivered ? <MessageBox variante="success">Delivered at {order.deliveredAt}</MessageBox> : <MessageBox variante="danger">Not Delivered</MessageBox>}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? <MessageBox variante="success">Paid at {order.paidAt}</MessageBox> :
                             <MessageBox variante="danger">Not Paid</MessageBox>}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="img-fluid rounded img-thumbnail" /> {""}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                <span>${item.price}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Order Total</strong></Col>
                                        <Col><strong>${order.totalPrice.toFixed(2)}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>    
            </Row>
        </div>
    )
}

export default OrderScreen;
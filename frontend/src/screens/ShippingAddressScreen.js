import { Helmet } from "react-helmet-async";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import CheckoutSteps from "../Component/CheckoutSteps";




function ShippingAddressScreen() {
    const navigate = useNavigate();
    const {state, ctxDispatch} =  useStore();
    const {
        userInfo,
        cart: {shippingAddress}
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }}, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch(
            {
                type: 'SAVE_SHIPPING_ADDRESS', 
                payload: {
                            fullName, 
                            address, 
                            city, 
                            postalCode, 
                            country
                        }
            }
        );
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({fullName, address, city, postalCode, country})
        );
        navigate('/payment');
    }


    return <div>
                <Helmet>
                    <title>Shipping Address</title>
                </Helmet>
                <CheckoutSteps step1 step2 ></CheckoutSteps>
                <Container className="small-container">
                <h1 className="my-4 text-white">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-4" controlId="fullName">
                        <Form.Label className="text-white">Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="text-white">Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label className="text-white">City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label className="text-white">Postal Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label className="text-white">Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>

                </Form>
                </Container>
            </div>
}

export default ShippingAddressScreen;
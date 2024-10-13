import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../Component/CheckoutSteps";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useStore } from "../Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function PaymentMethodScreen() {
    const navigate = useNavigate();
    const {state, ctxDispatch} = useStore();
    const {cart} = state;
    const {shippingAddress, paymentMethod} = cart;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }
    return <div>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <div className="container small-container">
                <Helmet>
                    <title>Payment Method Screen</title>
                </Helmet>
                <h1 className="my-4 text-white">Payment Method</h1>
                <Form className="text-white" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check 
                        type="radio" 
                        id="PayPal" 
                        label="Alfonso's Credit Card" 
                        value="PayPal"
                        checked={paymentMethodName === 'PayPal'}
                        onChange={(e)=>setPaymentMethod(e.target.value)}/>
                    </div> 
                    <div className="mb-3">
                        <Form.Check 
                        type="radio" 
                        id="Stripe" 
                        label="Stripe" 
                        value="Stripe"
                        checked={paymentMethodName === 'Stripe'}
                        onChange={(e)=>setPaymentMethod(e.target.value)}/>
                    </div>
                    <Button type="submit">Continue</Button>
                </Form>
                </div> 
            </div>;
}

export default PaymentMethodScreen;
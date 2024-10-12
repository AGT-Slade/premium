import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useStore } from "../Store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";

function SignupScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const {state, ctxDispatch} = useStore();
    const {userInfo} = state;

    const submitHandler = async (e) => {
        e.preventDefault();
      
        const successToastId = "success-toast"; 
        const errorToastId = "error-toast";
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const {data} = await axios.post('/api/users/signup', {
                name,
                email,
                password
            });
             // Dismiss any error toasts that might still be active
             if (toast.isActive(errorToastId)) {
                toast.dismiss(errorToastId);
            }
            ctxDispatch({type: 'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

           
            // Display success toast and replace any existing success toasts
            if (!toast.isActive(successToastId)) {
                toast.success('Sign in successful!', { toastId: successToastId });
            }

        // Clear any existing error toasts
        }
         catch (error) {

            if (toast.isActive(successToastId)) {
                toast.dismiss(successToastId);
            }
    
            // Display error toast and replace any existing error toasts
            if (!toast.isActive(errorToastId)) {
                toast.error(getError(error), { toastId: errorToastId });
            }
        }
    }


    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return <div>
                <Container className="small-container">
                    <Helmet>
                        <title>Sign Up</title>
                    </Helmet>
                    <h1 className="my-3 text-white">Sign Up</h1>
                    <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="text-white">Name</Form.Label>
                            <Form.Control autoComplete="current-password" type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control autoComplete="current-password" type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control autoComplete="current-password" type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label className="text-white">Confirm Password</Form.Label>
                            <Form.Control autoComplete="current-password" type="password" placeholder="Confirm password" required onChange={(e) => setconfirmPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <div className="mb-3">
                                <Button type="submit">Sign Up</Button>
                            </div>
                            <div className="mb-3 text-white">
                                Already have an account?{' '}
                                <Link to={`/singin?redirect=${redirect}`}>Sing-In</Link>
                            </div>
                        </Form.Group>
                    </Form>
                </Container>  
            </div>;
}

export default SignupScreen;
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

function SigninScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, ctxDispatch} = useStore();
    const {userInfo} = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/signin', {
                email,
                password
            });
            ctxDispatch({type: 'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
            toast.success('Sign in successful!');
        }
         catch (error) {
            const toastId = "error-toast";
            if (!toast.isActive(toastId)) {
                toast.error(getError(error), { toastId });
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
                        <title>Sign In</title>
                    </Helmet>
                    <h1 className="my-3 text-white">Sign In</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control autoComplete="current-password" type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control autoComplete="current-password" type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <div className="mb-3">
                                <Button type="submit">Sign In</Button>
                            </div>
                            <div className="mb-3 text-white">
                                New customer?{' '}
                                <Link to={`/singup?redirect=${redirect}`}>Create your account</Link>
                            </div>
                        </Form.Group>
                    </Form>
                </Container>  
            </div>;
}

export default SigninScreen;
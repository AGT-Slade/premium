import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function SigninScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    return <div>
                <Container className="small-container">
                    <Helmet>
                        <title>Sign In</title>
                    </Helmet>
                    <h1 className="my-3 text-white">Sign In</h1>
                    <Form>
                        <Form.Group class="mb-3" controlId="email">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group class="mb-3" controlId="password">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" required/>
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
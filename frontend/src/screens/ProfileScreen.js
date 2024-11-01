import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function reducer(state, action) {
    switch(action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}

function ProfileScreen() {
    const {state, ctxDispatch} = useStore();
    const {userInfo} = state;

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false
    });


    const submitHandler = async(e) => {
        e.preventDefault(); 
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        } else {
            try {
                dispatch({type: 'UPDATE_REQUEST'});
                const {data} = await axios.put('/api/users/profile', {
                    name,
                    email,
                    password
                }, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                });
                dispatch({type: 'UPDATE_SUCCESS'});
                ctxDispatch({type: 'USER_SIGNIN', payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
                toast.success('Profile updated successfully');
            } catch(err) {
                dispatch({type: 'UPDATE_FAIL'});
                toast.error(getError(err));
            }   
        }
        
    }

    return <div className="container small-container">
                <Helmet>
                    <title>Profile Screen</title>
                </Helmet> 
                <h1 className="my-4 text-white">Profile Screen</h1>
                <form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-white">Name</Form.Label>   
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-white">Email</Form.Label>   
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="text-white">Password</Form.Label>   
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="text-white">Confirm Password</Form.Label>   
                        <Form.Control
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit">{loadingUpdate ? (
                            <>
                            <Spinner animation="border" size="sm" /> Updating...
                             </>
                            ) : (
                                'Update'
                             )}
                        </Button>
                    </div>
                </form>
    </div>
}

export default ProfileScreen;
import { Helmet } from "react-helmet-async"
import LoadingBox from "../Component/LoadingBox"
import MessageBox from "../Component/MessageBox"
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import { useEffect, useReducer } from "react";
import { getError } from "../utils";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
        }       
}



function OrderHistoryScreen() {
    const navigate = useNavigate();

    const { state } = useStore();
    const { userInfo } = state;
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: [], 
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });    
            try {
                const { data } = await axios.get('/api/orders/mine', {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [userInfo]);

 

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1 className="my-3 text-white">Order History</h1>
            { loading ? (<LoadingBox/>) 
            : error ? (<MessageBox variant="danger">{error}</MessageBox>) 
            :   (
                    <div class="table-responsive">
                        <table className="table table-striped table-bordered table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">PAID</th>
                                    <th scope="col">DELIVERED</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            <Button type="button" variant="light" onClick={() => navigate(`/order/${order._id}`)}>
                                                Details        
                                            </Button>                                               
                                        </td>                                                
                                    </tr>                                    
                                ))}                                        
                            </tbody>                            
                        </table>    
                    </div>
                )
            }
        </div>
    )
}

export default OrderHistoryScreen
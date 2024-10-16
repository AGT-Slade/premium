import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useStore } from '../Store';

function Product(props) {
    const {product} = props;
    const {state, ctxDispatch} = useStore();
    const {cart} = state;
    const {cartItems} = cart;



    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/id/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Maximum quantity available reached');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    }

    return (
            <Card key={product.slug}>   
                <Link to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                    <Card.Text>${product.price}</Card.Text>
                    {product.countInStock === 0 ? <Button variant="light" disabled>Out of stock</Button> : 
                    <Button
                        onClick={() => addToCartHandler(product)}  
                    >
                        Add to cart
                    </Button> }
                    
                </Card.Body>
            </Card>  
            )
}



export default Product;
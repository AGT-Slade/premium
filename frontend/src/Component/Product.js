import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
//import { useStore } from '../Store';

function Product(props) {
    const {product} = props;
    // const {ctx} = useStore();
    //    const addToCartHandler = () => {
    //      ctx({type: 'ADD_TO_CART', payload: {...product}});
    //    }
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
                    {product.countInStock === 0 ? <Button variant="danger" disabled>Out of stock</Button> : 
                    <Button  >Add to cart</Button> }
                    
                </Card.Body>
            </Card>  
            )
}



export default Product;
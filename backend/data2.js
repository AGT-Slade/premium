import bycrypt from 'bcryptjs';

const data = {
    products: [
        {
            // _id: '1',
            name: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 50,
            countInStock: 5,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 17,
            description: 'high quality shirt'
        },
        {
            // _id: '2',
            name: 'Adidas Fit Shirt',
            slug: 'adidas-fit-shirt',
            category: 'Shirts',
            image: './images/p2.jpg',
            price: 60,
            countInStock: 0,
            brand: 'Adidas',
            rating: 5.0,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            // _id: '3',
            name: 'Nike Slim pants',
            slug: 'nike-slim-pants',
            category: 'Pants',
            image: './images/p3.jpg',
            price: 25,
            countInStock: 4,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product'
        },
        {
            // _id: '4',
            name: 'Adidas Fit Pants',
            slug: 'adidas-fit-pants',
            category: 'Pants',
            image: './images/p4.jpg',
            price: 30,
            countInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        }
    ],
    users:[
        {
            name: 'John',
            email: 'joe@lamol.com',
            password: bycrypt.hashSync('147'),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'joe@lol.com',
            password: bycrypt.hashSync('369'),
            isAdmin: false

        }
    ]
}

export default data;
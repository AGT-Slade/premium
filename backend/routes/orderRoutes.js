import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x)=> ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    });
    const createdOrder = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
}));


orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });    
    res.send(orders);
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Orders Not Found' });
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        console.log(req.body);
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            payer: {
                payer_id: req.body.payer.payer_id,
                firstName: req.body.payer.name.given_name,
                lastName: req.body.payer.name.surname,
                email_address: req.body.payer.email_address,
                address: {
                    country_code: req.body.payer.address.country_code
                }
            }
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}));    

export default orderRouter;
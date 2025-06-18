const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RiceProduct',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        } // giá tại thời điểm mua
    }],
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true, default: 'Vietnam' }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'Banking', 'Credit Card', 'E-Wallet', 'Thanh toán khi nhận hàng']
    },
    paymentResult: { // trả về từ gateway thanh toán, nếu có
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: {
        type: Number,
        required: true,
        min: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipping', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

// This is a seed file to populate the database with some initial data

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/festifyU', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const Order = require('./models/order');

const orders = [
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        event: '6652f8bd28a1bd691a38d63b'
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        event: '6652f8bd28a1bd691a38d63c',
    },
    {
        name: 'Jim Doe',
        email: 'jimdoe@example.com',
        event: '6652f8bd28a1bd691a38d63d'
    }
];

Order.insertMany(orders).then(() => {
    console.log('Orders successfully created');
})
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const Event = require('./models/event');
const bcrypt = require('bcrypt');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/festifyU', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    res.redirect('/home');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.redirect('/home');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

app.get('/home', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('home', { events: events });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching events');
    }
});

app.get('/history', (req, res) => {
    let person = {
        name: 'John Doe',
        age: 30
    };
    res.render('history', { person: person });
});

app.get('/event', (req, res) => {
    res.render('event');
});

app.get('/profile', async (req, res) => {
    res.render('profile');
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});

// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
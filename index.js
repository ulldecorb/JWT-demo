const express = require('express');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();
const port = process.env.PORT || 8080;
const productsRouter = require('./routes/products.route');

mongoose.connect(
    process.env.DDBB_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
);

// Adjust middleWares
// Parsing Parameters
// server.use(express.urlencoded({ extended: false }));

server.use(cors());
server.use(express.json());

server.use('/', productsRouter);

// server.get('/',(req, res )=> {
//     const {products} = req;
//     res.json(products);
    // res.send(`
    // <html>
    //     <head>
    //         <title>Home</title>
    //     </head>
    //     <body>
    //         <h1>Home</h1>
    //         <a href="http://localhost:8080/login">Go to Login</a>
    //     </body>    
    // </html>    
    // `);
// })

server.get('/login', ( req, res ) => {
    res.send(`
    <html>
        <head>
        <style>body{background-color: red;color:yellow;}</style>
            <title>Login</title>
        </head>
        <body>
            <form method="POST" action="/auth">
                User name: <input type="text" name="username"><br>
                Password: <input type="password" name="password"><br>
                <input type="submit" value="Start session" />
            </form>
        </body>    
    </html>
    `);
});

server.post('/auth', ( req, res ) => {
    const { username, password } = req.body;
    //Consultar BBDD i validar
    //user && password
    const user = {username: username};
    const accessToken = generateAccessToken( user );

    res.header('authorization', accessToken).json({
        user: username,
        password: password,
        message: 'User autenticate',
        token: accessToken,
        newProduct: {
            ntf: '💥', id: 'dc482bbf-c72d-4454-8e08-fec0a9c29a7d', productName: 'big bang', category: 'feature', stock: 35, price: 999
        }
    });
});

server.get('/api', validateToken, ( req, res ) => {
    res.json({
        username: req.user,
        products: [            
            {
              ntf: '🥑', id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', productName: 'avocado', category: 'meal', stock: 9, price: 34
            },
            {
              ntf: '☠', id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', productName: 'death', category: 'human', stock: 1, price: 666
            }
        ]
    });
});

function generateAccessToken(user) {
    return jwt.sign( user, process.env.SECRET, { expiresIn: '10m'});
}

function validateToken ( req, res, next) {
    const accessToken = req.headers['authorization'] || req.query.accesstoken;

    if(!accessToken) res.send('Access denied');

    if(accessToken) jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
            res.send('Access denied, token expired or incorrect');
        } else {
            req.user = user;
            next();
        }
    });
}

server.listen(port, () => {
    console.log(`Node.js Server is ${chalk.green('running...')} PORT: ${chalk.yellow(port)}`)
});
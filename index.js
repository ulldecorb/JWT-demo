const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Adjust middleWares
// Parsing Parameters
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req, res )=> {
    res.send(`
    <html>
        <head>
            <title>Home</title>
        </head>
        <body>
            <h1>Home</h1>
            <a href="http://localhost:8080/login">Go to Login</a>
        </body>    
    </html>    
    `);
})

app.get('/login', ( req, res ) => {
    res.send(`
    <html>
        <head>
            <title>Login</title>
        </head>
        <body>
            <form method="POST" action="/auth">
                Nombre de usuario: <input type="text" name="text"><br>
                Contraseña: <input type="password" name="password"><br>
                <input type="submit" value="Iniciar sesion" />
            </form>
        </body>
    
    </html>
    `);
});

app.get('/api', validateToken, ( req, res ) => {
    res.json({
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

app.post('/auth', ( req, res ) => {
    const { username, password } = req.body;

    //Consultar BBDD i validar
    //user && password
    const user = {username: username}
    
    const accessToken = generateAccessToken( user );

    res.header('authorization', accessToken).json({
        message: 'User autenticate',
        token: accessToken,
        newProduct: 
        {
            ntf: '💥', id: 'dc482bbf-c72d-4454-8e08-fec0a9c29a7d', productName: 'big bang', category: 'feature', stock: 35, price: 999
         }
    });
})

function generateAccessToken(user) {
    return jwt.sign( user, process.env.SECRET, { expiresIn: '5m'});
}

function validateToken ( req, res, next) {
    const accessToken = req.header['authorization'] || req.query.accesstoken;
    if(!accessToken) res.send('Access denied');

    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
            res.send('Access denied, token expired or incorrect');
        } else {
            next();
        }
    });
}

app.listen(8080, () => {
    console.log('Node.js Server is running...')
});
const express = require('express');
const app = express();

app.get('/', ( req, res ) => {
    res.send('Hola Grunin');
});

app.get('/api', ( req, res ) => {
    res.json({
        products: [
            
  {
    ntf: '🥑', id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', productName: 'avocado', category: 'meal', stock: 9, price: 34
  },
  {
    ntf: '☠', id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', productName: 'death', category: 'human', stock: 1, price: 666
  }
        ]
    })
})

app.get('/login', ( req, res ) => {

})

app.listen(8080, () => {
    console.log('Server is running so fast...')
});
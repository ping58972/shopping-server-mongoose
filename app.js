const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const productController = require('./controllers/error');
//const User = require('./modles/user');



const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next)=>{
//     User.findById('5cf5a89ec7d3dd3478fa6137').then(user=> {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     }).catch(err=>console.log(err));
// });

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(productController.get404);



mongoose.connect('mongodb+srv://ping:pink58972@cluster0-5aiyx.mongodb.net/mongoose-shop?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000);
}).catch(err=>console.log(err));



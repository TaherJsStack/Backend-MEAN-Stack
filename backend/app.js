const express    = require("express");
const mongoose   = require('mongoose');
const bodyParser = require("body-parser");
const path       = require('path');

const categoriesRouter = require('./router/categories');
const productsRouter   = require('./router/products');
const ordersRouter     = require('./router/orders');
const usersRoutes      = require('./router/users');
const authRouter       = require('./router/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));
app.use('/data', express.static(path.join('data/invoices/invoiceName')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  res.setHeader('Content-Type', 'application/pdf');

  next();
});

// mongoose.connect("mongodb+srv://.........................@cluster0-f1xjd.mongodb.net/stor-admin",  { useNewUrlParser: true })
//         .then( () => {
//             console.log("Connected To Database.......:::: DB");
//         })
//         .catch( () => {
//             console.log("Connection Failed...:::: DB");
//         });

mongoose.connect("mongodb://localhost:27017/stor-admin", { useNewUrlParser: true })
    .then( () => {
        console.log("Connected To Database.......:::: DB");
    })
    .catch( () => {
        console.log("Connection Failed...:::: DB");
    });

app.use("/api/categories", categoriesRouter);
app.use("/api/products",   productsRouter);
app.use("/api/orders",     ordersRouter)
app.use("/api/users",      usersRoutes);
app.use("/api/auth",       authRouter);


module.exports = app;

const express    = require("express");
const Order      = require('../models/order');
const checkUser  = require('../middleware/check-user') ;
const orderCtrl  = require('../controllers/orders');

const ordersRouter = express.Router();

ordersRouter.post("", checkUser, orderCtrl.saveOrder);

ordersRouter.get("", orderCtrl.getAllOrders);

ordersRouter.get("/userOrders/:id", orderCtrl.getAllUserOrders);

ordersRouter.get("/:id", orderCtrl.findById);

ordersRouter.get("/getOrderInvoice/:id", orderCtrl.getInvoice);

ordersRouter.put("/state/:id", orderCtrl.updateSatate);

ordersRouter.delete("/:id", orderCtrl.deleteOne);


module.exports = ordersRouter;

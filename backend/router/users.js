const express    = require("express");
const usersRoutes = express.Router();
const userCtrl = require('../controllers/users')

usersRoutes.post("",       userCtrl.userSave);

usersRoutes.get("",        userCtrl.getAllUsers);

usersRoutes.put("/:id",    userCtrl.updateOne);

usersRoutes.put("/roll/:id", userCtrl.updateUserRoll);

usersRoutes.put("/block/:id", userCtrl.blockUser);

usersRoutes.get("/:id",    userCtrl.findById);

usersRoutes.delete("/:id", userCtrl.deleteOne);


module.exports = usersRoutes;




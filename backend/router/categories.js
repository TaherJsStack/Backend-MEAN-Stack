const express    = require("express");
const categoriesRouter = express.Router();
const checkAuth = require('../middleware/check-auth') ;
const cateCtrl = require('../controllers/categories');


categoriesRouter.post("", checkAuth, cateCtrl.categorySave);

categoriesRouter.get("", cateCtrl.getAllCate);

categoriesRouter.get("/:id", checkAuth, cateCtrl.findById);

categoriesRouter.put("/:id", checkAuth, cateCtrl.updateOne);

categoriesRouter.put("/state/:id", cateCtrl.updateStat);

categoriesRouter.delete("/:id", checkAuth, cateCtrl.deleteOne);



module.exports = categoriesRouter;


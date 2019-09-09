const express    = require("express");
const Product    = require('../models/product');
const multer        = require('multer');
const checkAuth = require('../middleware/check-auth') ;
const prodCtrl = require('../controllers/products');
const productsRouter = express.Router();


const MIMIE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIMIE_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid mime Type');
      if (isValid) {
          error = null;
      }
      cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIMIE_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  },
});


productsRouter.post("", checkAuth, multer({storage: storage}).single('image'), prodCtrl.prodSave);

productsRouter.get("", prodCtrl.getAllProds);

productsRouter.put("/:id", prodCtrl.updateOne);

productsRouter.put("/state/:id", prodCtrl.updateOneState);

productsRouter.delete("/:id", prodCtrl.deleteOne);



module.exports = productsRouter;

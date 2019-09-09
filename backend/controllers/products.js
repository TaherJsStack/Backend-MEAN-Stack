const Product    = require('../models/product');

exports.prodSave = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  Product.findOne({name: req.body.name})
    .then( productExist=> {
      if (productExist) {
        console.log('product exist=>', productExist);
        return res.status(400).json({
          message: 'product alrady exist Added By '+ productExist.creatorName +' :::: DB ',
          status: 400
        });
      }
      const product = new Product({
        name:        req.body.name,
        price:       req.body.price,
        discount:    req.body.discount,
        priceDisc:   req.body.priceDisc,
        image:       url + '/images/' + req.file.filename,
        description: req.body.description,
        category:    req.body.category,
        showProduct: req.body.showProduct,
        creatorId:   req.authData.id,
        creatorName: req.authData.name,
        clientItems: req.body.clientItems,
        addedDate:   req.body.addedDate,
        quantity:    req.body.quantity,
        status:      req.body.status
      });
      product.save()
      .then( newProductId => {
        res.status(201).json({
          newProductID: newProductId._id,
          message: 'Product added successfully:::: DB ID',
          status: 201
        });
      })
      .catch( err => {
        res.status(500).json({
          message: err + 'Product error :::: DB',
          status: 500
        });
      });
    })
}

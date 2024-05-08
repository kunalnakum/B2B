const mongoose = require('mongoose');
// const express = require('express');
// const bodyParser = require('body-parser');


// Schema for BbProduct data
const BbProductSchema = new mongoose.Schema({
    requestedProductName: { type: String, required: true },
    expectedPricePerUnit: { type: Number, required: true },
    totalUnitsRequested: { type: Number, required: true },
    additionalDescription: { type: String },
    lastRequestDate: { type: Date, default: Date.now },
    currency: { type: String, required: true },
    unit: { type: String, required: true },
    bbrequester: { type: String, required: true },  //  // work. this is nuthing but field that make sure who is first user who requested product.
  });
  
const BbProduct = mongoose.model('BbProduct', BbProductSchema);  


module.exports.newproduct = (req, res) => {
    const {
      requestedProductName,
      expectedPricePerUnit,
      totalUnitsRequested,
      additionalDescription,
      lastRequestDate,
      currency,
      unit,
      bbrequester,
    } = req.body;
  
    // Basic validation (modify and enhance as needed)
    if (!bbrequester || !requestedProductName || !expectedPricePerUnit || !totalUnitsRequested || !currency || !unit) {
        return res.status(400).send({ message: 'Missing required fields' });
      }
  
      // Create a new BbProduct document
      const newProduct = new BbProduct({
        requestedProductName,
        expectedPricePerUnit,
        totalUnitsRequested,
        additionalDescription,
        lastRequestDate,
        currency,
        unit,
        bbrequester,
      });
  
      // Save the product to MongoDB
      newProduct.save();
      console.log("---------------");
      console.log(newProduct);
  
    // Send a success respo nse (optional)
    res.send({ message: 'Data received successfully!' });
  };

module.exports.allproducts = (req, res) =>{
  // console.log("in all products")
  // add code to show requests for bulk buy
  let _f = {}
  BbProduct.find(_f)
        .then((result) => {
            res.send({ message: 'success', products: result })
            console.log(result)
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}

module.exports.myallproducts = (req, res) => {
  const userId = req.body.userId;

  BbProduct.find({ bbrequester: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
            // console.log(result)
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}

module.exports.productDetail = (req, res) => {
  // const id = req.body.product.id;
  console.log(req)
  // console.log(req.params);

  BbProduct.findOne({ _id: req.params.pId })
    .then((result) => {
      res.send({ message: 'success', products: result })
      console.log(result)
    })
    .catch((err) => {
      res.send({ message: 'server err' })
  })
}
const express = require("express");
const productsRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// GET ALL
productsRoutes.route("/products").get(function (req, res) {
    let db_connect = dbo.getDb("products");
    db_connect.collection("products").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// GET ONE
productsRoutes.route("/products/:id").get(function (req, res) {
    let db_connect = dbo.getDb("products");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// ADD
productsRoutes.route("/products").post(function (req, response) {
    let db_connect = dbo.getDb("products");
    let myobj = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        amount: req.body.amount,
        size: req.body.size,
    };
    db_connect.collection("products").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// UPDATE
productsRoutes.route("/products/:id").put(function (req, response) {
    let db_connect = dbo.getDb("products");
    let myquery = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            amount: req.body.amount,
            size: req.body.size,
        },
    };
    db_connect.collection("products").updateOne(myquery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated successfully");
        response.json(res);
    });
});

// DELETE
productsRoutes.route("/products/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("products");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj);
    });
})

module.exports = productsRoutes;
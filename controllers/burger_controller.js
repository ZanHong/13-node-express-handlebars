// Importing express and burger.js
var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

// Router for selectAll
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject)
    });
});

// Router for insertOne
router.post("/api/burgers", function (req, res) {
    burger.insertOne("burger_name", [req.body.burger_name], function (result) {
        res.json({ id: result.insertId })
    });
});

// Router for updateOne
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRow == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Exports all routers for server.js
module.exports = router;
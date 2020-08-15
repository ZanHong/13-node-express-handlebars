// Import ORM
var orm = require("../config/orm.js");

var burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVal, condition, cb) {
        orm.updateOne("burgers", objColVal, condition, function (res) {
            cb(res);
        });
    }
};

// Export database functions for burger_controller.js
module.exports = burger;
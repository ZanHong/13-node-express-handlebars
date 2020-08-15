var connection = require("../config/connection.js");
const { query } = require("express");

// A helper function that converts object key:value to SQL syntax
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            // Add quotations when there's spaces in string
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
                // example: John Doe => 'John Doe'
            }
            arr.push(key + "=" + value);
            // example: {name: 'John Doe'} => ["name='John Doe'"]
        }
    }
    return arr.toString();
};

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") VALUES ('";
        queryString += vals;
        queryString += "') ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    updateOne: function (table, objColVal, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVal);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    }
}

// Export ORM object for burger.js
module.exports = orm;
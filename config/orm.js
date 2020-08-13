var connection = require("../config/connection.js");
const { query } = require("express");

// A helper function for SQL queries that prints the number of question marks as a string based on the length of the input array
// For example: converting ["?", "?", "?"] to "?,?,?"
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num.length; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// A helper function that converts object key:value to SQL syntax
function objToSql(ob) {
    var arr = [];

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
    insertOne: function (table, col, vals, cb) {
        var queryString = "INSERT INTO" + table;

        queryString += " (";
        queryString += col.toString();
        queryString += ") VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne: function (table, objColVal, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVal);
        queryString += " WHERE ";
        queryString += condition;

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
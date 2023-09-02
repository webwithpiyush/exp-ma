const sql = require("../configs/database.js");

// constructor
const Transaction = function(transaction) {
  this.amount = transaction.amount;
  this.comment = transaction.comment;
  this.type = transaction.type;
  this.userId = transaction.userId;
  this.accountId = transaction.accountId;
  this.isReversible = transaction.isReversible;
  this.categoryId = transaction.categoryId;
};

// To Create Transactions
Transaction.create = (newTransaction, result) => {
  sql.query("INSERT INTO transactions SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaction: ", { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

// To Find Transactions by id
Transaction.findById = (transactionId, result) => {
  sql.query(`SELECT * FROM transactions WHERE id = ${transactionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};


Transaction.getAllByUser = (userId,result) => {
  sql.query(`SELECT * FROM transactions Where userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transactions: ", res);
    result(null, res);
  });
};


Transaction.remove = (id, result) => {
  sql.query("UPDATE users SET transactions = now() WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Transaction.removeAll = result => {
  sql.query("UPDATE transactions SET deletedAt = now()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Transaction;
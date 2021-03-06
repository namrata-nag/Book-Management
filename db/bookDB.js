let AWS = require("aws-sdk");
let express = require("express");

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY
});

let docClient = new AWS.DynamoDB.DocumentClient();
const dbQuery = {};

dbQuery.getBookData = (query, callback) => {
  return docClient.scan(query, (err, data) => {
    if (err) {
      return callback(400, { error: "Unable to fetch Book List" });
    }
    return callback(200, data);
  });
};
dbQuery.addBook = (query, callback) => {
  return docClient.batchWrite(query, (err, data) => {
    if (err) {
      return callback(400, { error: "Unable to add Book" });
    }
    return callback(200, data);
  });
};
dbQuery.getOneBook = (query, callback) => {
  return docClient.get(query, (err, data) => {
    if (err) {
      return callback(400, { error: "Unable to fetch Book List" });
    }
    return callback(200, data);
  });
};

dbQuery.updateBook = (query, callback) => {
  return docClient.update(query, (err, data) => {
    if (err) {
      return callback(400, { error: "Unable to update the book Table" });
    }
    return callback(200, data);
  });
};

dbQuery.deleteBook = (query, callback) => {
  return docClient.delete(query, (err, data) => {
    if (err) {
      return callback(400, { error: "Unable to delete the book Table" });
    }
    return callback(200, data);
  });
};
module.exports = dbQuery;

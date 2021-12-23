const express = require('express');
const path = require('path');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

recordRoutes.route('/index.html').get(async function (_req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

recordRoutes.route('/info.html').get(async function (_req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/public/info.html'));
});

recordRoutes.route('/enemies.html').get(async function (_req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/public/enemies.html'));
});

recordRoutes.route('/maps.html').get(async function (_req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/public/maps.html'));
});

recordRoutes.route('/list').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('characters')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/update').post(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('characters')
    .replaceOne({ _id: req.body._id }, req.body);
  const updated = dbConnect
    .collection('characters')
    .findOne({ _id: req.body.id });
  res.json(updated);
});

recordRoutes.route('/create').put(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('characters')
    .insertOne(req.body)
    .then((result) =>
      console.log(`Successfully inserted item with _id: ${result.insertedId}`)
    )
    .catch((err) => console.error(`Failed to insert item: ${err}`));
  res.send('200');
});

module.exports = recordRoutes;

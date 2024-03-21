const express = require('express');
const router = express.Router();

const fs = require('fs');

// GET ALL //
router.get('/api', (req, res) => {
  fs.readFile('genericApi.json', function (err, data) {
    let json = JSON.parse(data);
    res.send(json);
  });
});

// GET ONE //
router.get('/getOne/:id', (req, res) => {
  fs.readFile('genericApi.json', function(err, data) {
    let json = JSON.parse(data);
    for (let i = 0; i < json.length; i++) {
      if (json[i].id == req.params.id) res.send(json[i]);
    }
  })
})

// POST //
router.post('/addItem', (req, res) => {
  let keys = Object.keys(req.body);

  fs.readFile('genericApi.json', function(err, data) {
    let json = JSON.parse(data);
    let nextId = json.length > 0 ? json[json.length - 1].id + 1: 1;
    let newObject = {id: nextId};
    for (let i = 0; i < keys.length; i++) {
      newObject[keys[i]] = req.body[keys[i]];
    };
    json.push(newObject);
    fs.writeFile('genericApi.json', JSON.stringify(json, null, ' '), function (err) {
      if (err) throw err;
    });
  });
  res.send("Sent!");
});

// DELETE ONE //
router.delete('/deleteItem/:id', (req, res) => {
  console.log(req.params);
  fs.readFile('genericApi.json', function (err, data) {
    let json = JSON.parse(data);
    for (let i = 0; i < Object.keys(json).length; i++) {
      if (json[i].id == req.params.id) {
        json.splice(i, 1);
      };
    };
    fs.writeFile('genericApi.json', JSON.stringify(json, null, ' '), function (err) {
      if (err) throw err;
    });
  });
})

// UPDATE //
router.put('/updateOne', function(req, res) {
  fs.readFile('genericApi.json', function(err, data) {
    console.log(req.body.id);
    let json = JSON.parse(data);
    for (let i = 0; i < json.length; i++) {
      if (req.body.id == json[i].id) {
        json.splice(i, 1);
        json.push(req.body);
      }
    };
    fs.writeFile('genericApi.json', JSON.stringify(json, null, ' '), function (err) {
      if (err) throw err;
    });
  });
  res.send("Updated");
});
module.exports = router;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(express.json());

// BodyParser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// get list model
let List = require('./list');

// connect to the mongodb atlas
mongoose.connect('mongodb://sandy_mongo:sandy_mongo@sandycluster1-shard-00-00-m6khg.mongodb.net:27017,sandycluster1-shard-00-01-m6khg.mongodb.net:27017,sandycluster1-shard-00-02-m6khg.mongodb.net:27017/ShoppingList?ssl=true&replicaSet=SandyCluster1-shard-0&authSource=admin&retryWrites=true');
var db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error - ' + err);
});

// define some routes

// ----- to get list of all lists created -----
app.get('/lists', (req, res) => {
    List.find({}, (err, lists) => {
        if(err) res.send('Error fetching lists');
        else {
            res.json(lists);
        }
    });
});

// ----- to create a list -----
app.post('/lists', (req, res) => {
    let list = new List();
    list.listId = req.body.listId;
    list.createdOn = req.body.createdOn;
    list.listItems = req.body.listItems;
    list.listName = req.body.listName;
    list.listCategory = req.body.listCategory;

    list.save((err) => {
        if(err) { res.send('Problem adding List!'); }
        else {
            res.send('List Added Succesfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
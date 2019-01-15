const mongoose = require('mongoose');

// lets define a schema
const ListSchema = mongoose.Schema({
    listId: {
        type: Number,
        required: true
    },
    createdOn: {
        type: String
    },
    listName: {
        type: String
    },
    listItems: {
        type: Array
    },
    listCategory: {
        type: String,
        required: true
    }
});

let List = module.exports = mongoose.model('lists', ListSchema);
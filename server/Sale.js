import mongoose from 'mongoose';
import User from './User.js';
const SalesSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userID: String,
    userName: String,
    bookName: String,
    price: String,
    title: String,
    description: String,
    type: String, 
    created_data: {type: Date, default: Date.now()},
});

SalesSchema.methods.serialize = function() {
    const data = this.toJSON();
    return data;
}

const Sales = mongoose.model('Sales', SalesSchema);

export default Sales;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const conn = await mongoose.connect('mongodb+srv://iamwotjr:asd98048@cluster0.bh5jf.mongodb.net/MongoDBTest?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(error);
    });


// const UserSchema = new mongoose.Schema({
//     name: String,
//     id: String,
//     password: String,
// });

const UserSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.statics.findByUserID = function (userID) {
    return this.findOne({ userID });
}

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}


// const user1 = new User({
//     name: '유저1',
//     id: 'iamUser1',
//     password: 'user123456',
// })
// await user1.save();

// const users = await User.find();
// console.log(users);

const User = mongoose.model('User', UserSchema);

export default User;
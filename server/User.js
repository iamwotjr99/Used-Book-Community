import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    hashedPassword: String,
});


UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.statics.findByUserID = function (userID) {
    return this.findOne({ userID });
}

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id:this.id,
            UserID: this.UserID,
            userName: this.userName
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
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


// JWT_SECRET 59be6849c8364baf9b109a1bbf76fbfb29f76cee93620b1ea165a76acf110af2d6c099889d27bfeefbd2dd445faaaedac686bdc4e8e6708185da5d97be22c114
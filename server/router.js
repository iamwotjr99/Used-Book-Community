import express from 'express';
import  User  from './User.js';
import Sale from './Sale.js';
import bcrypt from 'bcrypt';
import jwtMiddleware from './lib/src/jwtMiddelware.js';
import mongoose from 'mongoose';
const router = express.Router();

await mongoose.connect('mongodb+srv://iamwotjr:asd98048@cluster0.bh5jf.mongodb.net/MongoDBTest?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(error);
    });

router.get('/checkID', (req, res) => {
    const paramsID = req.query.id;
    User.find({userID: paramsID}, (error, user) => {
        if(error) {
            res.sendStatus(500);
            return error;
        } else {
            res.send(user[0]);
        }
    });
})

router.post('/register', async (req, res) => {
    const { id, name, password } = req.body;

    try {
        console.log(id);
        const exists = await User.findByUserID(id);
        if(exists) {
            console.log("exists");
            req.status = 409;
            return;
        }

        const user = new User({
            userID: id,
            userName: name,
        });

        await user.setPassword(password);
        await user.save();
        console.log(`${id} register success!`);

        req.body = user.serialize();

        res.send({joinSuccess: true});
    } catch(err) {
        console.log(err);
    }
})

router.post('/login' ,jwtMiddleware, async (req, res) => {
    const { id, password } = req.body;
    console.log("login part: ", id, password);

    if(!id || !password) {
        req.status = 401;
        return;
    }

    try {
        const user = await User.findByUserID(id);
        console.log("user: ", user);

        if(!user) {
            return res.status(401).json({
                message: "Invalid ID"
            })
        }

        const valid = await bcrypt.compare(password, user.hashedPassword);
        console.log("valid: ", valid);

        if(!valid) {
            return res.status(401).json({
                message: "Invalid PW"
            })
        }

        //req.body = user.serialize();

        const token = user.generateToken();

        res.cookie('login_token', token, {
            httpOnly: true,
        })

        console.log(req.cookies.login_token);

        res.send({userID: user.userID, userName: user.userName, login_cookie: req.cookies.login_token});

        console.log("login success!");
    } catch(err) {
        console.log(err);
    }
    
})

router.get('/logout',jwtMiddleware, (req, res) => {
    res.clearCookie("login_token");
    res.end();
})

router.get('/userinfo', jwtMiddleware, (req, res) => {
    let userId = req.user._id;
    let userName = req.user.userName;
    res.send({userId: userId, userName:userName});
})

// add book post data
router.post('/add/post', jwtMiddleware, async (req, res) => {
    const {bookName, price, title, description, type} = req.body;

    // jwtMiddleware valid check

    // Sale reference(user) is id
    try {
        const sale = new Sale({
            user: req.user._id,
            userName: req.user.userName,
            bookName: bookName,
            price: price,
            title: title,
            type: type,
            description: description,
        })

        await sale.save();
        // response success
        res.body = sale.serialize();
        res.send({AddSuccess:true});
    } catch(err) {
        console.log(err);
    }
})

router.get('/get/posts', jwtMiddleware, async (req, res) => {
    const datas = await Sale.find({})

    console.log(datas);
    res.send({PostList: datas, success:"OK"});
})

router.get('/get/postinfo', jwtMiddleware, async (req, res) => {
    const data = await Sale.findOne({_id: req.query.postId})
    console.log(data);
    
    res.send({
        userName: data.userName, bookName: data.bookName, 
        price: data.price, title: data.title, 
        description: data.description, created_date: data.created_date, 
        success:"OK"}
    );
})

router.delete('/delete/post', jwtMiddleware, async (req, res) => {
    await Sale.deleteOne({_id: req.query.postId})
    res.send({message: "Delete success!"});
})
export default router;
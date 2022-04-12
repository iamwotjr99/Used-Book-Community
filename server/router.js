import express from 'express';
import  User  from './connect.js';
import auth from './api/auth/auth_router.js';

const router = express.Router();

router.use('/auth', auth);


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

export default router;
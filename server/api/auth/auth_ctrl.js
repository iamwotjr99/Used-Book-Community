import User from '../../connect.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { id, name, password } = req.body;
    //console.log(id, name, password);
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

        
        req.body = user.serialize();
        console.log(`${id} register success!`);
    } catch(e) {
        console.log("register err");
    }
}

export const login = async (req, res) => {
    const { id, password } = req.body;

    console.log("login auth", id, password);
    if(!id || !password) {
        req.status = 401;
       return;
    }

    try {
        const user = await User.findByUserID(id);
        console.log("user: ", user);

        if(!user) {
            req.status = 401;
            return;
        }

        const valid = await bcrypt.compare(password, user.hashedPassword);
        console.log("valid: ", valid);

        if(!valid) {
            req.status = 401;
            return;
        }

        req.body = user.serialize();
        res.send("login success!");
    } catch(err) {
        console.log(err);
    }
    
}

export const check = async (req) => {
    
}

export const logout = async (req) => {
    
}
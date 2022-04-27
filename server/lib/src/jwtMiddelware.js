import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies.login_token;

    if(!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token: ", decoded);
        req.token = token;
        req.user = {
            _id: decoded._id,
            userName: decoded.userName,
        }
        return next();
    } catch(err) {
        console.log(err);
        return next();
    }
}

export default jwtMiddleware;
import express from 'express';
import router from './router.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:3000/",
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
//app.use(jwtMiddleware);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`server is running ${port}...`);
})

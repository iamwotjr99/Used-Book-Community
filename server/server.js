import express from 'express';
import router from './router.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`server is running ${port}...`);
})

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as core from 'express-serve-static-core';
import auth from './routes/auth';
import invoice from './routes/invoice';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: core.Express = express();
const port: number = Reflect.get(process.env, 'PORT') || 3000;

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/invoice', invoice);

app.listen(port, (err: Error) => {
    if (err) return console.error(err);

    return console.log(`server is listening on ${port}`);
});

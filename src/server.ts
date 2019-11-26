import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port: number = Reflect.get(process.env, 'PORT') || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, (err: Error) => {
    // tslint:disable-next-line: no-console
    if (err) return console.error(err);

    // tslint:disable-next-line: no-console
    return console.log(`server is listening on ${port}`);
});

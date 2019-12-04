import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db/InvoicingApp.db');

export const signup = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, company_name, password } = req.body;
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, (err: Error, hash: string) => {
            const db = new sqlite3.Database(dbPath);
            const sql = `
                INSERT INTO users(name, email ,company_name, password)
                VALUES('${name}', '${email}', '${company_name}', '${hash}')
            `;

            db.run(sql);
            db.close();

            return res.json({
                status: true,
                message: 'User Created'
            });
        });
    } catch (error) {
        throw error;
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const db = new sqlite3.Database(dbPath);
        const sql = `SELECT * from users where email='${email}'`;

        db.all(sql, [], (err: Error, rows: any[]) => {
            if (err) throw err;

            db.close();

            if (rows.length === 0)
                return res.json({
                    status: false,
                    message: 'Sorry, wrong email'
                });

            const user = rows[0];
            const authenticated = bcrypt.compareSync(password, user.password);
            delete user.password;

            if (authenticated)
                return res.json({
                    status: true,
                    user
                });

            return res.json({
                status: false,
                message: 'Wrong Password, please retry'
            });
        });
    } catch (error) {
        throw error;
    }
};

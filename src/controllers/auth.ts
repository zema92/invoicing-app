import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';

const saltRounds = 10;

export const signup = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, company_name, password } = req.body;

        bcrypt.hash(password, saltRounds, (err: Error, hash: string) => {
            const db = new sqlite3.Database('../db/InvoicingApp.db');
            const sql = `
                INSERT INTO users(name,email,company_name,password)
                VALUES('${email}', '${company_name}', '${hash}')
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

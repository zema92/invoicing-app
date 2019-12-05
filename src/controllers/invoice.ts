import { NextFunction, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db/InvoicingApp.db');

export const invoice = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, user_id, txn_names, txn_prices } = req.body;
        const db = new sqlite3.Database(dbPath);
        const sql = `
            INSERT INTO invoices(name, user_id, paid)
            VALUES('${name}', '${user_id}', 0
        )`;

        db.serialize(() => {
            db.run(sql, function(err) {
                if (err) throw err;

                const invoice_id = this.lastID;

                for (let i = 0; i < txn_names.length; i++) {
                    const query = `
                        INSERT INTO transactions(name, price, invoice_id)
                        VALUES('${txn_names[i]}', '${txn_prices[i]}', '${invoice_id}')
                    `;
                    db.run(query);
                }

                return res.json({
                    status: true,
                    message: 'Invoice created'
                });
            });
        });

    } catch (error) {
        throw error;
    }
};

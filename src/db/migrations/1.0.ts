import sqlite3 from 'sqlite3';
import Promise from 'bluebird';
import path from 'path';

const dbPath = path.resolve(__dirname, '../InvoicingApp.db');

export const up = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);

        db.run('PRAGMA foreign_keys = ON');

        db.serialize(() => {
            db.run(`CREATE TABLE users (
				id INTEGER PRIMARY KEY,
				name TEXT,
				email TEXT,
				company_name TEXT,
				password TEXT
            )`);

            db.run(`CREATE TABLE invoices (
				id INTEGER PRIMARY KEY,
				name TEXT,
				user_id INTEGER,
				paid NUMERIC,
				FOREIGN KEY(user_id) REFERENCES users(id)
            )`);

            db.run(`CREATE TABLE transactions (
				id INTEGER PRIMARY KEY,
				name TEXT,
				price INTEGER,
				invoice_id INTEGER,
				FOREIGN KEY(invoice_id) REFERENCES invoices(id)
            )`);
        });

        db.close();
    });
};

export const down = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);

        db.serialize(() => {
            db.run('DROP TABLE transactions');
            db.run('DROP TABLE invoices');
            db.run('DROP TABLE users');
        });

        db.close();
    });
};

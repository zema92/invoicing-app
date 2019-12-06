import express from 'express';
import { createInvoice, getInvoices, getInvoice } from '../controllers/invoice';

const router = express.Router();

router.post('/create', createInvoice);
router.get('/user/:user_id', getInvoices);
router.get('/user/:user_id/:invoice_id', getInvoice);

export default router;

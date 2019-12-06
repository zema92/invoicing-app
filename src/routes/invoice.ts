import express from 'express';
import { createInvoice, getInvoices } from '../controllers/invoice';

const router = express.Router();

router.post('/create', createInvoice);
router.get('/user/:user_id', getInvoices);

export default router;

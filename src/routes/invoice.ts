import express from 'express';
import { invoice } from '../controllers/invoice';

const router = express.Router();

router.post('/', invoice);

export default router;

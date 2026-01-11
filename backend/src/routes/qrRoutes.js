import express from 'express';
import {
  generateQR,
  getQRById,
  validateScannedData,
} from '../controllers/qrController.js';

const router = express.Router();

router.post('/generate', generateQR);
router.get('/:id', getQRById);
router.post('/validate', validateScannedData);

export default router;

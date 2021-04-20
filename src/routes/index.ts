import { Router } from 'express';
import sampleController from '../controllers/sample';

const router = Router();

router.get('/', function (_req, res) {
  const message = sampleController();

  res.status(200).json({ message });
});

export default router;

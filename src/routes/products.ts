import express, { Request, Response } from 'express';
import Product from '../models/product';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Error: ' + error.message);
  }
});

export default router;

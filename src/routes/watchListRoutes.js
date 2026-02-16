import express from 'express';
import { addToWatchList } from '../controller/watchListController';

const router = express.Router();

router.post("/", addToWatchList)


export default router;
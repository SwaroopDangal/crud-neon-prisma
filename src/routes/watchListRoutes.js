import express from 'express';
import { addToWatchList, removeFromWatchlist, updateWatchlistItem } from '../controller/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post("/", addToWatchList)

router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);



export default router;
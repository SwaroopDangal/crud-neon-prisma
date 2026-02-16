import express from 'express';
import { addToWatchList, removeFromWatchlist, updateWatchlistItem } from '../controller/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchListSchema } from '../validators/watchListValidator.js';

const router = express.Router();

router.use(authMiddleware);
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);

router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);



export default router;
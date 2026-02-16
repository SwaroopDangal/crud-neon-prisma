import { z } from 'zod';

const addToWatchListSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {
        error: () => ({
            message: 'Invalid status. Allowed values are PLANNED, WATCHING, COMPLETED, DROPPED'
        })
    }).optional(),

    rating: z.coerce.number().int("Rating must be integer").min(1).max(10).optional(),
    notes: z.string().optional(),
})

export { addToWatchListSchema }
import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { disconnectDB } from './config/db.js';
import movieRoutes from './routes/movieRoute.js';
import authRoutes from './routes/authRoutes.js';
import watchListRoutes from './routes/watchListRoutes.js';

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchListRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});
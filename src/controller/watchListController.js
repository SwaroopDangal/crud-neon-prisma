const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    // Verify if the movie exists in the database
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId,
        },
    });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    // check if already added
    const existingWatchList = await prisma.watchList.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            }
        },
    });

    if (existingWatchList) {
        return res.status(400).json({ message: 'Movie already in watch list' });
    }

    const watchList = await prisma.watchList.create({
        data: {
            userId: req.user.id,
            movieId: movieId,
            status: status || 'PLANNED',
            rating: rating,
            notes: notes,
        },
    });

    res.status(201).json({
        status: 'success',
        message: 'Movie added to watch list',
        data: {
            watchList
        }
    });

}

export { addToWatchList }
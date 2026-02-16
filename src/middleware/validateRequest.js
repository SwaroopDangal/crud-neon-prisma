export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message).join(', ');
            return res.status(400).json({ message: errorMessages });
        }
        next();
    }
}
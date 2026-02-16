import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { email }
    })
    if (userExists) {
        return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    // generate token 
    const token = generateToken(user.id, res);

    return res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,

            },
            token
        }
    });

}

const login = async (req, res) => {
    const { email, password } = req.body;

    // check if user already exists
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        return res.status(400).json({ message: "User does not exist with this email" });
    }
    // check if password matches
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // generate token 
    const token = generateToken(user.id, res);

    return res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email,

            },
            token
        }
    });


}

const logout = async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true,
    });
    return res.status(200).json({ status: "success", message: "Logged out successfully" });
}

export { register, login, logout };
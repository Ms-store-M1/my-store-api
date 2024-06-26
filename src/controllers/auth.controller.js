/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable quotes */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { mail },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isadmin,
            },
            process.env.JWT_SECRET,
            {}
        );

        return res.status(200).send({
            auth: true,
            token,
            data: user,
            message: "Vous êtes connecté.",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { login };

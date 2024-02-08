const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError('No user id provided', 404);
            next(err);
        }
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            const err = throwError('User not found', 404);
            return next(err);
        }
        return res.json(
            {
                data: user,
                sucess: true,
            },
        );
    } catch (err) {
        return next(err);
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
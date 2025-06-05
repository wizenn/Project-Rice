const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { email, password },
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

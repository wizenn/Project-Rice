// exports.getUsers = async (req, res) => {
//   try {
//     const users = await prisma.users.create();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

exports.createUser = async (req, res) => {
    const prisma = require('@prisma/client');
    const { email, password } = req.body;
    data: {
        email: email,
            password: password
    }
)
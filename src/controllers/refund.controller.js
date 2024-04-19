/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const requestRefund = async (req, res) => {
    try {
        const { orderId } = req.params;
        // Mettre à jour le statut de la cmd à "Refund on demand"
        await prisma.order.update({
            where: { id: parseInt(orderId, 10) },
            data: { status: "Refund on demand" },
        });
        // Envoyer une notif a l'admin****

        res.json({ message: "Refund request submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const validateRefund = async (req, res) => {
    try {
        const { orderId } = req.params;
        await prisma.order.update({
            where: { id: parseInt(orderId, 10) },
            data: { status: "Refunded" },
        });
        //  remboursement automatique ....

        res.json({ message: "Refund validated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    requestRefund,
    validateRefund,
};

/* eslint-disable indent */
/* eslint-disable quotes */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    try {
        // Insérer l'utilisateur admin
        await prisma.user.create({
            data: {
                // id: 7, auto incrémenté normalement mais on sait jamais
                lastname: "Jesuis",
                firstname: "Admin",
                mail: "admin@gmail.com",
                password:
                    "$2b$10$z0jk25fdHMe.Fcfh12eUouIr8ZK4tyCRZR9wDlqODxYPrv/i.kcHu", // le meme mdp que d'hab
                address: "test adresse",
                zipcode: "00000",
                city: "Ville",
                phone: "0123456789",
                isadmin: true,
            },
        });

        // Insérer l'utilisateur normal
        await prisma.user.create({
            data: {
                // id: 77, auto incrémenté normalement mais on sait jamais
                lastname: "Nom",
                firstname: "Prénom",
                mail: "notadmin@gmail.com",
                password:
                    "$2b$10$z0jk25fdHMe.Fcfh12eUouIr8ZK4tyCRZR9wDlqODxYPrv/i.kcHu", // le meme mdp que d'hab
                address: "test adresse 2",
                zipcode: "00000",
                city: "Ville",
                phone: "0123456789",
                isadmin: false,
            },
        });

        console.log("Utilisateurs insérés avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'insertion des utilisateurs :", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

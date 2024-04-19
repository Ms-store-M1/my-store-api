/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
    {
        name: "W simple pant",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product1.webp",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product1_packshot.jpeg",
        price: 123.0,
    },
    {
        name: "Bib Overall Straight",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product2.webp",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product2_packshot.jpeg",
        price: 136.0,
    },
    {
        name: "W' L/S Kyle Shirt",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product3.jpeg",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product3_packshot.jpeg",
        price: 98.5,
    },
    {
        name: "W' American Scr. High N...",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product4.jpeg",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product4_packshot.jpeg",
        price: 65.0,
    },
    {
        name: "W' L/S Seidler T-Shir",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product5.jpeg",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product5_packshot.jpeg",
        price: 70.0,
    },
    {
        name: "W' OG Active Jacket",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product6.jpeg",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product6_packshot.jpeg",
        price: 90.0,
    },
    {
        name: "W' Ace Vest",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product7.webp",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product7_packshot.jpeg",
        price: 78.0,
    },
    {
        name: "W' L/S Craft Shirt",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product8.webp",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product8_packshot.jpeg",
        price: 152.99,
    },
    {
        name: "W' Skyler Liner",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        active: true,
        thumbnail:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product9.jpeg",
        packshot:
            "https://archi-eval.s3.eu-north-1.amazonaws.com/products/product9_packshot.jpeg",
        price: 370.5,
    },
];

async function main() {
    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

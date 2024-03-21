const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    name: 'W simple pant',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product1.webp',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product1_packshot.jpeg',
    price: 123.00
  },
  {
    name: 'Bib Overall Straight',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product2.webp',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product2_packshot.jpegs',
    price: 136.00
  },
  {
    name: 'W\' L/S Kyle Shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product3.jpeg',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product3_packshot.jpeg',
    price: 98.50
  },
  {
    name: 'W\' American Scr. High N...',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product4.jpeg',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product4_packshot.jpeg',
    price: 65.00
  },
  {
    name: 'W\' L/S Seidler T-Shir',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product5.jpeg',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product5_packshot.jpeg',
    price: 70.00
  },
  {
    name: 'W\' OG Active Jacket',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product6.jpeg',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product6_packshot.jpeg',
    price: 90.00
  },
  {
    name: 'W\' Ace Vest',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product7.webp',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product7_packshot.jpeg',
    price: 78.00
  },
  {
    name: 'W\' L/S Craft Shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product8.webp',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product8_packshot.jpeg',
    price: 152.99
  },
  {
    name: 'W\' Skyler Liner',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    active: true,
    thumbnail: 'https://archi-eval.s3.eu-north-1.amazonaws.com/products/product9.jpeg',
    packshot: '/uploads/https://archi-eval.s3.eu-north-1.amazonaws.com/products/product9_packshot.jpeg',
    price: 370.50
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable quotes */
const { PrismaClient } = require("@prisma/client/edge");

const throwError = require("../utils/throwError");

const prisma = new PrismaClient();

const getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: { active: true },
            take: req.query.take ? Number(req.query.take) : 8,
        });
        if (!products) {
            const err = throwError("No products found", 404);
            return next(err);
        }
        return res.json({
            success: true,
            data: products,
        });
    } catch (err) {
        return next(err);
    }
};

const getAllProducts = async (req, res, next) => {
    console.log("getAllProducts");
    try {
        const products = await prisma.product.findMany();

        if (products.length === 0) {
            // Check if the array is empty
            const err = throwError("No products found", 404);
            return next(err);
        }

        return res.json({
            success: true,
            data: products,
          });
    } catch (err) {
        return next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError("No product id provided", 404);
            next(err);
        }
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            const err = throwError("Product not found", 404);
            return next(err);
        }
        return res.json({
            data: product,
            sucess: true,
        });
    } catch (err) {
        return next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError("No product id provided", 404);
            next(err);
        }
        const product = await prisma.product.delete({
            where: { id: Number(id) },
        });
        /* if (!product) {
            const err = throwError('Product not found', 404);
            return next(err);
        } */
        return res.json({
            product,
            sucess: true,
        });
    } catch (err) {
        return next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const err = throwError("No product id provided", 404);
            next(err);
        }
        const { name, description, active, thumbnail, packshot, price } =
            req.body;
        const Product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!Product) {
            const err = throwError("No product id provided", 404);
            next(err);
        }
        const data = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name: name || Product.name,
                description: description || Product.description,
                active: active !== undefined ? active : Product.active,
                thumbnail: thumbnail || Product.thumbnail,
                packshot: packshot || Product.packshot,
                price: price !== undefined ? price : Product.price,
            },
        });
        return res.json({
            success: true,
            data,
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getProducts,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};

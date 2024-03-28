const { PrismaClient } = require('@prisma/client');

const throwError = require('../utils/throwError');

const prisma = new PrismaClient();

exports.getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      take: req.query.take ? Number(req.query.take) : 8,
    });
    if (!products) {
      const err = throwError('No products found', 404);
      return next(err);
    }
    return res.send(
      {
        success: true,
        data: products,
      },
    );
  } catch (err) {
    return next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = throwError('No product id provided', 404);
      next(err);
    }
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      const err = throwError('Product not found', 404);
      return next(err);
    }
    return res.json(
      {
        data: product,
        sucess: true,
      },
    );
  } catch (err) {
    return next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = throwError('No product id provided', 404);
      next(err);
    }
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    /* if (!product) {
            const err = throwError('Product not found', 404);
            return next(err);
        } */
    return res.json(
      {
        product,
        sucess: true,
      },
    );
  } catch (err) {
    return next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = throwError('No product id provided', 404);
      next(err);
    }
    const {
      name, description, active, thumbnail, packshot, price,
    } = req.body;
    const Product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!Product) {
      const err = throwError('No product id provided', 404);
      next(err);
    }
    const updateProduct = await prisma.product.update({
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
      data: updateProduct,
    });
  } catch (err) {
    return next(err);
  }
};

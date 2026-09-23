import prisma from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

const getAllProducts = async ({ page = 1, limit = 10, search, categoryId, featured, active, sort }) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  const where = {
    ...(search && { name: { contains: search, mode: "insensitive" } }),
    ...(categoryId && { categoryId }),
    ...(featured !== undefined && { featured: featured === "true" }),
    ...(active !== undefined && { active: active === "true" }),
  };

  const orderBy = {};
  if (sort === "price") {
    orderBy.variants = { _count: "asc" }; // Note: Complex sort requires specific logic
  } else if (sort === "name") {
    orderBy.name = "asc";
  } else {
    orderBy.createdAt = "desc";
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy,
      include: { category: true, variants: true },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page: parseInt(page), limit: take };
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, variants: true, reviews: true },
  });
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

const createProduct = async (data) => {
  const { name, slug, description, image, categoryId, featured, active, variants } = data;

  const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!categoryExists) throw new ApiError(400, "Category does not exist");

  return await prisma.$transaction(async (tx) => {
    return await tx.product.create({
      data: {
        name,
        slug,
        description,
        image,
        categoryId,
        featured,
        active,
        variants: { create: variants },
      },
      include: { variants: true },
    });
  });
};

const updateProduct = async (id, data) => {
  const { variants, ...productData } = data;

  return await prisma.$transaction(async (tx) => {
    // Basic product update
    const updatedProduct = await tx.product.update({
      where: { id },
      data: productData,
    });

    // Update or create variants
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        if (variant.id) {
          await tx.productVariant.update({
            where: { id: variant.id },
            data: variant,
          });
        } else {
          await tx.productVariant.create({
            data: { ...variant, productId: id },
          });
        }
      }
    }
    return updatedProduct;
  });
};

const softDeleteProduct = async (id) => {
  return await prisma.product.update({
    where: { id },
    data: { active: false },
  });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
};

import prisma from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found");
  return category;
};

const createCategory = async (data) => {
  const { name, slug, image } = data;
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) throw new ApiError(400, "Category slug already exists");

  return await prisma.category.create({
    data: { name, slug, image },
  });
};

const updateCategory = async (id, data) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found");

  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found");

  return await prisma.category.delete({ where: { id } });
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

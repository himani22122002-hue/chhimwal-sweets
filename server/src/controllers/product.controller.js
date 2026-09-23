import productService from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const data = await productService.getAllProducts(req.query);
  return res.status(200).json(new ApiResponse(200, data, "Products fetched"));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return res.status(200).json(new ApiResponse(200, product, "Product fetched"));
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  return res.status(201).json(new ApiResponse(201, product, "Product created"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, product, "Product updated"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.softDeleteProduct(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, "Product deleted"));
});

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

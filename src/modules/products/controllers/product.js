import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../../errors/index.js";
import path from "path";
import Review from "../../reviews/models/Review.js";

export const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

export const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const {
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    featured,
    freeShipping,
    inventory,
  } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    {
      name,
      price,
      description,
      image,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" });
};

export const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../../../../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
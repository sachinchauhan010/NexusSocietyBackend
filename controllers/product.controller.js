import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Product from "../models/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const productImageLocalPath = req.file ? req.file.path : null;

    const { id, name, description, price, category, stock } = req.body;

    if (!id || !name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!productImageLocalPath) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Upload image to Cloudinary
    const { url } = await uploadOnCloudinary(productImageLocalPath);
    if (!url) {
      return res.status(500).json({
        success: false,
        message: "Product image not uploaded on Cloudinary",
      });
    }

    // Check if product already exists
    const isExist = await Product.findOne({ id });
    console.log(isExist, "isExist");
    if (isExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({
      id,
      name,
      description,
      price,
      category,
      stock,
      image: url, // Use Cloudinary URL
    });

    await newProduct.save();

    res.status(201).json({
      productData: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-_id -__v");
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    // Sort products by upload_date in descending order
    products.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
    res.status(200).json({ productsData: products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


//Update product
export const updateProduct = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { name, description, price, category, stock } = req.body;
    const { id } = req.params; // Get id from params

    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // // Check if the image is being updated
    // let imageUrl = product.image;
    // if (req.file) {
    //   const productImageLocalPath = req.file.path;
    //   const { url } = await uploadOnCloudinary(productImageLocalPath);
    //   if (!url) {
    //     return res.status(500).json({
    //       success: false,
    //       message: "Product image not uploaded on Cloudinary",
    //     });
    //   }
    //   imageUrl = url; // Use the new Cloudinary URL
    // }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    // product.image = imageUrl;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", productData: product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};


//Delete product
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get id from params

    const product = await Product.findOneAndDelete({ id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", productData: product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
}


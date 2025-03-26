import Product from "../models/Product.js";

// Products data
const products = [
  {
    _id: "1",
    name: "Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium wireless headphones with noise cancellation",
    price: 149.99,
  },
  {
    _id: "2",
    name: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Latest smartphone with high-end camera and performance",
    price: 799.99,
  },
  {
    _id: "3",
    name: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Powerful laptop for work and gaming",
    price: 1299.99,
  },
  {
    _id: "4",
    name: "Smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Track your fitness and stay connected",
    price: 249.99,
  },
  {
    _id: "5",
    name: "Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    description: "Compact earbuds with amazing sound quality",
    price: 99.99,
  },
  {
    _id: "6",
    name: "Digital Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Capture your memories in high resolution",
    price: 599.99,
  },
];

// @desc    Fetch all products
// @route   GET /api/products

export const getProducts = async (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id

export const getProductById = async (req, res) => {
  try {
    const product = products.find((p) => p._id === req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

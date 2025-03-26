import Order from "../models/Order.js";

// @desc    Create new order
// @route   POST /api/orders

export const createOrder = async (req, res) => {
  const { firstName, lastName, address, items, totalPrice } = req.body;

  // data Validation
  if (!firstName || !lastName || !address) {
    return res.status(400).json({
      message: "Please provide first name, last name, and address",
    });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    // simulate order placement
    console.log("Order placed:");
    console.log("Customer:", firstName, lastName);
    console.log("Address:", address);
    console.log("Items:", items);
    console.log("Total Price:", totalPrice);

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        firstName,
        lastName,
        address,
        items,
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

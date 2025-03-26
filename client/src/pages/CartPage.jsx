import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder } from "../services/api";
import { clearCart } from "../features/cart/cartSlice";
import CartItem from "../components/CartItem";
import Message from "../components/Message";

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      setOrderSuccess(true);
      dispatch(clearCart());
      toast.success("Order placed successfully!");
    },
    onError: (error) => {
      toast.error(
        `Failed to place order: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const onSubmit = (data) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    orderMutation.mutate(orderData);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Message variant="success">
          <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </Message>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <Message>
          Your cart is empty.{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Go back to shopping
          </button>
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              <div>
                {items.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="mb-4 pb-4 border-b">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block mb-1 font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="lastName" className="block mb-1 font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block mb-1 font-medium">
                    Address
                  </label>
                  <textarea
                    id="address"
                    className="w-full px-3 py-2 border rounded"
                    rows="3"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-600 transition"
                  disabled={orderMutation.isLoading}
                >
                  {orderMutation.isLoading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

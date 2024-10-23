import React from "react";
import { FaTrash } from "react-icons/fa";

const AddtoCartButton = ({quantity,data}) => {
  return (
    <div>
      {quantity === 0 ? (
        <button
          className="flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-neutral hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-secondary w-full"
          //   onClick={handleCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      ) : (
        <div className="flex justify-center space-x-2 w-full">
          <button
            // onClick={decrementQuantity}
            className={`flex items-center justify-center w-8 h-8 rounded-md ${
              quantity === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-secondary text-neutral"
            } transition duration-200`}
            disabled={quantity === 1}
          >
            -
          </button>

          <span className="mx-2 text-lg font-semibold">{quantity}</span>

          <button
            // onClick={incrementQuantity}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary text-neutral transition duration-200 "
          >
            <span className="mt-[2px]">+</span>
          </button>

          <button
            // onClick={deleteProductFromCart}
            className="flex items-center justify-center w-8 h-8 rounded-md text-secondary hover:bg-red-600  transition duration-200"
          >
            <FaTrash className="hover:text-neutral" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddtoCartButton;

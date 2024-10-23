import { Link } from "react-router-dom";
// import Rating from "./Rating";
// import { FaTrash } from "react-icons/fa";
import AddtoCartButton from "./AddtoCartButton.tsx";

const VehicleCard = ({
  productId = "1",
  productImage = "any",
  productPrice = 10,
  productDiscountPercent = 20,
  productTitle = "hi",
  productRating = 2,
  productActualPrice = 20,
}) => {
    const quantity = 10;
  return (
    <div className="m-4 flex w-full max-w-xs sm:max-w-sm md:max-w-md flex-col rounded-xl border border-gray-100 bg-neutral shadow-md">
      <Link to={`/products/${productId}`}>
        <div className="relative mx-3 mt-2 flex h-full overflow-hidden rounded-xl justify-center">
          <img
            className="object-cover w-[300px] h-[300px]"
            src={productImage}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-primary px-2 text-center text-sm font-medium text-neutral">
            {productDiscountPercent}%
          </span>
        </div>
      </Link>

      <div className="mt-4 px-5 pb-5">
        <Link to={`/products/${productId}`}>
          <h5 className="text-xl tracking-tight text-primary hover:text-cyan-600">
            {productTitle}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl p-2 font-bold text-primary">
              ${productPrice}
            </span>
            <span className="text-sm text-primary line-through">
              ${productActualPrice}
            </span>
          </p>
          {/* <Rating rating={productRating} /> */}
        </div>
        <AddtoCartButton
          quantity={quantity}
          data={{
            productId,
            productImage,
            productPrice,
            productDiscountPercent,
            productTitle,
            productRating,
            productActualPrice,
          }}
        />
      </div>
    </div>
  );
};

export default VehicleCard;

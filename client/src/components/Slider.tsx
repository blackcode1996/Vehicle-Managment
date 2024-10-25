import { useState } from "react";

const PriceRangeSlider = () => {
  const [price, setPrice] = useState(500);

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);
  };

  // Calculate the percentage of the slider value
  const percentage = (price / 1000) * 100;

  return (
    <div className="mb-6 mt-4">
      <h3 className="font-semibold text-sm">Price Range</h3>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-primary">$0</span>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={handlePriceChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(
              to right,
              rgba(255, 255, 255) ${percentage}%,
              rgba(2, 6, 23) ${percentage}%
            )`,
          }}
        />
        <span className="text-primary">$1000</span>
      </div>
      <p className="text-primary mt-2">Selected Price: ${price}</p>
    </div>
  );
};

export default PriceRangeSlider;

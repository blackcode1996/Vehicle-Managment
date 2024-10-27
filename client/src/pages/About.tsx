import wranglerImage from "../assets/wrangler.png";
import sedanImage from "../assets/sedan.png";

const AboutSection = () => {
  return (
    <section id="about" className="w-full mt-1 p-4 sm:p-8 lg:p-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="text-secondary text-xl sm:text-2xl lg:text-3xl font-semibold transition duration-600">
          About Us
        </p>
        <p className="text-lg sm:text-2xl lg:text-3xl font-medium transition duration-600">
          Your trusted partner in car rentals
        </p>
      </div>

      {/* About Safety Section */}
      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-3/5">
          <img
            src={wranglerImage}
            alt="Wrangler"
            className="w-full rounded-lg filter drop-shadow-glow transition duration-300 ease-in-out hover:drop-shadow-md-glow"
          />
        </div>
        <div className="w-full lg:w-3/5 text-justify">
          <h1 className="text-primary text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Safety and Reliability
          </h1>
          <p className="text-sm sm:text-base lg:text-lg">
            At Caring, safety is our top priority. All our vehicles are equipped with modern safety features, including advanced driver-assistance systems, ensuring you have a safe driving experience. We perform regular maintenance checks and thorough cleaning protocols to guarantee your comfort and peace of mind on the road. Our customer support team is available 24/7 to assist you with any inquiries or issues that may arise during your rental.
          </p>
        </div>
      </div>

      {/* About Management Section */}
      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8 mt-8">
        <div className="w-full lg:w-3/5 text-justify order-2 lg:order-1">
          <h1 className="text-primary text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Seamless Rental Experience
          </h1>
          <p className="text-sm sm:text-base lg:text-lg">
            Our car rental platform is designed for convenience and ease of use. Whether you're looking for a compact car for a city trip or an SUV for an adventure, our extensive fleet has you covered. We offer flexible rental options, including daily, weekly, and monthly rates. You can manage your bookings online with just a few clicks, ensuring a hassle-free experience from reservation to return. With our transparent pricing and no hidden fees, you can drive away with confidence.
          </p>
        </div>
        <div className="w-full lg:w-3/5 order-1 lg:order-2">
          <img 
            src={sedanImage} 
            alt="Sedan" 
            className="w-full rounded-lg filter drop-shadow-glow transition duration-300 ease-in-out hover:drop-shadow-md-glow" 
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

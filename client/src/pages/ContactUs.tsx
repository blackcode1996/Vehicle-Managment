import messageImage from "../assets/message.webp";
import githubIcon from "../assets/github.png";
import downloadIcon from "../assets/download.png";

const ContactUs = () => {
  const SendMessage = () => {
    alert("Message sent!");
  };

  return (
    <section id="ContactUs" className="w-full mt-4 p-4 sm:p-8 lg:p-8">
      <div className="text-center mb-8 p-2">
        <h1 className="text-secondary text-2xl sm:text-3xl lg:text-4xl font-semibold transition duration-600">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-medium transition duration-600">
          Ready to assist you
        </p>
      </div>

      <div
        id="contact-main"
        className="flex flex-col lg:flex-row items-center justify-between"
      >
        <div className="message-img w-full lg:w-1/2 mb-4 lg:mb-0">
          <img
            src={messageImage}
            alt="Message"
            className="w-4/5 mx-auto rounded-lg filter drop-shadow-glow transition duration-300 ease-in-out hover:drop-shadow-md-glow"
          />
        </div>
        <div id="contactForm" className="w-full lg:w-1/2">
          <form id="contactUsForm" className="flex flex-col">
            <div className="input mb-4">
              <input
                title="Please enter your name"
                id="name"
                type="text"
                placeholder="Enter your name 📛"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-secondary"
              />
            </div>
            <div className="input mb-4">
              <input
                title="Please enter the email address"
                id="email"
                type="email"
                placeholder="Enter your email 📧"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-secondary"
              />
            </div>
            <div className="input mb-4">
              <input
                title="Please enter mobile number"
                id="mobNo"
                type="tel"
                placeholder="Enter your number ☎️"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-secondary"
              />
            </div>
            <div className="input mb-4">
              <textarea
                title="Please write your suggestion"
                id="suggestion"
                cols={30}
                rows={5}
                placeholder="Suggestion ✍️"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-secondary"
              ></textarea>
            </div>
            <div className="input btn flex flex-col md:flex-row justify-between items-center">
              <div className="source flex items-center mb-4 md:mb-0">
                <div
                  title="Click to Checkout the source Code on Github"
                  id="github"
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      type="button"
                      className="flex items-center bg-secondary text-white py-2 px-4 rounded transition duration-300 hover:bg-primary"
                    >
                      Source Code on GitHub
                      <img src={githubIcon} alt="GitHub" className="w-6 ml-2" />
                    </button>
                  </a>
                </div>
                <div
                  className="download ml-4"
                  title="Click to Download the Source Code"
                >
                  <a>
                    <img src={downloadIcon} alt="Download" className="w-8" />
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  title="Send Message"
                  onClick={SendMessage}
                  className="bg-secondary text-white py-2 px-4 rounded transition duration-300 hover:bg-primary"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

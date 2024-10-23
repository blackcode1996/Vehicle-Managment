import playStore from "../assets/playStore.png";
import iosStore from "../assets/ios.png";
import Homepng from "../assets/img1.png";

const HeroSection = () => {
  return (
    <div>
       <main className="w-full h-screen bg-neutral transition duration-600" id="home">
            <section className="w-11/12 h-full flex flex-col md:flex-row mx-auto" id="container">
                <section className="w-full md:w-2/5 flex flex-col justify-center" id="home-left">
                    <div className="welcome w-4/5 text-4xl md:text-5xl font-extrabold transition duration-600 whitespace-nowrap">
                        <div>
                            <span className="text-secondary">Looking</span> to
                        </div>
                        <div>Rent a Car</div>
                    </div>
                    <div>
                        <p className="text-lg mt-5 transition duration-600 whitespace-nowrap">
                            Unlock unforgettable memories on the road.
                        </p>
                    </div>
                    <div className="w-full flex transition duration-600 mt-4">
                        <div className="w-1/2 md:w-1/3 mr-2">
                            <img
                                src={playStore}
                                alt="App Store"
                                className="w-full h-full rounded-[50px]"
                            />
                        </div>
                        <div className="w-1/2 md:w-1/3 mr-2">
                            <img src={iosStore} alt="iOS" className="w-full h-full rounded-[50px]" />
                        </div>
                    </div>
                </section>
                <section className="w-full md:w-3/5 relative overflow-hidden mt-4 md:mt-0 h-full" id="home-right">
                    <div className="hidden md:block w-7/12 h-full absolute top-12 left-1/2 transform -translate-x-1/2 rounded-tl-2xl rounded-tr-2xl bg-gray-800 bg-gradient-to-br from-primary to-secondary"></div>
                    <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <img src={Homepng} alt="Jeep" className="w-full" />
                    </div>
                </section>
            </section>
        </main>
    </div>
  )
}

export default HeroSection

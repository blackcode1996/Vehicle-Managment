import React from "react";

const Services = () => {
  return (
    <section className="w-full m-auto relative mt-[30px] ">
      <div className="w-full align-middle ">
        <h1>Services</h1>
      </div>
    </section>
  );
};

export default Services;

{
  /* <section id="services">
               <div class="services-head">
                    <h1>Services</h1>
               </div>
               <div id="services-main">
                    <div class="form-container">
                         <div class="form-enhancer"><img src="./images/logo.png" alt=""> </div>
                         <form id="form">
                              <div class="input-box"> <input type="text" id="name" placeholder="Name"> </div>
                              <div class="input-box" id="vehicleType">
                                   <div class="select-text"> Select your vehicle </div>
                                   <ul id="vehicle">
                                        <li>Jeep</li>
                                        <li>Bike</li>
                                        <li>Car</li>
                                        <li>Bus</li>
                                        <li>Truck</li>
                                   </ul>
                              </div>
                              <div class="input-box">
                                   <input type="text" id="reg_num" placeholder="Registeration number">
                              </div>

                              <div>
                                   <a id="gotoServicesPage">
                                        <button type="button" value="Find Slot" onclick="findSlot()">
                                             <span>
                                                  Find Slot
                                             </span>
                                             <img id="tukur" src="./images/giphy.webp" />
                                        </button>
                                   </a>
                              </div>
                         </form>
                    </div>
                    <div class="arrow-of-services">
                         <div class="arrow-services">
                              <img src="./images/red-arrow.webp" alt="">
                         </div>
                    </div>
                    <div class="parking-gif">
                         <!-- <img src="https://cdn.dribbble.com/users/2118336/screenshots/12113942/media/ec72a5e052af7792a64a1f3fd156af28.gif"
                              alt=""> -->
                         <img src="./images/Parking.png" alt="">
                    </div>
               </div>
               <!--  -->

               <!--  -->
               <section id="parking">
                    <div class="overlay-searching">
                         <div class="loader-searching" id="loader-searching">
                              <div>
                                   <img src="./images/animated-car-image-0252.gif" alt="">
                              </div>
                         </div>
                    </div>
                    <div id="floor">
                         <div id="lane1" class="lane">
                              <div class="slot" id="slot-1">
                                   <img src="./images/Bike.png" alt="">
                              </div>
                              <div class="slot" id="slot-2">
                                   <img src="./images/Bike.png" alt="">
                              </div>
                              <div class="slot" id="slot-3">
                                   <img src="./images/Bike.png" alt="">
                              </div>
                              <div class="slot" id="slot-4">
                                   <img src="./images/Bike.png" alt="">
                              </div>
                              <div class="slot" id="slot-5">
                                   <img src="./images/Bike.png" alt="">
                              </div>

                         </div>
                         <div id="lane2" class="lane">
                              <div class="slot" id="slot-1">
                                   <img src="./images/Jeep.png" alt="">
                              </div>
                              <div class="slot" id="slot-2">
                                   <img src="./images/Jeep.png" alt="">
                              </div>
                              <div class="slot" id="slot-3">
                                   <img src="./images/Jeep.png" alt="">
                              </div>
                              <div class="slot" id="slot-4">
                                   <img src="./images/Jeep.png" alt="">
                              </div>
                              <div class="slot" id="slot-5">
                                   <img src="./images/Jeep.png" alt="">
                              </div>

                         </div>
                         <div id="lane3" class="lane">
                              <div class="slot" id="slot-1">
                                   <img src="./images/Car.png" alt="">

                              </div>
                              <div class="slot" id="slot-2">
                                   <img src="./images/Car.png" alt="">

                              </div>
                              <div class="slot" id="slot-3">
                                   <img src="./images/Car.png" alt="">

                              </div>
                              <div class="slot" id="slot-4">
                                   <img src="./images/Car.png" alt="">

                              </div>
                              <div class="slot" id="slot-5">
                                   <img src="./images/Car.png" alt="">

                              </div>

                         </div>
                         <div id="lane4" class="lane">
                              <div class="slot" id="slot-1">
                                   <img src="./images/Bus.png" alt="">
                              </div>
                              <div class="slot" id="slot-2">
                                   <img src="./images/Bus.png" alt="">
                              </div>
                              <div class="slot" id="slot-3">
                                   <img src="./images/Bus.png" alt="">
                              </div>
                              <div class="slot" id="slot-4">
                                   <img src="./images/Bus.png" alt="">
                              </div>
                              <div class="slot" id="slot-5">
                                   <img src="./images/Bus.png" alt="">
                              </div>

                         </div>
                         <div id="lane5" class="lane">
                              <div class="slot" id="slot-1">
                                   <img src="./images/Truck.png" alt="">
                              </div>
                              <div class="slot" id="slot-2">
                                   <img src="./images/Truck.png" alt="">
                              </div>
                              <div class="slot" id="slot-3">
                                   <img src="./images/Truck.png" alt="">
                              </div>
                              <div class="slot" id="slot-4">
                                   <img src="./images/Truck.png" alt="">
                              </div>
                              <div class="slot" id="slot-5">
                                   <img src="./images/Truck.png" alt="">
                              </div>

                         </div>
                    </div>
                    <div class="parking-recipt">

                         <div class="recipt-container">
                              <h1>--Parking Receipt--</h1>
                              <div class="recipt-date">
                                   <div class="recipt">
                                        Receipt no: <span> --</span>
                                   </div>
                                   <div class="date">
                                        Date: <span> --</span>
                                   </div>
                              </div>
                              <div class="name">
                                   Name: <span> --</span>
                              </div>

                              <div class="reg_num">
                                   Reg no: <span>--</span>
                              </div>

                              <div class="type">
                                   Vehicle type: <span> --</span>
                              </div>

                              <div class="floor-slot">
                                   <div class="floor">
                                        Floor no: <span>--</span>
                                   </div>
                                   <span>|</span>
                                   <div class="Lane">
                                        Lane no: <span>--</span>
                                   </div>
                                   <span>|</span>
                                   <div class="Slot">
                                        Slot no: <span> --</span>
                                   </div>

                              </div>
                              <div class="totalPrice">
                                   Total price: <span> --</span>
                              </div>
                              <div class="promo-code">
                                   <div class="promo">
                                        <input type="text" placeholder="Enter Coupon code">
                                   </div>
                                   <div class="apply_promo">
                                        <button>Apply Promo</button>
                                   </div>
                              </div>

                              <div class="pay">
                                   <button>Pay <span></span></button>
                              </div>

                              <div id="paid">
                                   <img src="./images/paid.png" alt="">
                              </div>
                         </div>

                    </div>
               </section>

          </section> */
}

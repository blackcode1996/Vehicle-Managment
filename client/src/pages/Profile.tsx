import { useState } from "react";
import MyBookings from "../components/MyBookings";
import ProfilSection from "../components/ProfileSection";
import ResetPassword from "../components/ResetPassword";
import { useSelector } from "react-redux";
import { userData } from "../redux/slice/profileSlice";
import MyCars from "../components/MyCars";
import MyShop from "../components/MyShop";

const Profile = () => {
  const profile = useSelector(userData);
  const [selectedSection, setSelectedSection] = useState("Public Profile");

  const renderSection = () => {
    if (selectedSection === "Public Profile") {
      return <ProfilSection />;
    } else if (
      profile?.role === "CUSTOMER" &&
      selectedSection === "My Bookings"
    ) {
      return <MyBookings />;
    } else if (profile?.role === "ADMIN" && selectedSection === "My Cars") {
      return <MyCars />;
    } else if (profile?.role === "ADMIN" && selectedSection === "My Shop") {
      return <MyShop />;
    } else {
      return <ResetPassword />;
    }
  };

  return (
    <div className="bg-neutral w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-primary">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky top-12 flex flex-col gap-2 p-4 text-sm border-r border-secondary">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <div
            className={`flex items-center px-3 py-2.5 font-bold border text-neutral border-secondary cursor-pointer ${
              selectedSection === "Public Profile"
                ? "bg-secondary text-neutral rounded-full"
                : "text-primary border-none"
            }`}
            onClick={() => setSelectedSection("Public Profile")}
          >
            Public Profile
          </div>

          {profile?.role === "CUSTOMER" && (
            <div
              className={`flex items-center px-3 py-2.5 font-bold border text-neutral border-secondary cursor-pointer ${
                selectedSection === "My Bookings"
                  ? "bg-secondary text-neutral rounded-full"
                  : "text-primary border-none"
              }`}
              onClick={() => setSelectedSection("My Bookings")}
            >
              My Bookings
            </div>
          )}

          {profile?.role === "ADMIN" && (
            <div
              className={`flex items-center px-3 py-2.5 font-bold border text-neutral border-secondary cursor-pointer ${
                selectedSection === "My Shop"
                  ? "bg-secondary text-neutral rounded-full"
                  : "text-primary border-none"
              }`}
              onClick={() => setSelectedSection("My Shop")}
            >
              My Shop
            </div>
          )}

          {profile?.role === "ADMIN" && (
            <div
              className={`flex items-center px-3 py-2.5 font-bold border text-neutral border-secondary cursor-pointer ${
                selectedSection === "My Cars"
                  ? "bg-secondary text-neutral rounded-full"
                  : "text-primary border-none"
              }`}
              onClick={() => setSelectedSection("My Cars")}
            >
              My Cars
            </div>
          )}

          <div
            className={`flex items-center px-3 py-2.5 font-bold border text-neutral border-secondary cursor-pointer ${
              selectedSection === "Reset Password"
                ? "bg-secondary text-neutral rounded-full"
                : "text-primary border-none"
            }`}
            onClick={() => setSelectedSection("Reset Password")}
          >
            Reset Password
          </div>
        </div>
      </aside>

      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">{renderSection()}</div>
      </main>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import NoAvatar from "../assets/noAvatar.jpg";
import {
  getProfile,
  updateProfile,
  userData,
  userLoading,
  userError,
} from "../redux/slice/profileSlice";
import { profileValidationSchema } from "../utils/Validation";
import ProfileSkeleton from "./Skeletons/ProfileSkeleton";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Profile = () => {
  const dispatch = useAppDispatch();

  const profile = useSelector(userData);
  const loading = useSelector(userLoading);
  const error = useSelector(userError);

  const [initialValues, setInitialValues] = useState<any>(profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarDeleted, setAvatarDeleted] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    } else if (avatarDeleted) {
      setAvatarPreview(NoAvatar);
    } else {
      setAvatarPreview(profile?.avatar || NoAvatar);
    }
  }, [selectedFile, profile?.avatar, avatarDeleted]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setInitialValues(profile);
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAvatarDeleted(false);
    }
  };

  const checkChanges = (values: any) => {
    const isDifferent =
      JSON.stringify(values) !== JSON.stringify(initialValues) ||
      selectedFile ||
      avatarDeleted;
    setHasChanges(isDifferent ? true : false);
  };

  const handleSubmit = (values: any) => {
    const changedValues: any = {};

    for (const key in values) {
      if (values[key] !== initialValues[key]) {
        changedValues[key] = values[key];
      }
    }

    if (avatarDeleted) {
      changedValues.avatar = "";
    }

    if (selectedFile) {
      const formData: any = new FormData();

      for (const key in changedValues) {
        formData.append(key, changedValues[key]);
      }

      formData.append("avatar", selectedFile);

      dispatch(updateProfile(formData)).then(() => {
        dispatch(getProfile());
      });
    } else {
      if (Object.keys(changedValues).length > 0) {
        dispatch(updateProfile(changedValues)).then(() => {
          dispatch(getProfile());
        });
      }
    }
  };

  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg border border-secondary">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">
        <span> {profile?.role === "ADMIN" ? "Seller" : "Customer"} </span>{" "}
        Profile
      </h2>

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {profile && (
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={profileValidationSchema}
              onSubmit={handleSubmit}
              validateOnChange
            >
              {({ values }) => {
                useEffect(() => {
                  checkChanges(values);
                }, [values, selectedFile, avatarDeleted]);

                return (
                  <Form>
                    <div className="grid max-w-2xl mx-auto mt-8">
                      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        <img
                          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-secondary"
                          src={avatarPreview || NoAvatar}
                          alt="Avatar"
                        />
                        <div className="flex flex-col space-y-5 sm:ml-8">
                          <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                          <button
                            type="button"
                            className="py-3.5 px-7 text-base font-medium text-neutral focus:outline-none bg-secondary rounded-lg border border-indigo-200 hover:bg-indigo-900"
                            onClick={() =>
                              document.getElementById("file-input")?.click()
                            }
                          >
                            Change picture
                          </button>
                        </div>
                      </div>

                      <div className="items-center mt-8 sm:mt-14 text-black">
                        {/* Name Field */}
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium"
                          >
                            Your name
                          </label>
                          <Field
                            name="name"
                            type="text"
                            className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                            placeholder="John Doe"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-secondary text-sm"
                          />
                        </div>

                        {/* Email Field */}
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                          >
                            Your email
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                            placeholder="your.email@mail.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-secondary text-sm"
                          />
                        </div>

                        {/* Phone Field */}
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium"
                          >
                            Phone
                          </label>
                          <Field
                            name="phone"
                            type="text"
                            className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                            placeholder="your phone"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-secondary text-sm"
                          />
                        </div>

                        {/* Address Field */}
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium"
                          >
                            Address
                          </label>
                          <Field
                            name="address"
                            type="text"
                            className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                            placeholder="123 Main St, City, Country"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-secondary text-sm"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={!hasChanges}
                            className={`w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${
                              !hasChanges ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;

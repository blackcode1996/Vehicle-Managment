import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ShopImg from "../assets/shopImg.jpg";
import {
  shopData,
  shopLoading,
  shopError,
  getShop,
  updateShop,
} from "../redux/slice/shopSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import SkeletonLoader from "../components/Skeletons/ShopSkeleton";
import { shopValidationSchema } from "../utils/Validation";

const MyShop = () => {
  const dispatch = useAppDispatch();
  const shop = useSelector(shopData);
  const loading = useSelector(shopLoading);
  const error = useSelector(shopError);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);

  const handleSubmit = (values: {
    name: string;
    address: string;
    description: string;
  }) => {
    if (shop.length > 0) {
      dispatch(updateShop({ shopId: shop[0].id, shopData: values })).then(()=>{
        dispatch(getShop());
      })
    }
  };

  const initialValues = {
    name: shop[0]?.name || "",
    address: shop[0]?.address || "",
    description: shop[0]?.description || "",
  };

  console.log(isChanged);

  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg border border-secondary">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Shop Details</h2>

      {loading && <SkeletonLoader />}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && shop.length > 0 && (
        <Formik
          initialValues={initialValues}
          validationSchema={shopValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => {
            useEffect(() => {
              setIsChanged(
                values.name !== initialValues.name ||
                values.address !== initialValues.address ||
                values.description !== initialValues.description
              );
            }, [values, initialValues]);

            return (
              <Form>
                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-secondary m-auto"
                      src={ShopImg}
                      alt="Avatar"
                    />
                  </div>

                  <div className="items-center mt-8 sm:mt-14 text-black">
                    {/* Name Field */}
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Shop Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="John Doe's Shop"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Address Field */}
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="address" className="block mb-2 text-sm font-medium">
                        Shop Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="123 Main St, City, Country"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Description Field */}
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium">
                        Shop Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="....."
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isChanged} 
                        className={`w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${
                          !isChanged ? "opacity-50 cursor-not-allowed" : ""
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
    </div>
  );
};

export default MyShop;

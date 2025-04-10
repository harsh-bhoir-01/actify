import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter, addUser } from "../utils/userSlice"; // Actions to update the global state

// Using React.memo to optimize rendering of UserForm
const UserForm = React.memo(() => {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const { users } = useSelector((state) => state.user); // Get users from global state

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Optimized onSubmit using useCallback to prevent unnecessary re-creations of this function
  const onSubmit = useCallback(
    (data) => {
      // Get the highest current ID from the users list
      const highestId =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

      // Generate a new ID by incrementing the highest ID
      const newUser = {
        ...data,
        id: highestId + 1, // Increment the highest ID by 1
      };

      dispatch(addUser(newUser)); // Add user to global state
      dispatch(setGlobalFilter("")); // Clear the global filter to show all users
      console.log(newUser); // You can handle the submitted data here if needed

      // Reset the form fields after submission
      reset();
      setIsFormVisible(false); // Hide the form after submission
    },
    [dispatch, reset, users] // Added users as a dependency
  );

  return (
    <div className=" w-full flex justify-end   my-4 ">
      <div className="font-serif  max-w-md px-4  ">
        {/* Button to show the form */}
        <div className="flex flex-wrap justify-center">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className=" p-2 bg-blue-500 text-white rounded px-6 text-xs cursor-pointer "
          >
            Add User
          </button>
        </div>

        {/* Conditionally render the form */}
        {isFormVisible && (
          <div>
            <h2 className=" font-semibold my-4 ">Add New User</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className=" w-full">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded w-full"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Age */}
              <div className="w-full">
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Age must be at least 18" },
                  })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded w-full"
                />
                {errors.age && (
                  <span className="block text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </span>
                )}
              </div>

              {/* Contact Number */}
              <div className="w-full">
                <label className="block text-sm font-medium">
                  Contact Number
                </label>
                <input
                  type="number"
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Contact number must be 10 digits",
                    },
                  })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded w-full"
                />
                {errors.contactNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>

              {/* Gmail */}
              <div className=" w-full">
                <label className="block text-sm font-medium">Gmail</label>
                <input
                  type="email"
                  {...register("gmail", {
                    required: "Gmail is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid Gmail address",
                    },
                  })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded  w-full"
                />
                {errors.gmail && (
                  <span className="text-red-500 text-sm">
                    {errors.gmail.message}
                  </span>
                )}
              </div>

              {/* Place */}
              <div className=" w-full">
                <label className="block text-sm font-medium">Place</label>
                <input
                  type="text"
                  {...register("place", { required: "Place is required" })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded  w-full"
                />
                {errors.place && (
                  <span className="text-red-500 text-sm">
                    {errors.place.message}
                  </span>
                )}
              </div>

              {/* Designation */}
              <div className="w-full">
                <label className="block text-sm font-medium">Designation</label>
                <input
                  type="text"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  className="mt-1 p-2 border border-gray-300/65 shadow-md rounded w-full"
                />
                {errors.designation && (
                  <span className="text-red-500 text-sm">
                    {errors.designation.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-wrap justify-center">
                <button
                  type="submit"
                  className=" mt-4 p-2 bg-blue-500 text-white rounded text-sm cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
});

export default UserForm;

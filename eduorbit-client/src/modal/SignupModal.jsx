import { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload } from "../hooks/imageUpload";
import GoogleSignIn from "../components/GoogleSignIn";

const SignupModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/home";
  if (!isOpen) return null;
  const onSubmit = async (data) => {
    const image = data.image[0];
    console.log("image image", image);
    const imageUrl = await imageUpload(image);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };
        updateUserProfile(userProfile)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Student Created!",
              text: "Your Student Account was successfully.",
              timer: 2000,
              toast: true,
              showConfirmButton: false,
              position: "top-end",
            });
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Enter Your Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* name field */}
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Select Your Profile picture"
            />

            {/* email field */}
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Enter Your Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* password field*/}
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Enter Your Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700"
            >
              Signup
            </button>
          </fieldset>
        </form>
        <div className="flex justify-center items-center">
          <GoogleSignIn />
        </div>
        <button
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default SignupModal;

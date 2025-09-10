import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleSignIn from "../components/GoogleSignIn";

const LoginModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { logIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/home";

  if (!isOpen) return null;

  const onSubmit = (data) => {
    logIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
          position: "top-end",
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          position: "top-end",
        });
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Email field */}
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Enter Your Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* Password field */}
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
              className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
            >
              Login
            </button>
          </fieldset>
        </form>

        <div className="flex justify-center items-center mt-3">
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

export default LoginModal;

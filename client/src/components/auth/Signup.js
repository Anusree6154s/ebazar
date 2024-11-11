import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../../redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedInUser);

  if (user && !user.error) {
    if (user.role === "user") {
      return <Navigate to="/" replace={true}></Navigate>;
    } else {
      return <Navigate to="/admin" replace={true}></Navigate>;
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center h-screen overflow-hidden">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-[#afe3ffed] text-center hidden lg:flex justify-center">
            <img src="/images/signup-image.png" alt="" />
          </div>
          <div className="lg:w-1/2 xl:w-5/12 ">
            <div className="mt-6 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form
                    noValidate
                    method="POST"
                    onSubmit={handleSubmit((data) => {
                      dispatch(
                        createUserAsync({
                          email: data.email,
                          password: data.password,
                          addresses: [],
                          role: data.role,
                          //role will be given vis backend
                        })
                      );
                    })}
                  >
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Email not valid",
                        },
                      })}
                      className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-warning">{errors.email.message}</p>
                    )}
                    {user && user.error && (
                      <p className="text-warning">Email must be unique</p>
                    )}
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                      type="password"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-warning">{errors.password.message}</p>
                    )}
                    <input
                      {...register("confirmPassword", {
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password not matching",
                      })}
                      className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-warning">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    <select
                      {...register("role", {
                        required: "Role is required",
                      })}
                      className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                      name="role"
                      id="role"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role && (
                      <p className="text-warning">{errors.role.message}</p>
                    )}

                    <button
                      type="submit"
                      className="mt-7 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <span>Already a member? </span>
                    <button
                      onClick={() => navigate("/login")}
                      className="border-b border-primary border-dotted text-primary hover:text-primary-hover font-bold"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

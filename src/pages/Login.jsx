import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialLogin from "../components/SocialLogin";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const getState = location?.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signInUser(email, password)
      .then((result) => {
        if (result) {
          navigate(getState);
        }

        toast.success("Successfully Logged In");
      })
      .catch(() => {
        toast.error("Email & Password Don't Match");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card shadow-2xl my-10 bg-slate-100 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-center text-2xl text-black font-semibold mt-6">
           Login
        </h1>

        
        <form onSubmit={handleLogin} className="card-body p-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="password"
              className="input input-bordered"
              name="password"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute bottom-4 right-2 cursor-pointer"
            >
              {/* {showPass ? <FaEye /> : <FaEyeSlash />} */}
            </span>
          </div>
          <div className="form-control">
            <button
              type="submit"
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg focus:ring-2"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                Sign In
              </span>
            </button>
          </div>
        </form>
        <div className="px-6">
          <SocialLogin></SocialLogin>

          <p className="my-4">
            Create An Account?{" "}
            <NavLink className="text-black" to="/Register">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

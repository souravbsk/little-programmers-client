import { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/"
    const {loginUser } = useContext(AuthContext)
    const handleLogin = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        const email = form.email.value;
        loginUser(email,password)
        .then((res : any) => {
            const user = res.user;
            navigate(from, {replace: true})
        })
        .catch((error : any) => {
            console.log(error.message);
        })
    }

  return (
    <div className="container">
      <h1 className="text-2xl text-center my-4">
        Welcome to <span className="font-semibold">Back!</span>
      </h1>
      <form onSubmit={handleLogin} className="px-5 md:w-6/12 mx-auto">
        <div className="form-control py-3">
        
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input border-blue-600"
          />
        </div>
        <div className="form-control">
   
          <input
            type="password"
            name='password'
            placeholder="password"
            className="input border-blue-600"
          />
         
        </div>
        <div className="form-control text-center">
   
        <label className="label justify-center">
            <Link to="#" className="label-text-alt text-xl  link link-hover">
              Forgot password?
            </Link>
          </label>
        </div>
        <div className="form-control ">
          <button className="btn bg-blue-600 text-white">Continue</button>
        </div>
      </form>
      <p className="text-center">Don't have an account? <Link className="text-gray-400" to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;

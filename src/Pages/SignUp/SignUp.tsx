import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const VITE_IMGBB_API = import.meta.env.VITE_IMGBB_API;
const SignUp = () => {

    const navigate = useNavigate();


  const { createUserSignIn,updateUser } = useContext(AuthContext);

  const imgHostUrl = `https://api.imgbb.com/1/upload?key=${VITE_IMGBB_API}`;
  const handleSignIn = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.file.files[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(imgHostUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const photoUrl = data?.data?.display_url;
        const newUser = {email, name, photoUrl}
          createUserSignIn(email, password)
            .then((res: any) => {
              const user = res.user;
              updateUser(res.user,photoUrl,name)
              fetch("https://little-programmers-server.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
              })
              .then(res => res.json())
              .then(data => {
               if(data.insertedId){
                navigate("/")
               }
              })
            })
            .catch((err: any) => {
              console.log(err.message);
            });
        }
      });
  };

  return (
    <div className="container">
      <h1 className="text-2xl text-center my-4">
        Welcome to <span className="font-semibold">Back!</span>
      </h1>
      <form onSubmit={handleSignIn} className="px-5 md:w-6/12 mx-auto">
        <div className="form-control pb-3">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input border-blue-600"
          />
        </div>
        <div className="form-control pb-3">
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
            name="password"
            placeholder="password"
            className="input border-blue-600"
          />
        </div>
        <div className="form-control text-center border-blue-600 border mt-3 rounded-2xl">
          <input name="file" type="file" className="file-input w-full " />
        </div>
        <div className="form-control py-5">
          <button className="btn bg-blue-600 text-white">Continue</button>
        </div>
      </form>
      <p className="text-center">
        Don't have an account?{" "}
        <Link className="text-gray-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

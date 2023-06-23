import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import createUserLogo from "../assets/createUsr/createUser-logo.png"

const CreateUser = () => {
    return (
        <div className='h-screen  flex items-center justify-center'>
          <div className='w-full'>
          <div>
                <Link to="/"><img className='max-w-full w-32 h-32 mx-auto ' src={createUserLogo} alt="" /></Link>
            </div>
            <Outlet></Outlet>
          </div>
        </div>
    );
};

export default CreateUser;
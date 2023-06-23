import React from 'react';
import { Link } from 'react-router-dom';

const WelComeUser = () => {
    return (
        <div className='container'>
            <div className='flex items-center justify-center'>
                <div className='text-center'>
                     <h2 className='md:text-3xl font-medium'>Welcome to Agile3 Team</h2>
                     <h3 className='md:text-3xl font-medium mt-5'>Log in with your account to continue</h3>
                    <div className='mt-5'>
                        <Link to="/login"><button className='btn bg-blue-600 mr-5 text-white'>Login</button></Link>
                        <Link to="/signup"><button className='btn bg-blue-600 text-white'>Sign up</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelComeUser;
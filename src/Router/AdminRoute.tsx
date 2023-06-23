import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute =({children}: any) => {
    const {user,loading} = useContext(AuthContext);
  const [isAdmin,setAdmin,adminLoading] = useAdmin();
  
    const location = useLocation();

    if(adminLoading){
        return <div className='text-center'><span className="loading loading-infinity loading-lg"></span></div>
    }
    if( isAdmin){
        return children
    }

    return <Navigate to="/" state={{from:location}} replace></Navigate>
};


export default AdminRoute;
import React,{useContext,useState,useEffect} from 'react';
import { AuthContext } from '../providers/AuthProviders';
const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const [adminLoading,setLoading] = useState(true)

    const [isAdmin,setAdmin] = useState(false)
    useEffect(() => {
        fetch(`https://little-programmers-server.vercel.app/users/admin/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setAdmin(data?.admin);
            setLoading(false)
        })
    },[user])

    return [isAdmin,setAdmin,adminLoading]
};

export default useAdmin;
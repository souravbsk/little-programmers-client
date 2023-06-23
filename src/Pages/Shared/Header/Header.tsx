import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoPic from "../../../assets/nav/logopic.png";
import logo from "../../../assets/nav/logo.png";
import { AuthContext } from "../../../providers/AuthProviders";
import { ReFetchContext } from "../../../providers/RefetchProvider";
import { FaBars } from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";
const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const {dataRefetch,setDataRefetch} = useContext(ReFetchContext);
  const [isToggle,setToggle] = useState(false);
  const [isAdmin,setAdmin] = useAdmin();


  console.log(user);
  const handleLogOut = () => {
    logOutUser();
  };


  const [Groups,setGroups] = useState([])
  const url = `https://little-programmers-server.vercel.app/group-invitation/${user?.email}`
  useEffect(() => {
    if(user){
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
        });
    }
    
  }, [user,dataRefetch]);

  return (
    <div className="navbar md:items-center items-start flex-col md:flex-row py-6 px-6 md:px-28 bg-[#FFF9F9]">
      <div className="flex-1 flex items-center justify-between w-full">
        <Link to="/" className=" flex items-center gap-5 normal-case text-xl">
          <img src={logoPic} alt="" />
          <img src={logo} alt="" />
        </Link>
        <div className="md:hidden block" >
          <button onClick={() => setToggle(!isToggle)} className="text-2xl"><FaBars></FaBars></button>
        </div>
      </div>
      <div className="flex-none">
        <ul className={`flex md:static z-30 pb-8 md:pb-0 absolute top-24 md:w-full w-1/2 bg-white md:bg-transparent flex-col md:flex-row items-center gap-3 md:gap-6 duration-300 ${isToggle ? "left-0" : "-left-96"}`}>
          <li className="">
            <Link className="font-medium" to="/availability">
              Availability
            </Link>
          </li>
          <li className="mx-5">
            <Link className="font-medium" to="/integration">
              Integration
            </Link>
          </li>
          <li className="mx-5">
            <Link className="font-medium" to="/community">
              Community
            </Link>
          </li>
          {
            isAdmin && <li className="mx-5">
            <Link className="font-medium" to="/manage-user">
              Manage User
            </Link>
          </li>
          }
          {user && (
            <li className="">
              <Link className="font-medium" to="/user-dashboard">
                Dashboard
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="">
                <button onClick={handleLogOut} className="btn">
                  LogOut
                </button>
              </li>
              <li>
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-md badge-primary indicator-item">{Groups.length || 0}</span>
                  </div>
                </button>
              </li>
              <li>
                <div className=" border-2 overflow-hidden rounded-full">
                  <img className="w-12 h-12" src={user?.photoURL} />
                </div>
              </li>
            </>
          ) : (
            <li className="">
              <Link className="font-medium" to="/welcomeuser">
                create user
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

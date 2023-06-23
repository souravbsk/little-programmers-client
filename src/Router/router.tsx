import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import CreateUser from "../Layout/CreateUser";
import WelComeUser from "../Pages/WelcomeUser/WelComeUser";
import GroupTeams from "../Pages/GroupTeams/GroupTeams";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import InvitationReceived from "../Pages/InvitationReceived/InvitationReceived"
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../Pages/ManageUser/ManageUser";
const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/group/:id",
          element:<PrivateRoute><GroupTeams></GroupTeams></PrivateRoute>,
          loader:({params}) => fetch(`https://little-programmers-server.vercel.app/allRoles/${params?.id}`)
        },
        {
          path:"/user-dashboard",
          element:<InvitationReceived></InvitationReceived>
        },
        {
          path:"/manage-user",
          element:<PrivateRoute><ManageUser></ManageUser></PrivateRoute>
        }
      ]
    },{
      path:"/",
      element:<CreateUser></CreateUser>,
      children:[
        {
          path:"/welcomeuser",
          element:<WelComeUser></WelComeUser>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signup",
          element:<SignUp></SignUp>
        }
      ]
    }
  ]);


  export default router;
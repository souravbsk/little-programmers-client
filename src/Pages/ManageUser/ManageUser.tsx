import { useContext, useEffect, useState } from "react";
import { FaUserCog, FaUserLock } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageUser = () => {
    const [users,setUsers] = useState([]);
    const [reFetch,setReFetch] = useState(true)
    useEffect(() => {
        fetch("https://little-programmers-server.vercel.app/users")
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        })
    },[reFetch])


    const handleMakeAdmin = (id : string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to admin this user",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://little-programmers-server.vercel.app/users/admin/${id}`,{
                    method:"PUT",
                    headers:{
                        'content-type':"application/json"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount > 0){
                        setReFetch(!reFetch)
                        Swal.fire(
                            'success!',
                            'admin create success',
                            'success'
                          )
                    }
                })

             
            }
          })
    }

    return (
        <div className="container">
            <h2 className="text-xl md:text-2xl font-bold">Manage Users:</h2>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
 
    <thead>
      <tr>
        <th>
        User
        </th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
   
      {
users.map((user,i) => <tr>
    <td key={i}>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={user?.photoUrl} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold">{user.name}</div>
          <div className="text-sm opacity-50">{user.email}</div>
        </div>
      </div>
    </td>
    <td>
      <span className="badge  badge-primary font-bold">{user.role}</span>
    </td>
    <th>
     {user.role !== "admin" &&  <button onClick={() => handleMakeAdmin(user?._id)} className="btn btn-primary"><FaUserCog></FaUserCog></button>}
    </th>
  </tr>)
      }
      
      
    </tbody>
    {/* foot */}
    <tfoot>
    <tr>
        <th>
        User
        </th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>
            </div>
        </div>
    );
};

export default ManageUser;
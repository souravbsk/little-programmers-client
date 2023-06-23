import React, { useEffect, useState } from "react";
import teamIMg from "../../assets/team/team.png";
import NewTeamModal from "../../Components/NewTeamModal/NewTeamModal";
import AddMember from "../../Components/AddMember/AddMember";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";

const GroupTeams = () => {
  const [reFetch, setFetch] = useState(true);
  const selectData = useLoaderData();
  const [isAdmin,setAdmin] = useAdmin();

  console.log(selectData);
  const { id } = useParams();
  const [isStatus, setStatus] = useState("active");
  const [teamMember, setTeamMember] = useState([]);
  useEffect(() => {
    fetch(`https://little-programmers-server.vercel.app/groups/${id}?status=${isStatus}`)
      .then((res) => res.json())
      .then((data) => {
        setTeamMember(data);
      });
  }, [isStatus, reFetch]);

  const handleRemoveMember = (email: string) => {
    console.log(email);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't Delete this member",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://little-programmers-server.vercel.app/group-user-delete/${id}?email=${email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              setFetch(!reFetch);
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleRoleModify = (e, email) => {
    const role = e.target.value;
    console.log(role, email);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't Change this user role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      fetch(`https://little-programmers-server.vercel.app/group-user-role/${id}?email=${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            setFetch(!reFetch);
            if (result.isConfirmed) {
              Swal.fire(
                "success!",
                "user role changed successfully",
                "success"
              );
            }
          }
        });
    });
  };
 // @ts-ignore 
  const allUserImage = teamMember?.userResult?.map((user) => user?.image);

  console.log(isAdmin);
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          
          <h1 className="text-2xl md:text-3xl font-bold">
             {/* @ts-ignore */}
            Team ({teamMember?.groupResult?.teamName})
          </h1>
          <div className="mt-5">
            <button
              onClick={() => setStatus("active")}
              className="btn btn-outline text-blue-600 mr-5 font-medium  border-blue-600 "
            >
               {/* @ts-ignore */}
              Active members ({teamMember?.active || 0})
            </button>
            <button
            disabled={!isAdmin}
              onClick={() => setStatus("pending")}
              className="btn btn-outline text-blue-600 mr-5 font-medium  border-blue-600 "
            >
               {/* @ts-ignore */}
              Pending ({teamMember?.pending || 0})
            </button>
          </div>
        </div>
        
        <div>

          <label
      //@ts-expect-error
        
          disabled={!isAdmin}
            htmlFor="my_modal_11"
            className="btn btn-outline bg-blue-600 mr-5  text-white border-blue-600 "
          >
            Add members
          </label>
          <label
      //@ts-expect-error
          disabled={!isAdmin}
            htmlFor="my_modal_6"
            className="btn btn-outline text-blue-600   border-blue-600 "
          >
            Assign a Group
          </label>
        </div>
      </div>
      <div>
        <div className="avatar-group mt-8 -space-x-6">
          {allUserImage?.map((img,i) => (
            <div key={i} className="avatar border-2 border-[#FAF3F3]">
              <div className="w-14">
                <img src={img} />
              </div>
            </div>
          ))}
        </div>
      </div>
 {/* @ts-ignore */}
      {teamMember?.userResult ? (
        <div className="overflow-x-auto my-12 bg-base-300 p-5 rounded-xl border border-blue-600">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {/* @ts-ignore */}
              {teamMember?.userResult?.map((user, i) => (
                <tr
                  className="bg-white border border-blue-600 mb-5 rounded-lg"
                  key={i}
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm opacity-50">
                          {user?.memberEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.memberTitle}</td>
                  <td>{user?.status}</td>
                  <td>
                    <select
                      onChange={(e) => handleRoleModify(e, user?.memberEmail)}
                      defaultValue={user?.memberRole}
                      className="select w-full max-w-xs"
                    >
                       {/* @ts-ignore */}
                      {selectData?.roles?.map((role,i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveMember(user?.memberEmail)}
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {/* row 2 */}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="border overflow-hidden border-blue-600 mb-12 rounded-2xl">
          <img className="w-full h-56 md:h-[530px]" src={teamIMg} alt="" />
        </div>
      )}

      <NewTeamModal reFetch={reFetch} setFetch={setFetch}></NewTeamModal>
      <AddMember
        selectData={selectData}
        reFetch={reFetch}
        setFetch={setFetch}
      ></AddMember>
    </div>
  );
};

export default GroupTeams;

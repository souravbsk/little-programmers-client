import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { ReFetchContext } from "../../providers/RefetchProvider";

const invitationReceived = () => {
  const { user } = useContext(AuthContext);
  const {dataRefetch,setDataRefetch} = useContext(ReFetchContext)
  const [Groups, setGroups] = useState([]);
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

  const handleAccept = (group: any) => {
    const groupId = group?.groups?._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You want Accept this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://little-programmers-server.vercel.app/group-invitation-accept/${groupId}?email=${user?.email}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if(data.modifiedCount>0){
                setDataRefetch(!dataRefetch)
                Swal.fire("Success!", "Group Invitation Accepted", "success");
            }
          });
      }
    });
  };


  const handleReject = (group: any) => {
    const groupId = group?.groups?._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You want Reject this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://little-programmers-server.vercel.app/group-invitation-reject/${groupId}?email=${user?.email}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if(data.modifiedCount>0){
                setDataRefetch(!dataRefetch)
                Swal.fire("Success!", "Group Invitation Rejected", "success");
            }
          });
      }
    });
  };


  console.log(Groups);
  return (
    <div className="container mt-6">
      <h2 className="text-3xl font-bold ">My Dashboard</h2>
      {
        Groups.length ===0 &&   
       <p className="text-center font-medium my-6">Not Invitation Are available</p>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
        {Groups.map((group, i) => (
          <div
            className="border-2 flex flex-col items-center justify-between px-5 py-4 rounded-xl"
            key={i}
          >
            <h2 className="text-xl ">You have received a team invitation from the <span className="font-bold">{group?.groups?.teamName}</span></h2>
            <p className="mt-3 md:mt-6 mb-3">Join the {group?.groups?.teamName} Team as a new team member</p>
            <div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-5 ">
                  <div className="shrink-0" >
                    <img
                      className="w-24 h-24 rounded-xl"
                      src={group?.groups?.image}
                      alt=""
                    />
                  </div>
                  <div className="shrink-0">
                    <h1 className="text-xl font-medium">
                    {group?.groups?.creatorName} Team (CEO)
                    </h1>
                    
                    <p>
                
                        {group?.groups?.creatorMail}
            
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold  md:text-xl">
                    {group?.memberRole} Role
                  </h2>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button onClick={() => handleReject(group)} className="btn font-bold mr-6">Reject</button>
              <button
                onClick={() => handleAccept(group)}
                className="btn btn-primary bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
        
    </div>
  );
};

export default invitationReceived;

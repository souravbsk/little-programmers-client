import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { TagsInput } from "react-tag-input-component";
import useAdmin from "../../Hooks/useAdmin";

type userProps = {
  reFetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const VITE_IMGBB_API = import.meta.env.VITE_IMGBB_API;

const NewTeamModal = (props: userProps) => {
  const { reFetch, setFetch } = props;
  const {user} = useContext(AuthContext)
  const [selected, setSelected] = useState(["leader"]);

  const imgHostUrl = `https://api.imgbb.com/1/upload?key=${VITE_IMGBB_API}`;
  const handleCreateFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const teamName = (form.elements.namedItem("teamName") as HTMLInputElement)
      .value;
    const teamTitle = (form.elements.namedItem("teamTitle") as HTMLInputElement)
      .value;
    const paragraph = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
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
          const newGroup = {
            teamName,
            teamTitle,
            paragraph,
            roles: selected,
            image: photoUrl,
            creatorName: user?.displayName,
            creatorMail: user?.email
          };


          fetch("https://little-programmers-server.vercel.app/groups", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newGroup),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                setFetch(!reFetch);
                form.reset()
                setSelected([])
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your group has been created",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              else if(data?.message){
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: "Same Name Group Already Exist",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              console.log(data);
            });

        }
      });

 
   
  };

  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-base-300">
          <form onSubmit={handleCreateFrom} className="">
            <h1 className="font-medium">Create a new team</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Team name</span>
              </label>
              <input
                required
                type="text"
                name="teamName"
                placeholder="Team name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Team title</span>
              </label>
              <input
                type="text"
                required
                name="teamTitle"
                placeholder="Team title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Group Roles</span>
              </label>
              <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter fruits"
      />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Team Description</span>
              </label>
              <textarea
                required
                name="description"
                placeholder="Team Description"
                className="input p-5 h-20 resize-none input-bordered"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Group Image</span>
              </label>
              <input
                name="file"
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
            <div className="flex justify-between">
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn px-8 rounded-full ">
                  Cancel
                </label>
              </div>
              <div className="form-control mt-6">
                <button  className="btn px-8 rounded-full bg-[#0A6AF6] btn-primary">
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTeamModal;

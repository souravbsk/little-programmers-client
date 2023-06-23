import React,{useContext, useState} from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultLIst from "../SearchBar/SearchResultLIst";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ReFetchContext } from "../../providers/RefetchProvider";


type userProps = {
  reFetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  selectData: any;
};




const AddMember = (props: userProps) => {
  const { reFetch, setFetch,selectData } = props;
  const {dataRefetch, setDataRefetch} = useContext(ReFetchContext)
  const {id} = useParams();
  console.log(id);
const [result,setResult] = useState([])
const [clickValue,setClickValue] = useState("")


const handleaddMember = (e: any) => {
  e.preventDefault()
  const form = e.target;
  const memberTitle = form.title.value;
  const memberRole = form.role.value;
  const memberEmail = result[0]?.email;
  const newMember =  {memberTitle,memberRole,memberEmail};

  fetch(`https://little-programmers-server.vercel.app/groups/${id}`,{
    method:"PUT",
    headers:{
      'content-type':"application/json"
    },
    body:JSON.stringify(newMember)
  })
  .then(res => res.json())
  .then(data => {
    if(data.modifiedCount > 0){
      setFetch(!reFetch)
      setDataRefetch(!dataRefetch)
      form.reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Member Added Success',
        showConfirmButton: false,
        timer: 1500
      })
    }
   
    // modifiedCount

    console.log(data);
  })

}

  
  return (
    <div>
      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_11" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-base-300">
          <h2 className="font-bold text-xl text-black mb-3">Who do you want to add new members?</h2>
          <form onSubmit={handleaddMember}
            className="card-body 
          "
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select name="role"  className="select w-full">
                {
                  selectData?.roles?.map((role,i) => <option key={i} value={role}>{role}</option>)
                }
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Add new member to join group</span>
              </label>
              <SearchBar clickValue={clickValue} setResult={setResult}></SearchBar>
              <SearchResultLIst setClickValue={setClickValue} result={result}></SearchResultLIst>
            </div>
            <div className=" mt-6 flex items-center justify-between">
            <div className="modal-action mt-0">
            <label htmlFor="my_modal_11" className="btn px-10 rounded-full">
              Close!
            </label>
          </div>
              <button className="btn btn-primary font-bold rounded-full bg-blue-600">Add member</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AddMember;

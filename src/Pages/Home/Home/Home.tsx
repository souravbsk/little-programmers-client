import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TeamCard from "../../../Components/TeamCard/TeamCard";
import NewTeamModal from "../../../Components/NewTeamModal/NewTeamModal";
import useAdmin from "../../../Hooks/useAdmin";


  
const Home = () => {
    const [reFetch,setFetch] = useState(true);
    const [teams,setTeam] = useState([]);

    const [isAdmin,setAdmin] = useAdmin();



    useEffect(() => {
        fetch("https://little-programmers-server.vercel.app/groups")
        .then(res => res.json())
        .then(data => setTeam(data))
    },[reFetch])


    const handleRemoveGroup= (id: string) => {

    }


  return (
    <div className="container mt-5">
      <div className="flex gap-6 flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Team Creation management system
          </h1>
          <p className=" mt-4 text-gray-500 text-xl font-medium">
            Existing Team
          </p>
        </div>
        <div>
 

        <label disabled={!isAdmin} htmlFor="my_modal_6" className="btn btn-outline text-blue-600 font-bold border-blue-600 "><FiPlus></FiPlus> Create a team</label>


    
      
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 md:mt-12 gap-6 md:gap-12">
        {
            teams?.map((team,i) => <TeamCard handleRemoveGroup={handleRemoveGroup} key={i}  team={team}></TeamCard>)
        }
      </div>
      <NewTeamModal reFetch={reFetch} setFetch={setFetch}></NewTeamModal>
    </div>
  );
};

export default Home;

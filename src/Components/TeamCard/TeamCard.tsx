import React from "react";
import { Link } from "react-router-dom";

type Team = {
  teamName: string;
  teamTitle: string;
  paragraph: string;
  _id: string;
  image: string;
};

type TeamCardProps = {
  team: Team;
  handleRemoveGroup: (id: any) => void;
};

const TeamCard = ({ team, handleRemoveGroup }: TeamCardProps) => {
  return (
    <Link to={`/group/${team._id}`}>
      <div className="card border border-[#4C54F8]">
        <div className="card-body ">
        <div>
        <div className="avatar online">
          <div className="w-24 border-2 rounded-full">
            <img src={team?.image} />
          </div>
        </div>
        </div>
          <h2 className="card-title text-2xl font-bold">{team.teamName}</h2>
          <p className="text-xl font-semibold">{team.teamTitle}</p>
          <p>
            {team?.paragraph?.length > 200
              ? team?.paragraph.slice(0, 200) + "..."
              : team?.paragraph}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;

const SearchResultLIst = ({ result, setClickValue })  => {
  return (
    <ul className="bg-white mt-5 overflow-y-scroll  rounded-lg space-y-2 divide-y-2">
      {result.map((user: any, i: any) => {
        return (
         
            <li onClick={() => setClickValue(user?.name)} key={i} className=" p-3 flex items-center cursor-pointer gap-3">
              <div>
                <img
                  className="w-12 h-12 rounded-full border-2"
                  src={user?.photoUrl}
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-medium text-start text-gray-500">{user.name}</h2>
                <p className=" text-gray-500">{user.email}</p>
              </div>
            </li>
      
        );
      })}
    </ul>
  );
};

export default SearchResultLIst;

import React,{useState} from 'react';

const SearchBar = ({setResult,clickValue}) => {

    const [input,setInput] = useState(clickValue);

    const fetchData = (value : any) => {
        fetch('https://little-programmers-server.vercel.app/users')
        .then(res => res.json())
        .then(data => {
            const result = data.filter((user : any) => {
                return user && user.name && user.name.toLowerCase().includes(value)
            })
            setResult(result)
            
        })

    }

    const handleChange = (value : any) => {
        setInput(value)
        fetchData(value)
    }



    return (
        <>
            <input
                type="text"
                placeholder="Type a name to assign group member"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="input input-bordered"
              />
        </>
    );
};

export default SearchBar;
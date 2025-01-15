import { useState } from "react"

// eslint-disable-next-line react/prop-types
export const Form = ({country ,setFilteredData }) =>{

    const [input, setInput] = useState("");
    //handleChange
    const handleChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setInput(searchValue);
        // eslint-disable-next-line react/prop-types
        const filterData = country.filter((item) => 
            item.name.common.toLowerCase().includes(searchValue));
        setFilteredData(filterData);        
    }
    return (
        <div>
           <input type="text" placeholder="Search..." value={input} onChange={handleChange} className="mb-[30px] border pt-[8px] pb-[8px] pl-[10px] pr-[150px] outline-none rounded-s-sm border-blue-400"/>
        </div>
    )
}
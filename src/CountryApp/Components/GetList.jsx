/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export const GetList = ({ handleDelete, filteredData}) =>{
    return (
        <div>
        <ul className="grid grid-cols-4 gap-3">
        {filteredData.map((item, index)=> {
         const {flags, name, population, capital, cca3} = item;
         return (
             <li key={index} className="bg-sky-500 text-white py-3 px-5 rounded-md">
                 <img src={flags.png} alt={name.common} className="block m-auto w-full h-[250px] object-contain"/>
                 <p><b>Name:</b> {name.common}</p>
                 <p><b>Capital:</b> {capital}</p>
                 <p><b>Population:</b> {population}</p>
                 <button className="bg-red-700 text-white p-2 mt-3 rounded-md shadow-md" onClick={() => handleDelete(cca3)}>Delete</button>
             </li>
         )
        })}     
     </ul> 
        </div> 
    )
}
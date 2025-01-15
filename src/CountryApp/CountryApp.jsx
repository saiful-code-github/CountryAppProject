import axios from "axios";
import { useEffect, useState } from "react"
import { GetList } from "./Components/GetList";
import { Form } from "./Components/Form";

const baseURL ='https://restcountries.com/v3.1/all' ;
export const CountryApp = () =>{
    const [country, setCountry] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [filteredData, setFilteredData] = useState([]);

    //get method
     const getData = async () =>{
          try {
            setLoading(true)
            const res = await axios.get(baseURL);
            if(res.status === 200){
                setCountry(res.data);
                setFilteredData(res.data)
            }
            setLoading(false)
          } catch (error) {
            console.log(error)
          }finally{
            setLoading(false)
          }
     }
     useEffect(()=>{
        getData();
     },[])
     //delted method

     const handleDelete = (cca3) =>{
        try {
            const removeData = country.filter((item) => item.cca3 !== cca3);
            setCountry(removeData);
            setFilteredData(removeData);
        } catch (error) {
            console.log(error)   
        }
     }
    return (
        <div>
            <h1 className="text-center mb-4 text-[28px]">Country App</h1>
            <Form country={country} setFilteredData={setFilteredData}/>
            {loading ? (
             <p className="text-[24px] font-bold">Loading....</p>
            ): 
             (
               <GetList handleDelete={handleDelete} filteredData={filteredData}/>
             )
            }
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react"
import { GetList } from "./Components/GetList";
import { Form } from "./Components/Form";
import { FaArrowUp } from "react-icons/fa";

const baseURL ='https://restcountries.com/v3.1/all' ;
export const CountryApp = () =>{
    const [country, setCountry] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [scrollTop, setScrollTop] =  useState(false);


    /// handleToptoBottom button
    const hanldeToptoBottom = () =>{
        window.scrollTo({
          top:0,
          behavior: "smooth"
        })
    }
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
        const scollToTop = () =>{
          if(window.scrollY > 300){
            setScrollTop(true)
          }else{
            setScrollTop(false)
          }
        }
        window.addEventListener('scroll', scollToTop);
        return () => window.removeEventListener('scroll', scollToTop)

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
        <div className="max-w-7xl mx-auto">
            <h1 className="text-center mb-4 text-[28px]">Country App</h1>
            <Form country={country} setFilteredData={setFilteredData}/>
            {loading ? (
             <p className="text-[24px] font-bold">Loading....</p>
            ): 
             (
               <GetList handleDelete={handleDelete} filteredData={filteredData}/>
             )
            }
            {/* scroll top to bottom button */}
            {scrollTop && (
            <div className="bg-yellow-500 p-3 shadow-2xl text-center scroll_up cursor-pointer" onClick={hanldeToptoBottom}>
            <FaArrowUp style={{color: '#fff',fontSize: "20px"}}/>
             </div>
            )}
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

export const CountryApp = () => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filted, setFiltred] = useState([]);
    const [input, setInut] = useState("");
    const [scroll, setScorll] = useState(false);
    const [extend, setExtend] = useState({});

    const fetchData = async() => {
        setLoading(true)
        setError(false)   
       try {
           const res = await axios.get('https://fakestoreapi.com/products');
           if(res.status === 200){
             console.log(res.data);
             setCountry(res.data);
             setFiltred(res.data)
              setLoading(false)
           }
       } catch (error) {
          setError("please fetch the Data", error)
           console.log(error)
       }finally{
          setLoading(false)
       }
    }
    useEffect(()=>{
        fetchData();
        window.addEventListener("scroll", scrolltopTobottom);
        return () => window.removeEventListener("scroll", scrolltopTobottom)
    },[])
    //handleDelete
    const handleDelete = (id) => {
        const romoveCountry = country.filter((item)=> item.id !== id );
        setCountry(romoveCountry)
        setFiltred(romoveCountry)
    }

    //handleInput
    const handleInput = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setInut(searchValue);
        const filtereData = country.filter((item)=>
        item.title.toLowerCase().includes(searchValue) || item.category.toLowerCase().includes(searchValue) || item.price.toString().includes(searchValue)
        )
        setFiltred(filtereData)
    }
    //scrollTop
    const scrollTop =() => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    } 
    const scrolltopTobottom = () => {
        if(document.body.scrollTop || document.documentElement.scrollTop > 200){
            setScorll(true);
        }else{
            setScorll(false)
        }
    }
//   toggle button
const toggleReadMore = (id) => {
    setExtend((prev)=>({
        ...prev,
        [id]: !prev[id]
    }))
}
    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-start">
          <h2 className="text-center text-3xl font-bold text-red-700 mt-[30px] mb-[30px]">Country App</h2>
          {loading && <p className="text-center my-[25px]">Loading...</p>}
          {error && <p className="text-2xl text-red-700">{error}</p>}
          {/* search input */}
          <div className="flex justify-center" style={{alignItems: "center"}}>
             <input type="text" placeholder="Enter Your Product" value={input} onChange={handleInput} className="outline-none border-b-2 py-[10px] border-blue-600 mb-10 w-full]"/>
          </div>
          <ul className="grid grid-cols-4 gap-3">
             {filted.map((item,index)=>{
                const {image, category, price, title, id, description} = item;
                const isExtend = extend[id];
                const shortDesc = description.slice(0,50)
                return (
                    <li key={index} className="bg-orange-700 text-white py-[20px] px-[15px] rounded-[5px]">
                        <img src={image} alt="" className="block mx-auto w-full h-[200px] object-contain"/>
                        <h3>Category: {category}</h3>
                        <h4>Title: {title}</h4>
                        <h5>Price: ${price}</h5>
                        <p>DesCribe: {isExtend ? description : `${shortDesc}...`}</p>
                        <button onClick={()=> toggleReadMore(id)} className="block mx-auto text-white underline font-semibold mt-3">{isExtend ? "Read Less" : "Read More"}</button>
                        <button onClick={()=> handleDelete(id)} className="bg-red-700 mt-[15px] text-white py-[6px] px-[12px] rounded-[5px]">Delete</button>
                    </li>
                )
             })}
          </ul>
          {/* scroll top to bottom button */}
          <div>
            {scroll && (
            <button onClick={scrollTop} className="fixed bottom-[15px] right-[15px] z-50 shadow-2xl bg-sky-500 rounded-md w-[45px]
            h-[45px] cursor-pointer text-center"><FaLongArrowAltUp className="text-2xl text-white block mx-auto" style={{textAlign: "center",alignItems: "center"}}/>
            </button>
            )}
          </div>
        </div>
    )
}
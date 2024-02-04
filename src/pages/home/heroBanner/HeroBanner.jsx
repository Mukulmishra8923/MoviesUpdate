import "./style.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../component/lazyLoadimage/img";
import ContentWrapper from "../../../component/contentWrapper/contentWrapper";




const HeroBanner = () => {

  // ----------------------STATE CREATE-----------------------------------------
     const [background , setBackground] =useState("");
     const [query , setQuery] =useState("");
     const navigate = useNavigate();

    //  ----------------------GLOBAL STATE ACCESS now image data----------------------------------
 const url = useSelector((state)=>state.home.url)

 

//  ----------------------END POINT SE DATA RECIEVE --------------------------
     const {data , loading} =useFetch("/movie/upcoming");
     console.log("data is", data)

// ------------------------------RANDOM IMAGE-----------------------------
     useEffect(()=>{
     
      const bg =  url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;

      setBackground(bg);
    },[data]);
//  console.log("data in bg",bg)
  

     const searchQueryHandler = (event)=>{
    if((event.key === "Enter" || event.type == "click") && query.length > 0 ){
       
        navigate(`/search/${query}`);
    }
     };


  return (
    <div className="heroBanner">
    { !loading  && <div className="backdrop-img">
           <Img src={background}/></div>
 }

<div  className="opacity-layer">


        <ContentWrapper>
      
          <div className="heroBannerContent">
 
            <span className="title">Welcome.</span>
            <span className="subTitle">Millions of movies, TV shows and people to 
             discover. Explore now.</span>
            
               <div className="searchInput">
                <input
                type="text"
                placeholder="Search for a movie or tv show....." 
                 onKeyUp={searchQueryHandler} 
                 onChange={(e)=>setQuery(e.target.value)}
                  />

                <button  onClick={searchQueryHandler}>Search</button>
             
               </div>


           </div>
        </ContentWrapper>
        </div>
    </div>
  )
}

export default HeroBanner
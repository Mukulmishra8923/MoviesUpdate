import React, { useState } from 'react'
import "../style.scss"
import Carousel from '../../../component/carousel/Carousel'
import ContentWrapper from '../../../component/contentWrapper/contentWrapper'
import SwitchTabs from '../../../component/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
const Popular = () => {

  const [endpoint , setEndpoint] = useState("movie");

  const {data , loading} =useFetch(`/${endpoint}/top_rated`);
    


  const onTabChange = (tab) =>{
    console.log("tab value is ", tab);
    setEndpoint(tab  === "Movies" ? "movie" : "tv");
  };


  return (
    <div className='carousalSection'>
       <ContentWrapper>
      
        <div className='carousalTitle'>Top Rated</div>
          <SwitchTabs data ={["Movies", "Tv Shows"]}  onTabChange={onTabChange}/>
       </ContentWrapper>
  <Carousel data ={data?.results}
   loading ={loading}
   endpoint ={endpoint}/>
    </div>
  )
}

export default Popular
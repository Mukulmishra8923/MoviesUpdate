import React, { useState } from 'react'
import "../style.scss"
import Carousel from '../../../component/carousel/Carousel'
import ContentWrapper from '../../../component/contentWrapper/contentWrapper'
import SwitchTabs from '../../../component/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
const Trending = () => {

  const [endpoint , setEndpoint] = useState("day");

  const {data , loading} =useFetch(`/trending/movie/${endpoint}`);
    


  const onTabChange = (tab) =>{
    console.log("tab value is ", tab);
    setEndpoint(tab  === "Day" ? "day" : "week");
  };


  return (
    <div className='carousalSection'>
       <ContentWrapper>
      
        <div className='carousalTitle'>Trending</div>
          <SwitchTabs data ={["Day", "Week"]}  onTabChange={onTabChange}/>
       </ContentWrapper>
  <Carousel data ={data?.results} loading ={loading}/>
    </div>
  )
}

export default Trending
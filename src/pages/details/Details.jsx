import "./style.scss"
import useFetch from "../../hooks/useFetch"
import React from 'react'
import { useParams } from "react-router-dom"
import DetailsBanner from "./detailsBanner/DetailsBanner"
import Cast from "./cast/cast"
import VideosSection from "./videoSection/VideoSection"
import Similar from "./carousel/Similar"
import Recommendation from "./carousel/Recommendation"


const Details = () => {

  const {mediaType , id} = useParams();
  const {data, loading} =useFetch(`/${mediaType}/${id}/videos`);
  console.log("details data ",data)


  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
);
  console.log(" credit data data ",credits)

  return (
    <div>
    
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data ={credits?.cast}  loading={creditsLoading}/>
      <VideosSection  data={data}/>
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details
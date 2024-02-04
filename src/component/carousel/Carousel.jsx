import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../genres/Genres";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";

const Carousel = ({data , loading , endpoint, title}) => {
    const carouselContainer =useRef();
    const url =useSelector((state)=>state.home.url);
    const navigate =useNavigate();

    const navigation =(dir)=>{

        const container =carouselContainer.current;
        
        const scrollAmount = dir === "left" ?
         container.scrollLeft -(container.offsetWidth +20) :
         container.scrollLeft + (container.offsetWidth +20)

    container.scrollTo({
        left :scrollAmount,
        behavior : "smooth",
    });
    };

// --------------------function for showing loading skeleton---------------
    const skItems =()=>{
     return <div  
     className="skeletonItem">


        <div className="posterBlockSkeleton"></div>

        <div className="textBlock">
            <div className="titleSkeleton"></div>
            <div className="dateSkeleton"></div>
        </div>
     </div>
    }

  return (
    <div className="carousel" >

        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
  {/* -----------------LEFT AND RIGHT SCROLL BUTTON----------------           */}

            <BsFillArrowLeftCircleFill  className="carouselLeftNav arrow" 
            onClick={()=>navigation("left")}/>

       <BsFillArrowRightCircleFill  className="carouselRightNav arrow" 
            onClick={()=>navigation("right")}/>
    
         {!loading ? (<div className="carouselItems" ref={carouselContainer}>

 {/* -------------LOOP FOR POSTER------------------ */}


          {data?.map((item)=>{
                 //   ---------------- url.poster is from redux store and App.jsx (BASE _URL + POSTER + ITEM.POSTER_PATH------THAN OUR URL BECOME COMPLETED )--------           
             const posterUrl = item.poster_path ?url.poster +     
              item.poster_path :  PosterFallback; 
            
            return(
                <div  key={item.id}
                 className="carouselItem"
//   -----------------REDIRECT ON DETAILS PAGE------------               
                 onClick={()=>navigate(`${item.media_type || 
                        endpoint}/${item.id}`)}> 
                <div className="posterBlock">
                     <Img src={posterUrl}/>

       {/* ----------------RATING------------------------          */}

                     <CircleRating rating={item.vote_average.toFixed(1)}/>

{/* ----------------------GENRES ID-------------- */}

                     <Genres data ={item.genre_ids.slice(0,2)}/>
                </div>
                <div className="textBlock">
                    <span className="title">
                        {item.title || item.name}
                    </span>
                    <span className="date">
                        {dayjs(item.release_Date).format("MMM D YYYY")}
                    </span>
                </div>

                </div>
            )
          })}
         </div>) 
         :( <div className="loadingskeleton">
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
         </div>) }

        </ContentWrapper>
    </div>
  )
}

export default Carousel
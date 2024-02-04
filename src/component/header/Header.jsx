
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";


import "./style.scss"
import ContentWrapper from "../contentWrapper/contentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

   
// -----------------------SCROLL PROPERTIES-------------------------------

    const controlNavBar =()=>{
 
   if(window.scrollY >200){
    if(window.scrollY > lastScrollY  && !mobileMenu){
      setShow("hide")
    }else{
      setShow("show")
     } 
    }else{
    setShow("top")
  };
    setLastScrollY(window.lastScrollY);
 }
  useEffect(()=>{
    window.addEventListener("scroll",controlNavBar)

    return ()=>{ window.removeEventListener("scroll",controlNavBar)
  }
  }, [lastScrollY])



// -------------------PC VIEW -------------------------------------
   const openSearch =()=>{
    setMobileMenu(false);
    setShowSearch(true);
   }
// ----------------------MOBILE VIEW----------------------------------------
   const openMobileMenu =()=>{
    setMobileMenu(true);
    setShowSearch(false);
   }

  //  -------------------NAVIGATION ------------------------------------

   const navigationHandler =(type)=>{
     if(type==="movie"){
      navigate("/explore/movie");
     }else{
      navigate("/explore/tv"); 
     }
      setMobileMenu(false);
   }

  //  ------------ SEARCH FUNCTION-----------------  
   const searchQueryHandler = (event)=>{
    if(event.key === "Enter" && query.length > 0 ){
       
        navigate(`/search/${query}`);

        setTimeout(()=>{
          setShowSearch(false)
        },1000)
    }
     };





    return (
        <header className={`header  ${mobileMenu ? "mobileView" : ""} ${show}` }>
          <ContentWrapper>
            <div className="logo" onClick={()=>navigate("/")}>
            <img  src={logo}  />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick= 
                {()=>navigationHandler("movie")}>Movies</li>              
              <li className="menuItem" onClick=
              {()=>navigationHandler("tv")}>Tv Shows</li>
              <li className="menuItem">
                <HiOutlineSearch  onClick={openSearch}/>
              </li>
            </ul>

{/* -------------------FOR MOBILE RESOPNSE---------------------- */}


            <div className="mobileMenuItems">
            <HiOutlineSearch   onClick={openSearch} />
            {mobileMenu ? (<VscChromeClose  onClick={()=>setMobileMenu(false)}/>) : (<SlMenu    onClick={openMobileMenu}/>) }
          

            </div>
          </ContentWrapper>
{/* ------------------------------SEARCH BAR-------------------------------- */}
         {showSearch &&   <div className="searchBar">
            <ContentWrapper>

          <div className="searchInput">
                <input
                type="text"
                placeholder="Search for a movie or tv show....." 
                 onKeyUp={searchQueryHandler} 
                 onChange={(e)=>setQuery(e.target.value)}
                  />
             <VscChromeClose onClick={()=>setShowSearch(false)} />
               </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;
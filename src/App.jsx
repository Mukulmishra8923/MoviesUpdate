import { useState,useEffect } from "react"
import { fetchDataFromApi } from "./utils/Api"
import { useDispatch,useSelector } from "react-redux";
import { getApiConfiguration,getGeneres } from "./store/homeSlice";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore"
import Header  from "./component/header/Header"
import Footer from "./component/footer/Footer"
import SearchResult from "./pages/searchResult/SearchResult"
import  PageNotFound from "./pages/404/PageNotFound"



function App() {

   const dispatch =useDispatch();
  
  

//  -------------------data of url from redux store------------------------  
   const url = useSelector((state)=>
    state.home.url);
    console.log("url 1", url)


// ------------------- FOR METHOD CALL-----------
   useEffect(()=>{
         apitestingConfig();
         genresCall();
   },[]) 


    const apitestingConfig = () =>{
//  ------------------------function in Api,js----------------------------------     
      fetchDataFromApi("/configuration",).then((res)=>{
        // console.log(res)
        
        const url ={
          backdrop : res.images.secure_base_url + "original",
          poster : res.images.secure_base_url + "original",
          profile : res.images.secure_base_url + "original",
        }
        

        // ------------------pass data in  homeslice state--------------------
        dispatch(getApiConfiguration(url))
      });
    }

    const genresCall = async ()=>{
      let promises =[]
      let endPoints =["tv" ,"movie"]
      let allGenres = {}

        endPoints.forEach((url) => {
         
          promises.push(fetchDataFromApi(`/genre/${url}/list`))
        });
      
        const data = await Promise.all(promises);
        
  //  --------------genres is destructured-----------------------     
        data.map(({genres})=>{
          return genres.map((item)=>(allGenres[item.id]= item ));
        });
  
        dispatch(getGeneres(allGenres));
    };

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
           <Route path="/"  element={<Home/>}/>
           <Route path="/:mediaType/:id"  element={<Details/>}/>
           <Route path="/search/:query"  element={<SearchResult/>}/>
           <Route path="/explore/:mediaType"  element={<Explore/>}/>
           <Route path="*"  element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      
      </BrowserRouter>
    </>
  )
}

export default App

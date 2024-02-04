import React from 'react'
import "./style.scss";
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Genres = ({data}) => {
   
    const genres = useSelector((state)=>state.home.genres);
    

  return (
    <div className='genres'>
        {data?.map((G)=>{
            
            return(
                <div key={G} 
                className='genre'>
                   {genres[G]?.name}
                    </div>
            )
        })}
    </div>
  )
}

export default Genres
import "./style.scss"
import Trending from "./trending/trending"
import HeroBanner from "./heroBanner/HeroBanner"
import Popular from "./popular/Popular"
import TopRated from "./topRated/TopRated"

const Home = () => {
  return (
    <div className="homepage">

      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
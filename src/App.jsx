import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import MovieDetail from './Components/movie-detial';
import Favorite from './Components/favorite';
function App() {
 

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/detail/:id' element={<MovieDetail/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>
    </Router>
    </>

  )
}

export default App

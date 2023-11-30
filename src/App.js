import './App.css'; 
import {useState, useEffect} from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './components/MovieList';
import TheatreList from './components/TheatreList';
import SeatList from './components/SeatList';
import SignUp from './components/SignUp';
import Success from './components/Success';


function App() { 

  let initialValue;
  if(localStorage.getItem('jsonData') === null){
    initialValue = []
  }else {
    initialValue = JSON.parse(localStorage.getItem('jsonData'));
  }


  const [jsonData,updateJsonData] = useState(initialValue); // complete json data
  
  useEffect(()=>{
    
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
 
  },[jsonData])

  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<SignUp jsonData={jsonData} updateJsonData={updateJsonData} />}/>
          <Route path='/home' element={<MovieList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path='/home/:movieName' element={<TheatreList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path='/home/:movieName/:theatreName/:screenName' element={<SeatList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path='/home/:movieName/:theatreName/:screenName/booked' element={<Success jsonData={jsonData} />}/>
        </Routes>
      </Router>
  );
}

export default App; 
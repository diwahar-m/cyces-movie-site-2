import './App.css'; 
import {useState, useEffect} from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './pages/MovieList';
import TheatreList from './pages/TheatreList';
import SeatList from './pages/SeatList';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import {sign_up_path, movie_list_path, theatre_list_path, seat_list_path, success_path} from './components/routes/index' ;


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
          <Route path={sign_up_path} element={<SignUp jsonData={jsonData} updateJsonData={updateJsonData} />}/>
          <Route path={movie_list_path} element={<MovieList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path={theatre_list_path} element={<TheatreList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path={seat_list_path} element={<SeatList jsonData={jsonData} updateJsonData={updateJsonData}/>}/>
          <Route path={success_path} element={<Success jsonData={jsonData} />}/>
        </Routes>
      </Router>
  );
}

export default App; 
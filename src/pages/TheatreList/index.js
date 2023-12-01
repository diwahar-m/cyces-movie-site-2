import { useNavigate, useParams } from "react-router-dom"; 
import {useState, useEffect, useContext} from 'react';
import TheatreCard from "../../components/cards/TheatreCard";
import { DataContext } from "../../App";

export default function TheatreList(){ 

    const {jsonData} = useContext(DataContext);

    const navigate = useNavigate(); 
    const {movieName} = useParams();   

    const [selectedMovie, updateMovie] = useState({});
    const [theatreList, updateTheatre] = useState([]);

    
    function filteringMovies(){     
        const movie =  jsonData.movies.filter( movie => movie.name === movieName);
        updateMovie(movie[0]);       
    }

    const filteringTheatres=()=>{
        const movie =  jsonData.movies.find( movie => movie.name === movieName);
        const filterTheatres = jsonData.theatres.filter(theatre =>
            theatre.moviesId.includes(movie.id)
         )
         updateTheatre(filterTheatres)
        
    }

    useEffect(()=>{
        filteringMovies();
        filteringTheatres();
    })

    return(
        <div className=' h-screen flex-col justify-between items-center px-[2rem] py-[4rem] '>

            <div className="px-[1.5rem]  flex justify-between md:items-center
                md:flex-row md:w-full">

                    <button type='type' onClick={()=>{navigate('/home')}} className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] 
                    text-xs  w-[3.5rem] rounded-3xl border-[#7a7777] md:w-[5rem]  md:h-[3rem] text-[black] border-[black] hover:text-[#ffffff] hover:bg-[black]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Back</button> 
                    
                    
                    <button type='type' onClick={()=>{navigate('/')}} className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] rounded-3xl border-[#7a7777]  
                     md:w-[5rem]  md:h-[3rem] text-xs  w-[3.5rem] 
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Log out</button> 
            </div> 
            {
                selectedMovie && 
                (
                <div  className="md:px-[1.5rem]  flex flex-col justify-center items-center md:items-center 
                md:flex-row md:w-full">
                    <div className="w-4/6 md:w-full m-[1rem]  border-[.1rem] p-[.3rem] rounded-lg cursor-auto shadow-[red] shadow-lg
                     flex flex-col justify-center md:justify-start md:flex-row" >
                            <img src={selectedMovie.url} alt='movie' className="object-fill h-[17rem] md:h-[25em] md:w-[20em] md:mr-[1rem] rounded-lg"/> 
                            <div className="pl-[1rem] flex flex-col justify-center">
                                <div>
                                    <h6 className='text-sm md:text-5xl md:mb-[1rem] font-bold mt-[1rem]'>{movieName}</h6>                         
                                    <p className='text-sm md:text-2xl font-base mb-[1rem]'>{selectedMovie.language}</p> 
                                </div>
                                <h6 className='text-sm md:text-xl font-semibold mb-[2rem]'>Cast: {selectedMovie.cast}</h6> 
                                <h6 className='text-sm md:text-lg font-semibold mb-[2rem]'>Ratings: {selectedMovie.ratings}/10</h6> 
                                {/* <h6 className='text-sm md:text-md font-semibold mb-[2rem]'>Rs. 180/ per seat</h6> 
                                     */}
                            </div>
                    </div> 
                    
                </div> )
            }

            { theatreList.length > 0 && 
                (
                    <div className=" flex flex-wrap my-2 px-[1.5rem]  flex flex-col justify-center items-center
                    md:flex-row md:w-full">
                        {  
                            theatreList.map(theatre =>(
                                <TheatreCard key={theatre.id} theatre={theatre} selectedMovie={selectedMovie}/>
                            ))
                        }
                    </div>
                )
            }  
        </div> 

    )
}
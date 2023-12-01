import { useNavigate } from "react-router-dom"; 
import { useEffect} from 'react';
import MovieCard from "../../components/cards/MovieCard";
import useMovieFetch from "../../hooks/useMovieFetch";

 // const movie =[
    //     {
    //         id:"1",
    //         name: '',
    //         price:''
    //     }
    // ]

    // const theatre =[
    //     {
    //         movis: [1, 2]
    //         name: "pvr"
    //         seats":
    //         time: 
    //     }
    // ]

export default function MovieList(){ 

    const navigate = useNavigate(); 

    const {fetchData,jsonData} = useMovieFetch()

    useEffect(()=>{
        fetchData();
    })

    return(
        <div className='h-screen flex-col justify-between items-center px-[2rem] py-[4rem] '>

            <div className="px-[1.5rem]  flex  justify-between md:items-center
                md:flex-row md:w-full">

                    <button type='type' onClick={()=>{navigate('/')}} className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] 
                    rounded-3xl border-[#7a7777] md:w-[5rem]  md:h-[3rem] text-[black] border-[black] hover:text-[#ffffff] hover:bg-[black]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Back</button> 
                    
                    <button type='type' onClick={()=>{navigate('/')}} className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] 
                    rounded-3xl border-[#7a7777]  md:w-[5rem]  md:h-[3rem] text-[red] border-[red] hover:text-[#ffffff] hover:bg-[red]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Log out</button> 
            </div> 

            <div className="px-[1.5rem]  flex flex-col justify-between md:items-center
                md:flex-row md:w-full">
                    <div className="flex flex-col justify-between ">
                        <h6 className='text-sm md:text-md font-bold mb-[1rem]'>Tagline</h6> 
                        <h1 className='text-3xl md:text-5xl font-black mb-[2rem]'>Movies</h1> 
                        <p className='text-sm md:text-md font-semibold mb-[2rem]'>Please select the movie you wish to watch</p> 
                    
                    </div>
                    <button type='submit' className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] rounded-3xl border-[#7a7777]  
                     md:w-[5rem]  md:h-[3rem]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>View All</button> 
            </div> 

            <div className=" flex  justify-center items-center flex-wrap my-2">
                <div  className=" flex justify-center flex-wrap  w-11/12">
                    {  jsonData.movies &&
                        jsonData.movies.map(movie =>(
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    }
                </div>               
            </div>
        </div>
    )
}
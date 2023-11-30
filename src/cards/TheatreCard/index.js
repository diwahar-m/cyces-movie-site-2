import {useState, useEffect} from 'react';
import ScreenCard from '../ScreenCard';

export default function TheatreCard({theatre, selectedMovie}){

    const [screenList, updateScreens] = useState([]);

    const filteringScreens= ()=>{      
        const screenLists = theatre.screens.filter(screen =>
            screen.movieId === selectedMovie.id) 
        updateScreens(screenLists);       
    }

    useEffect(()=>{
        filteringScreens();
    },[])
 
    return(       
            theatre  && (
                <div  id={theatre.id}
                    className="rounded--3xl w-4/6 md:w-full m-[1rem]  border-[.1rem] p-[.3rem] cursor-auto shadow-[#777d78]
                    shadow-lg flex flex-col justify-center md:justify-start md:flex-row" 
                    
                >
                    <div className=" flex ">
                            <img src={theatre.image} alt="thetare" className="w-[10rem] h-[10rem] rounded-full" />
                           <div className='self-center pl-[1rem] flex'>
                                <div>
                                    <h6 className='text-sm md:text-lg font-bold mt-[1rem]' >Theatre: {theatre.name}</h6>                         
                                    <p className='text-sm md:text-lg font-base mb-[1rem]'>Location: {theatre.location}</p> 
                                </div>
                              
                                {
                                    screenList &&
                                    (
                                        <div className="md:ml-[2rem] self-center flex md:flex-row ">
                                            {
                                                screenList.map(screen =>(
                                                    <ScreenCard key={screen.id} screen={screen} theatre={theatre} />
                                                    
                                                    ))
                                            }
                                        </div>
                                    )
                                }
                           </div>
                            
                    </div>
                </div> 

            )   
    )
}
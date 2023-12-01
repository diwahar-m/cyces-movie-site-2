import {Link  } from "react-router-dom"

export default function MovieCard({movie}){
    
    return(     
        <Link to={`/home/${movie.name}`}>
            <div key={movie.id} className=" m-[1rem]  border-[.1rem] p-[.3rem] rounded-lg cursor-pointer shadow-[red] shadow-lg
            transition-all duration-300 ease-in-out hover:scale-105 ">
                <img src={movie.url} alt='movie' className="object-fill h-[20em] w-[15em] rounded-lg"/> 
                <div className="pl-[1rem]">
                    <div>
                        <h6 className='text-sm md:text-sm font-bold mt-[1rem]'>{movie.name}</h6>                         
                        <p className='text-sm md:text-md font-base mb-[1rem]'>{movie.language}</p> 
                    </div>                       
                </div>
            </div> 

        </Link>  
    )
}
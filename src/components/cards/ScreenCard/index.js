import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ScreenCard({screen,theatre}){

    const {movieName} = useParams();

    const navigate = useNavigate();

    const handleClick=()=>{   
        navigate(`/home/${movieName}/${theatre.name}/${screen.name}`) 
    }

    return(      
            <div id={screen.id} className='flex flex-col mr-[1rem] md:mr-[3rem] cursor-pointer' onClick={handleClick}>
                <button type='button' className={`p-1 rounded text-sm md:text-sm text-[green] border-[green] border-[.1rem] 
                    hover:text-[#ffffff] hover:bg-[green] focus:text-[#ffffff] focus:bg-[green]`} >
                        {screen.timing}
                </button>                                        
            </div>
    )
}
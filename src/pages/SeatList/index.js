import { useParams,useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import ScreenRowSeats from "../../components/cards/ScreenRowSeats";

export default function SeatList({jsonData, updateJsonData}){ 

     const navigate = useNavigate() ;
     const {screenName, theatreName, movieName} = useParams();

    const [error, updateError] = useState(''); 

    // filtering screen seats from the state.
    // let selectedMovie = jsonData.movies.find(movie => movie.name === movieName); // netlify error
    let selectedTheatre = jsonData.theatres.filter(theatre => theatre.name === theatreName);
    let selectedScreen = selectedTheatre[0].screens.filter( screen => screen.name === screenName);
    let screenSeats = selectedScreen[0].seats ;
    let screenSeatRows = Object.keys(screenSeats);


    function getSelectedScreenSeats(){
        // selectedMovie = jsonData.movies.find(movie => movie.name === movieName); // netlify error
        selectedTheatre = jsonData.theatres.filter(theatre => theatre.name === theatreName);
        selectedScreen = selectedTheatre[0].screens.filter( screen => screen.name === screenName);
        screenSeats = selectedScreen[0].seats ;
        screenSeatRows = Object.keys(screenSeats);
    }
      
    useEffect(()=>{   
        getSelectedScreenSeats();
        console.log('screenSeats', screenSeats)
    },[jsonData])

    function checkSelectedSeats(value){
        let  count = 0; 
        let price = 0;
        
        screenSeatRows.map( row => {
            let eachRow = screenSeats[row]
            eachRow.map( eachSeat => {
                if(eachSeat.selected === true){
                    count++
                    price = price + selectedTheatre[0].priceList[row]
                }
            })
        })

        if (value === 'price'){
            return price;
        } 
        return count
    }

    const bookingHandler = () =>{

        let count = checkSelectedSeats(); 

        if(count < 1){
            updateError('*Please select a seat.')
        }else{
            navigate(`/home/${movieName}/${theatreName}/${screenName}/booked`)
        }
    }

    return(
        <div className=' h-screen flex-col justify-between items-center px-[2rem] py-[4rem] '>

            <div className="px-[.3rem] md:px-[1.5rem]  flex justify-between md:items-center md:flex-row md:w-full">

                    <button type='type' onClick={()=>{navigate(`/home/${movieName}`)}}  className='w-[5rem]   text-sm h-[2.5rem]  mb-1 border-[0.1rem] 
                    text-xs  w-[3.5rem] rounded-3xl border-[#7a7777] md:w-[5rem]  md:h-[3rem] text-[black] border-[black] hover:text-[#ffffff] hover:bg-[black]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Back</button> 
                    
                    
                    <button type='type' className='text-xs w-[3.5rem] md:w-[5rem]   
                    text-sm h-[2.5rem]  mb-1 border-[0.1rem] 
                    rounded-3xl border-[#7a7777]  
                     md:w-[5rem]  md:h-[3rem]
                      lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center '>Log out</button> 
            </div> 
            <div  className={`flex  md:px-[1.5rem]  flex-col justify-center items-center md:items-center
                md:flex-col md:w-full `} >
                    <div className=" w-full flex flex-col-reverse items-center">
                        {   screenSeatRows.map( eachRow =>(
                                    <ScreenRowSeats 
                                        key={eachRow}
                                        eachRow={eachRow}
                                        updateError={updateError}
                                        screenSeats={screenSeats}
                                        jsonData={jsonData}
                                        updateJsonData={updateJsonData} 
                                    />
                                )
                            )
                        }
                    </div>

                    <div className=' w-full flex justify-center flex-col'>
                        <div className='lg:ml-[6rem] mt-[5rem] flex flex-col items-center'>
                            <div className="flex justify-between">
                                <h6 className="mr-[3rem] ">Seats: 
                                    <span>
                                        {checkSelectedSeats()}
                                    </span></h6>
                                <h6>Price: Rs:
                                    <span>
                                        {checkSelectedSeats('price')}
                                    </span>  
                                </h6>

                            </div>
                            <button type='button' onClick={bookingHandler} className='w-[14rem]  text-xl h-[2.5rem] 
                                pl-2 mb-1 border-[0.1rem] rounded-3xl
                                border-[#7a7777] bg-[#000000] text-[#ffffff] md:w-[14rem]  md:h-[3.5rem]
                            lg:h-[3.8rem] lg:text-2xl lg:w-[14rem]  '>Book tickets</button> 
                            <p className='text-[red] text-center'>{error}</p>


                        </div>
                        
                    </div>
                
            </div>
       </div>   
           
    )
}

// ${llocalStorage.getItem('selectedSeats') !== '[]' ? selectedSeats.length : '0'}
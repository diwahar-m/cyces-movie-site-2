import { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

export default function IndividualSeat({eachColumn, eachRow, updateError, jsonData, updateJsonData}){
   
    const { theatreName, screenName} = useParams();
    const [seatPopUp, updatePopUp] = useState(false);

    useEffect(()=>{
        console.log(jsonData);
    },[jsonData])

    const gettingSeatPrice=()=>{
      const theatre = jsonData.theatres.find( theatre => theatre.name === theatreName);
      const price = theatre.priceList[eachRow]
      return price ;
    }

    const updatingSeatSelection = (seatId, selectedValue)=>{

        const updatedTheatre = jsonData.theatres.map(theatre => {
            if (theatre.name === theatreName) {
              return {
                ...theatre,
                screens: theatre.screens.map(screen => {
                  if (screen.name === screenName) {
                    return {
                      ...screen,
                      seats: {
                        ...screen.seats,
                        [eachRow]: screen.seats[eachRow].map(seat => {
                          if (seat.id === seatId) {
                            return { ...seat, selected: selectedValue }; // Change selected status here
                          }
                          return seat;
                        }),
                      },
                    };
                  }
                  return screen;
                }),
              };
            }
            return theatre;
          });
        
        return updatedTheatre ;

    }
    
    const buttonHandler = (e) =>{
        if(!eachColumn.booked){
            if(eachColumn.selected === true){
                  updateJsonData({ ...jsonData, theatres: updatingSeatSelection(e.target.id, false )});
                  updateError('');
                    
            }else  updateJsonData({ ...jsonData, theatres: updatingSeatSelection(e.target.id, true )})
        }
    }

    return(
      <div className={`flex flex-col relative ${ eachColumn.id[eachColumn.id.length-1] === '4' ? 'lg:mr-[4rem] md:mr-[2rem] mr-[1rem]' : ''}`}>
        {(seatPopUp && !eachColumn.booked )&& 
          <div 
            className={`absolute bottom-[2.1rem] right-[.4rem] bg-[white]  w-[3.5rem] h-[2.2rem] 
              flex flex-col justify-center items-center rounded-lg text-center shadow-[black] shadow-lg`}
          >
              <p className='text-xs '>Price Rs.<span className='font-light'>{gettingSeatPrice()}</span></p>
          </div>  
        }
        <button onClick={buttonHandler} 
          type='button' id={eachColumn.id} 
          className={`lg:rounded-lg w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] rounded  lg:w-[2.5rem] lg:h-[2.5rem] 
                  border-[#1ed106] border-[.1rem] flex justify-center items-center 
                  ${eachColumn.booked ? 'text-[#ffffff] bg-[#a69392] border-[#a69392] mr-[.5rem] lg:mr-[1rem] cursor-auto' : 
                    eachColumn.selected ? 'mr-[.5rem] lg:mr-[1rem] bg-[#1ed106] text-[#ffffff] cursor-pointer' : 'mr-[.5rem] lg:mr-[1rem] hover:bg-[#1ed106] hover:text-[#ffffff] text-[#1ed106] bg-[#ffffff] cursor-pointer'}
          ` }
          onMouseEnter={()=>{updatePopUp(true)} }
          onMouseLeave={()=>{updatePopUp(false)} }
         >
            {eachColumn.name.charAt(1)}
        </button>
      </div>
    )
}
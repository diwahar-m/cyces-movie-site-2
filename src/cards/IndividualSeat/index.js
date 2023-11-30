import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function IndividualSeat({eachColumn, eachRow, updateError, jsonData, updateJsonData}){
   
    const {movieName, theatreName, screenName} = useParams();

    useEffect(()=>{
        console.log(jsonData);
    },[jsonData])


    const updatingSeatValue = (seatId, selectedValue)=>{

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
            if(eachColumn.selected == true){
                  updateJsonData({ ...jsonData, theatres: updatingSeatValue(e.target.id, false )});
                  updateError('');
                    
            }else  updateJsonData({ ...jsonData, theatres: updatingSeatValue(e.target.id, true )})
        }
    }



    // const buttonHandler = (e)=>{
    //     if(!eachColumn.booked){

    //         if (selectedSeats.length === 0){
    //             eachColumn.selected = true;
    //             updateSeat([...selectedSeats, eachColumn]);                
    //         }else{
    //             // checks if seat is already selected by the user
    //             const seatSelection = selectedSeats.find( each => each.id === e.target.id); 
    //             if(seatSelection === undefined){
    //                 eachColumn.selected = true;
    //                 updateSeat([...selectedSeats, eachColumn]);                 
    //             }
    //             else if(seatSelection.id === eachColumn.id){
    //                 eachColumn.selected = false;
    //                 updateSeat(selectedSeats.filter(seat => seat.id !== eachColumn.id));
    //                 localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats.filter(seat => seat.id !== eachColumn.id)));              
    //             }else{
    //                 eachColumn.selected = true;
    //                 updateSeat([...selectedSeats, eachColumn]);      
    //             }                
    //         }
    //     }
    // }


    return(
        <button onClick={buttonHandler} type='button' id={eachColumn.id} className={`lg:rounded-lg w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem] rounded  lg:w-[2.5rem] lg:h-[2.5rem] 
          border-[#1ed106] border-[.1rem] 
           flex justify-center items-center 
         ${ eachColumn.id.includes('4') ? 'lg:mr-[4rem] md:mr-[2rem] mr-[1rem]' : ''}
         ${eachColumn.booked ? 'text-[#ffffff] bg-[#a69392] border-[#a69392] mr-[.5rem] lg:mr-[1rem] cursor-auto' : 
          eachColumn.selected ? 'mr-[.5rem] lg:mr-[1rem] bg-[#1ed106] text-[#ffffff] cursor-pointer' : 'mr-[.5rem] lg:mr-[1rem] hover:bg-[#1ed106] hover:text-[#ffffff] text-[#1ed106] bg-[#ffffff] cursor-pointer'}
        ` } >
            {eachColumn.name.charAt(1)}
        </button>
    )
}
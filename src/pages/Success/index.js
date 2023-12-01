import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { DataContext } from "../../App";

export default function Success(){

    const {jsonData} = useContext(DataContext);

    const navigate = useNavigate(); 
    const {movieName,theatreName, screenName} = useParams();
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));

    let successText = 'Successfully Booked !';
    let i=0;
    function successTextWriter() {
        
        if (i < successText.length) {
          document.getElementById("success").innerHTML += successText.charAt(i);
          i++;
          setTimeout(successTextWriter, 50);
        }
      }

    useEffect(()=>{
        successTextWriter();
        setTimeout(()=>{
            navigate(`/home`)
        },9000)
        
    })

    
    let bookedSeats = '';
    (function updatingBookedSeats(){
        let selectedScreen = jsonData.theatres.find( theatre => theatre.name === theatreName)
                            .screens.find( screen => screen.name === screenName)
        for (let eachRow in selectedScreen.seats){
            let row = selectedScreen.seats[eachRow]; // getting eachRow
            for (let eachSeat of row){
                if(eachSeat.selected === true) bookedSeats = bookedSeats+', '+eachSeat.name ;
            }
        }
    })()

    

    return(
        <div className=' h-screen flex-col justify-between items-center px-[2rem] py-[4rem] '>
            <div className={`flex w-full mt-[1rem]  justify-center`}>
                <div className="p-5 border-[#868a91] rounded-lg shadow-2xl shadow-[#0df205]">
                    <h1 className="mb-[1rem]">{`Hi, ${userDetails.name} !`}</h1>
                    <div className="">
                        <h1 id='success' className="text-5xl mb-[2rem] text-[#0df205]">.</h1>
                        <h5 className="mb-[1rem]">{`Your tickets for 
                        ${movieName} is successfully booked `}</h5>
                        <h5 className="mb-[1rem]">{`Seat numbers are ${bookedSeats}  `}</h5>
                        
                        <p className="mb-[1rem]">Thank you for Bookings .</p>
                        <h5 className="mb-[1rem]"> {`Booking information will be sent to your email ${userDetails.username}.`}</h5>
                        <div className="flex justify-center">

                            <button type='type' onClick={()=>{navigate('/home')}} className='text-xs w-[3.5rem] md:w-[5rem]    
                                text-sm h-[2.5rem]  mb-1  border-[.1rem] hover:border-[0rem]
                                rounded-3xl border-[#7a7777]  
                                md:w-[5rem]  md:h-[3rem]
                                lg:h-[3rem] lg:text-sm lg:w-[5rem] flex justify-center items-center hover:text-[#ffffff] hover:bg-[#0df205] '>Ok</button> 
                        </div>
                    </div>
                </div>     
            </div>
       </div> 
    )
}
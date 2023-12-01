import IndividualSeat from "../IndividualSeat";

export default function ScreenRowSeats({key,eachRow, screenSeats, updateError, jsonData, updateJsonData}){

    const seatColumns = screenSeats[eachRow]; // seatColumns indicates the array of seat in a particular row.

    return(
        <div id={key}>
            <div className="flex  mt-[1rem] mb-[1rem]">
                    <h1 className='text-lg md:text-2xl mr-[1rem] md:mr-[2rem] lg:text-3xl text-[#918c7d] 
                    lg:mr-[5rem]'>{eachRow}</h1>
                    <div className="flex  ">
                        {
                            seatColumns.map( eachColumn =>(
                                <IndividualSeat 
                                    key={eachColumn.id} 
                                    eachColumn={eachColumn} 
                                    eachRow={eachRow}
                                    updateError={updateError}
                                />
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}
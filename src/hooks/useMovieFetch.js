import { useContext } from "react";
import { DataContext } from "../App";

const useMovieFetch = ()=>{

    const {jsonData,updateJsonData} = useContext(DataContext);

    const fetchData = async()=>{
        try{
            let response = await fetch("data.json"); 
            let fetchedData =await response.json();
            console.log(fetchedData)
            updateJsonData(fetchedData)

        }catch(e){
            console.log('Error while fetching data: ', e)
        }      
    }

    return {jsonData,fetchData}
}

export default useMovieFetch
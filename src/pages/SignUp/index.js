import { useNavigate} from "react-router-dom"; 
import { useState} from "react";

export default function SignUp(){  

    const navigate = useNavigate(); 


    const [userDetails, updateDetails]= useState({})
    const [error, updateError] = useState('');

    const inputHandler = event =>{
        updateError('');
        updateDetails({...userDetails,[event.target.id]:event.target.value});
    } 

    const submitForm =(event)=>{
        event.preventDefault();
        if(userDetails.username && userDetails.password){
            // updateJsonData({...jsonData, userDetails : userDetails});
            localStorage.setItem('userDetails',JSON.stringify(userDetails))

             navigate('/home'); 
        }else updateError('*Please fill the SignUp form')

    }

    return(
        <div className='h-screen flex justify-center items-center '>
            <div className="text-center">
                <h1 className='text-3xl md:text-5xl font-black mb-[2rem]'>Sign Up</h1> 
                <form className=" flex flex-col justify-between items-center " onSubmit={submitForm}>
                    <input id='name' type='text' placeholder="Name" value={userDetails.name} onChange={inputHandler}  
                        className='w-[17rem]   h-[2.5rem] pl-2 mb-3 border-[0.1rem] border-[#7a7777]
                         md:w-[28rem] md:h-[3.5rem] md:text-xl
                          lg:h-[3.8rem] lg:w-[30rem]'/> 
                    <input  id='username' onChange={inputHandler} value={userDetails.username} 
                        className='w-[17rem] h-[2.5rem] pl-2 mb-3 border-[0.1rem] border-[#7a7777]
                         md:w-[28rem] md:h-[3.5rem]  md:text-xl
                         lg:h-[3.8rem] lg:w-[30rem]' type='email' placeholder="UserName" /> 
                    <input id='password'  onChange={inputHandler} value={userDetails.password} 
                        className='w-[17rem]  h-[2.5rem] pl-2 mb-3 border-[0.1rem] border-[#7a7777]
                         md:w-[28rem] md:h-[3.5rem] md:text-xl
                          lg:h-[3.8rem] lg:w-[30rem]' type='password' placeholder="Password" /> 
                    <button type='submit' className='w-[17rem]  text-xl h-[2.5rem] pl-2 mb-1 border-[0.1rem] rounded-3xl border-[#7a7777] bg-[#000000] text-[#ffffff]
                     md:w-[28rem]  md:h-[3.5rem]
                      lg:h-[3.8rem] lg:text-2xl lg:w-[30rem]  '>Sign Up</button> 
                    <p className='text-[red]'>{error}</p>
                </form>
            </div>
        </div>
    )
}
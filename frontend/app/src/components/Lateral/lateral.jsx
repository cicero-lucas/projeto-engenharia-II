import { useEffect, useState } from "react";
import NavLink from "../Header/NavLink/NavLink";
import LogLink from "../Header/NavLink/LogLink";

export default function Lateral(){
    const [login,setLogin]=useState(false);
    function verifcarLogin(){
       if(localStorage.getItem('tokenAutorization')){
        setLogin(true);
       }else{
        setLogin(false);
       }
    }
   
    useEffect(()=>{
        verifcarLogin()
    },[])
    
    return(
        <>
            {
                login ?  <LogLink/> : <NavLink/>
            }
        </>
    );
}
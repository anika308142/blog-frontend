import React from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';
export default  function Logout()  {
    const cookies = new Cookies();
    
    localStorage.removeItem("loggedIn"); 
    localStorage.removeItem("uid"); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("pid");
        cookies.set('Authorization', null, { path: '/' });
        return(
            <Redirect to='/Login'/>
        )
        
      
  
}


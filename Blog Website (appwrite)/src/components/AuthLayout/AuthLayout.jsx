import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthLayout({children}) {

  const navigate = useNavigate();
  const authStatus = useSelector(state=>state.authReducer.status)
  const [loading,setLoading] = useState(true)


  useEffect(()=>{

   if(!authStatus){
    navigate('/login')
   }
   else if(authStatus){
    navigate('/')
   }

   setLoading(false)

  },[authStatus,navigate])
  
  return loading ? <h1>Redirecting...</h1> : <>{children}</> 
}

export default AuthLayout
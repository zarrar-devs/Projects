import Loading from "./components/Loading/Loading";
import {useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { authService } from "./appwrite/auth/auth";
import { login as loginSlice } from "./store/authSlice";
import { Outlet } from "react-router-dom";


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
   const acc = authService.getAccountData()

   acc.then(account=>{
    console.log(account);
    
    if(account){
      dispatch(loginSlice(account))
    }
   })
   acc.finally(()=>{
     setLoading(false)
   })
  },[])


  return (
    <div className="overflow-x-hidden">
      {loading ? <Loading></Loading> : null}

      <Outlet></Outlet>
    </div>
  )
}

export default App
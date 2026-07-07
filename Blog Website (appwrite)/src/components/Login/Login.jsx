import { login as loginSlice } from "../../store/authSlice"
import { Link, useNavigate } from "react-router-dom"
import Input from "../Input/Input"
import { authService } from "../../appwrite/auth/auth"
import { useDispatch } from "react-redux"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react"


function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: {errors},clearErrors } = useForm({mode: 'onBlur'});
  const [apiError,setApiError] = useState(null);



  async function loginUser(userData) {

    try {
      const session = await authService.loginUser(userData)

      setApiError(null)

      if (session) {
        const data = await authService.getAccountData();

        if(data){
          dispatch(loginSlice(data))
          navigate('/')
        }
      }

    }
    catch (error) {
      console.log(error);
      setApiError(error.message || 'Login failed!')
      
    }
  }


  function handleAuthWithGoogle(){
    console.log('soon!!!!!');
  }

  function handleErrorMessage(){
    setApiError(null)
    clearErrors()
  }

  




  return (
    <div className="bg-white w-full h-[100vh] text-black flex justify-center items-center relative">
      <form className="flex flex-col justify-center gap-4 items-center" onSubmit={handleSubmit(loginUser)}>

        <div className={`absolute flex flex-col justify-center items-center  gap-2 p-8 bg-gray-200 rounded-2xl ${apiError || errors.password?.message || errors.email?.message ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} >
          <p className="text-red-600 text-xl">{errors.password?.message || errors.email?.message || apiError}</p>
          <button type="button" onClick={handleErrorMessage} className="bg-blue-500 text-white p-2 w-36 rounded-md cursor-pointer">OK</button>
        </div>

        <div className="flex m-0 p-2 flex-col justify-center items-center">
              <img src="/images/logo.png" className="w-[100px] cursor-pointer" />
              <h4 style={{fontFamily: 'monospace'}} className="text-2xl font-medium">Wellcome back</h4>
        </div>

        <div>
          <button onClick={handleAuthWithGoogle} className="flex gap-4 border-zinc-950 border-1 p-1 rounded-3xl cursor-pointer w-[280px] justify-center items-center text-[#3c4043]">
            <img className="w-[20px]" src="/images/google-logo.png" />
            <p className="text-md">Continue with Google</p>
          </button>
        </div>

        <div>
         <p className="text-[#626364] text-[14px] font-mono font-[100]">or</p>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            className="border-1 p-2 w-[280px] border-[#838585] rounded-[5px]"
            {...register('email')}>
          </Input>

          <Input
            type="password"
            placeholder="Password"
            className="border-1 p-2 w-[280px] border-[#838585] rounded-[5px]"
            {...register('password',{
              required: true,
              minLength: {
                value: 8,
                message: 'Password must be 8 characters!'
              },
            })
            }>

          </Input>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button className="cursor-pointer bg-[#0d0c22] text-white p-3 w-[280px] rounded-3xl" type="submit">Continue</button>
          <p className="text-[15px] font-extralight font-sans text-[#838585]">Don,t have an acc? <Link className="underline" to={'/sign-up'}>SIGN-UP</Link></p>
        </div>
      </form>
    </div>

  )
}

export default Login



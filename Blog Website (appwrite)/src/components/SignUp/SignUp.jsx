import { useNavigate, Link } from "react-router-dom";
import { authService, AuthService } from "../../appwrite/auth/auth";
import { login as loginSlice } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import Input from "../Input/Input";

function SignUp() {

  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(null)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signUp(userData) {
    try {
      const session = await authService.createAccount(userData)
      
      if (session) {
        const data = await authService.getAccountData()

        

        if (data) {
          dispatch(loginSlice(data))
          navigate('/')
        }

      }
    } catch (error) {
      // setError(error.message)
      console.log(error);
      

    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-white text-black">
      <form className="flex flex-col gap-6 justify-center items-center" onSubmit={handleSubmit(signUp)}>

        <div className="hidden">
          <p>{error}</p>
          <button>OK</button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img className="w-[100px] cursor-pointer" src="/images/logo.png" />
          <h4 className="font-bold text-3xl">Welcome</h4>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <Input
            placeholder="Username"
            type="text"
             className="border-1 p-2 w-[280px] border-[#838585] rounded-[5px]"
            {...register('username')}
          ></Input>

          <Input
            placeholder="Email"
            type="email"
             className="border-1 p-2 w-[280px] border-[#838585] rounded-[5px]"
            {...register('email')}
          ></Input>

          <Input
            placeholder="Password"
            type="password"
             className="border-1 p-2 w-[280px] border-[#838585] rounded-[5px]" 
            {...register('password')}
          ></Input>
        </div>

        <div className="flex justify-center items-center flex-col gap-1">
          <button className="w-[280px] p-2 bg-[#0d0c22] text-white cursor-pointer font-medium" type="submit">CREATE</button>
          <p className="text-[14px] text-[#838585]">already have an account? <Link className="underline" to={'/login'}>SIGN-IN</Link></p>
        </div>


      </form>
    </div>
  )
}

export default SignUp
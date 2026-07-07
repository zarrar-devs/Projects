import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import { useNavigate } from 'react-router-dom'
import { authService } from "../../appwrite/auth/auth";
import { logout as logoutSlice } from "../../store/authSlice";
import { useEffect, useRef, useState } from "react";


function Header() {

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
  const [showAccount, setShowAcnt] = useState(false)


  let options = [
    {
      name: 'Home',
      slug: '/home',
      active: true,
      id: 's24235'
    },
    {
      name: 'Blogs',
      slug: '/all-posts',
      active: true,
      id: '32454y'
    },
    {
      name: 'About',
      active: true,
      id: '84hr4fh'
    },
    {
      name: 'CREATE',
      slug: '/add-post',
      active: true,
      id: '895uer8'
    },
  ]

  function handleOption(slug) {
    navigate(slug)
  }

  function handleLogOut() {
    const session = authService.logOut()



    session.then(() => {
      dispatch(logoutSlice())
      navigate('/')
    }).catch(error => {
      console.log(error);
    })
  }

  function handleLogin() {
    navigate('/login')
  }

  function handleAccount() {
    setShowAcnt(showAccount=>!showAccount)
  }

  useEffect(()=>{
    function handleClickOutside(e){
       if(!e.target.closest('#accountBox') && !e.target.closest('#accountBtn')){
          setShowAcnt(false)
       }
    }

    document.addEventListener('click',handleClickOutside)

    return ()=>document.removeEventListener('click',handleClickOutside)
  },[])

  function handleAbout(){
    console.log('sss');
    
    document.querySelector('#footer').scrollIntoView({
      behavior: 'smooth',
    })
  }




  return (
    <header className="w-full h-[100px] bg-white">
      <nav className="w-[90%] h-full flex justify-between">
        <Logo width="200px"></Logo>

        <ul className="
        sm:flex justify-center items-center gap-[20px] text-black h-[70%] hidden">
          {
            authStatus.status ? options.map(option => {
              return <li key={option.id}>
                {option.active ?
                  <button className="uppercase cursor-pointer font-thin text-[12px]" onClick={() =>{
                    if(option.name === 'About') handleAbout()
                      else handleOption(option.slug)
                  }}>{option.name}</button>
                  : null}
              </li>
            }) : null
          }
        </ul>

        <div className="flex justify-center items-center gap-[30px] h-[70%] relative">
          {
            authStatus.status ?
              <button
                onClick={handleAccount}
                id="accountBtn"
                className="cursor-pointer bg-gray-100 rounded-md text-black text-[12px] p-2.5">
                <img className="w-[24px]" src="/images/account.svg" />
              </button> :
              <button onClick={handleLogin} className="cursor-pointer text-black">LOGIN</button>
          }

          {
            authStatus.status &&
            <div id="accountBox" className={`w-[300px] rounded-2xl flex flex-col justify-center items-center p-6 bg-gray-100 text-black absolute z-50 right-[0%] top-[50%] transition-all ${showAccount ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} `}>
            <h2 className="text-lg border-b-2">Hi, <span className="font-semibold">@{authStatus.userInfo?.$id}</span>!</h2>
            <p className="mt-6 text-[13px]">{authStatus.userInfo?.email}</p>
            <button className="bg-amber-50 cursor-pointer p-1 text-[14px] w-[150px] rounded-3xl" onClick={handleLogOut}>LOGOUT</button>
          </div>
          }

          <button className="cursor-pointer flex sm:hidden">
            <img className="w-[30px]" src="/images/menu.png" />
          </button>

        </div>
      </nav>
    </header>
  )
}

export default Header
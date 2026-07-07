import { useNavigate } from "react-router-dom"

function Logo({width = '100px'}) {

  const navigate = useNavigate()

  function handleLogo(){
    navigate('/home')
  }

  return (
    <div onClick={handleLogo} width={width} className={`flex justify-center items-center cursor-pointer `}>
        <img width={width} src="/images/logo.png" />
    </div>
  )
}

export default Logo
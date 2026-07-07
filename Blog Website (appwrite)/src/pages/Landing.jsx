import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Landing() {
    const circleRef = useRef(null);
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.authReducer)
    const [showNote, setShowNote] = useState(true)

    function handleMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;


        requestAnimationFrame(() => {
            circleRef.current.style.opacity = "1";
            circleRef.current.style.transform =
                `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    }



    function handleMouseLeave() {
        circleRef.current.style.opacity = "0";
    }

    function handleClick() {
        if (authStatus.status) {
            navigate('/add-post')
        }
        else {
            navigate('/login')
        }
    }

    function handleNoteButton(){
        setShowNote(false)
    }

    return (
        <div className='w-full h-screen overflow-hidden flex bg-white relative overflow-x-hidden'>

            <div
                ref={circleRef}
                className="w-52 h-52 text-white bg-black flex items-center justify-center text-3xl rounded-full absolute pointer-events-none opacity-0 transition-all duration-300 ease-out"
            >
                CREATE ➪
            </div>

            {
                showNote &&
            <div className="absolute z-[10000] p-6 w-2xl text-black bg-gray-200 flex flex-col gap-6 justify-center items-center  left-1/2 -translate-x-1/2 ">
                <p><span className="text-red-600">Note:</span> This is a functionality-focused project. Please don’t focus on the UI it has simple and decent CSS. This is not responsive for now.</p>
                <button onClick={handleNoteButton} className="bg-blue-600 text-white p-1 rounded-md w-[80px] cursor-pointer ">OK</button>
            </div>

            }

            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className='w-1/2 flex items-start justify-center '
            >
                <h1 className='text-[130px] mt-[100px] leading-[0.95] text-[#222222] font-bold cursor-none'>
                    <span className="block">CREATE</span>
                    <span className="block ml-3">BLOG</span>
                </h1>
            </div>

            <div className='w-1/2 flex items-center justify-center relative'>
                <img src="/images/blog-2.png" />
                <img className="absolute" src="/images/blog-3.png" />
            </div>

        </div>
    );
}

export default Landing;
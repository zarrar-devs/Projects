import { useRef, useState } from 'react'

export function FeatureCard({ img, title, LinkText1, LinkText2, des, iconImg, children, bgColor,bgTextColor = 'black' }) {

    const cardRef = useRef(null)
    const [positions, setPositions] = useState({ x: 0, y: 0 })

    function handleMouseMove(e) {

        if (cardRef) {

            const strength = { normal: 40, hard: 50 }
            const cardPos = cardRef.current.getBoundingClientRect()


            const x = (e.clientX - cardPos.left) / cardPos.width - 0.5
            const y = (e.clientY - cardPos.top) / cardPos.height - 0.5



            setPositions({ x: x * strength.normal, y: y * strength.normal })
            console.log(positions);


        }

    }

    function handleClick(e){
       
    }

    function handleMouseLeave() {
        setPositions({ x: 0, y: 0 })
    }

    return (
        <div className="row-span-4 md:row-span-5 flex flex-col justify-center items-center">
            <div
                ref={cardRef}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: bgColor }}
                className="w-[95%] md:w-[100%] lg:w-[80%] cursor-pointer h-[580px] relative overflow-hidden group hover:scale-95 transition-transform duration-300"
            >

                {/* TITLE  */}
              
                <h2
                    style={{
                        transform: `translate(-50%, -50%) translate(${-positions.x}px, ${-positions.y}px `,
                        color: `${bgTextColor}`
                    }}
                    className="absolute text-[20vw] md:text-[100px] lg:text-[130px] font-black font-[Ubuntu] z-10 left-1/2 top-1/2 transition-transform duration-100 ease-linear"
                >
                    {title}
                </h2>

                {!children ? (
                    <div className="absolute z-20 left-1/2 top-1/2 -translate-1/2 group-hover:scale-105 transition-transform duration-300">

                        <img className='' src={img} />

                        <div style={{transform: `translate(${positions.x}px, ${positions.y}px)`}} className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white absolute left-[80%] top-0  transition-transform duration-100 ease-linear">
                            <img className="w-[20px]" src={iconImg} alt="icon" />
                        </div>

                        <div style={{transform: `translate(${positions.x}px, ${positions.y}px)`}} className="bg-white absolute left-[-20%] md:left-[0%] top-[90%] flex items-center justify-center p-1 w-[200px] rounded  transition-transform duration-100 ease-linear">
                            <p className="text-black text-[14px] font-bold">
                                {LinkText1}
                                <span className="text-[#f46503]">{LinkText2}</span>
                            </p>
                        </div>

                    </div>
                ) : (
                    children
                )}


            </div>

            <div className="font-[Ubuntu] text-center p-2 text-lg">{des}</div>

        </div>
    )
}
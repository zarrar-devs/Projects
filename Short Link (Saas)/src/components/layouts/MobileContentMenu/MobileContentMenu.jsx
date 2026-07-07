import { Link } from "react-router";
import { FaTimes } from "react-icons/fa";

export function MobileContentMenu({ options, openMenu, handleMobileMenu }) {
    return (
        <div id="mobile-menu-content" className={` ${openMenu ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] '} transition-[clip-path] duration-500 absolute z-50 top-0 left-0 w-full h-full flex flex-col bg-black`}>
            <div onClick={handleMobileMenu} className="w-full p-4 flex justify-end ">
                <FaTimes className="text-2xl font-bold cursor-pointer hover:scale-110 transition-all" />
            </div>

            <div className=" w-full flex flex-col p-6 gap-2 ">
                <button className="bg-white text-black font-[Montserrat] p-1 text-[15px] cursor-pointer hover:bg-amber-50 transition-all">Sign Up</button>
                <button className="text-white bg-black font-[Inter] p-1 text-[15px] border-1 border-gray-700 cursor-pointer hover:bg-gray-900 transition-all">Log In</button>
            </div>

            <div className="flex flex-col w-full justify-center items-center p-2 gap-5 sm:gap-3">
                {options.map(option => (
                    <Link
                        className="group text-xl sm:text-2xl w-full p-2 sm:p-3 border text-white flex justify-center items-center font-[Inter] uppercase relative overflow-hidden"
                        key={option.id}
                        to={option.slug}
                    >
                        <span className="relative z-10 group-hover:text-black">{option.name}</span>

                        <span className="absolute inset-0 bg-white 
                       [clip-path:inset(0_100%_0_0)] 
                        group-hover:[clip-path:inset(0_0_0_0)] 
                        transition-[clip-path] duration-500">
                        </span>
                    </Link>
                ))}
            </div>

        </div>
    )
}

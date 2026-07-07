import { Link } from "react-router"

export function NotFound() {
    return (
        <div className='w-full h-screen flex flex-col gap-2 items-center justify-center bg-black text-white'>
            <h4 className='text-3xl font-[Inter]'>Sorry, We could'nt load this Page.</h4>
            <Link to={'/'} className="font-[Ubuntu] p-3 cursor-pointer font-[600] bg-white text-black rounded-[3px]">BACK TO HOME</Link>
            <div className="flex items-center justify-center gap-2 mt-6 text-white">
                <div className="w-3 h-3 bg-white rounded-[50%]"></div>
                <div className="w-3 h-3 bg-white rounded-[50%]"></div>
                <div className="w-3 h-3 bg-white rounded-[50%]"></div>
            </div>

        </div>
    )
}
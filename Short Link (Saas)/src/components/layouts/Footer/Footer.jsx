

export function Footer() {
    return (
        <div className='w-full p-12 mt-10 flex flex-col sm:flex-row gap-10 items-start justify-center'>
            <div className="w-[70%] flex flex-col gap-5 text-white" >
                <div>
                    <ul className="flex flex-col font-[Ubuntu] ">
                        <li className="cursor-pointer">HOME</li>
                        <li className="cursor-pointer">CONTACT US</li>
                        <li className="cursor-pointer">PAGES</li>
                        <li className="cursor-pointer">LINKS</li>
                        <li className="cursor-pointer">CODES</li>
                    </ul>
                </div>

                <div>
                    <ul className="list-none font-[Ubuntu]">
                       <li className="cursor-pointer">YOUTUBE</li>
                       <li className="cursor-pointer">INSTAGRAM</li>
                       <li className="cursor-pointer">LINKEDIN</li>
                       <li className="cursor-pointer">FACEBOOK</li>
                    </ul>
                </div>
            </div>

            <div className=" w-full sm:w-[30%]">
                <div className="flex flex-col font-[Inter] gap-4">
                      <p>All things copyright goes to their respective owners</p>
                      <p>All these images and data are fake.</p>
                      <p>copyright 2026 @owners</p>
                </div>
            </div>
        </div>
    )
}
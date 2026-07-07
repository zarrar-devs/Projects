import { Logo } from "../../common/Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { MobileContentMenu } from "../MobileContentMenu/MobileContentMenu";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Account } from "../../common/Account/Account";

export function Header() {
  const optionsData = [
    { name: "Home", slug: "/home", id: "#fru548u" },
    { name: "Links", slug: "/links", id: "#gr5h5gu" },
    { name: "QR Codes", slug: "/qr-code", id: "#g5u5u44" },
    { name: "Pages", slug: "/pages", id: "#5thu58u" },
  ];
  const [openMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.authSlice.status);


  const handleMobileMenu = () => {
    setMobileMenu(!openMenu);
  };


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex justify-center items-center"
    >
      <div className="w-[90%] sm:w-[95%] flex justify-between items-center">
        <div>
          <Logo size="30px"></Logo>
        </div>

        <div className="hidden md:flex">
          <Navbar options={optionsData}></Navbar>
        </div>

        <div className="flex items-center gap-2 ">
          {loginStatus ? (
            <>
              <button className="text-[12px] cursor-pointer p-[2px] rounded-[3px] w-[50px] border-1 border-gray-400 flex justify-center items-center hover:bg-gray-800 transition-all font-[Inter] hidden md:flex">
                About
              </button>
              <Account></Account>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-[12px] border-1 w-[50px] p-[2px] rounded-[3px] border-gray-400 cursor-pointer flex justify-center items-center hover:bg-gray-800 transition-all font-[Inter] hidden md:flex"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="text-[12px] w-[60px] p-1 rounded-sm bg-white text-black cursor-pointer flex justify-center items-center hover:bg-gray-300 transition-all font-[Inter]"
              >
                Sign Up
              </button>
            </>
          )}

          <div
            onClick={handleMobileMenu}
            className="w-[25px] h-[25px] bg-black border-1 border-gray-600 rounded-[50%] cursor-pointer flex flex-col items-center justify-center gap-[2px] p-1 hover:gap-[3px] transition-all md:hidden"
          >
            <div className="w-[10px] h-[1.5px]  bg-white"></div>
            <div className="w-[10px] h-[1.5px]  bg-white"></div>
          </div>
        </div>

        <MobileContentMenu
          handleMobileMenu={handleMobileMenu}
          openMenu={openMenu}
          options={optionsData}
        ></MobileContentMenu>
      </div>
    </motion.header>
  );
}

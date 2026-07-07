import { FaQrcode, FaMousePointer, FaLink } from "react-icons/fa";
import { MdQrCode, MdLink } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import { ResponsiveText } from "../components/common/ResponsiveText/ResponsiveText";
import { motion } from "framer-motion";
import { OurFeatures } from "../components/layouts/OurFeatures/OurFeatures";
import { ReviewSlider } from "../components/common/ReviewSlider/ReviewSlider";
import { TrustedPartners } from "../components/layouts/TrustedPartners/TrustedPartners";


export function Landing() {

  const partners = [
    { id: 'p1', logo: '/images/partners/partner-1.png' },
    { id: 'p2', logo: '/images/partners/partner-2.png' },
    { id: 'p3', logo: '/images/partners/partner-3.png' },
    { id: 'p4', logo: '/images/partners/partner-4.png' },
    { id: 'p5', logo: '/images/partners/partner-5.png' },
    { id: 'p6', logo: '/images/partners/partner-6.png' },
    { id: 'p7', logo: '/images/partners/partner-7.png' },
    { id: 'p8', logo: '/images/partners/partner-8.png' },
    { id: 'p9', logo: '/images/partners/partner-9.png' },
    { id: 'p10', logo: '/images/partners/partner-10.png' },
  ]

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="relative p-3 z-0 sm:p-20 flex flex-col items-center justify-start mt-[30px] ">

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-[Manrope] text-[10vw] sm:text-[50px] lg:text-[80px] font-semibold ml-4 mt-12 sm:m-0 z-10 leading-tight sm:text-center"
        >
          We turn{" "}

          <ResponsiveText hoverText="SHORTEN YOUR URL" delay={0.2}>URLs</ResponsiveText>,{" "}
          <ResponsiveText hoverText="CREATE YOUR PAGE" delay={0.4}>PAGES</ResponsiveText>, and {' '}
          <ResponsiveText hoverText="GENERATE QR CODES" delay={0.6}>QR CODES</ResponsiveText>{" "}

          into powerful, trackable experiences.
        </motion.h1>


        <FaQrcode className="absolute top-5 left-5 text-3xl text-[#24425d] opacity-30 z-0" />
        <MdQrCode className="absolute top-20 right-10 text-4xl text-[#24425d] opacity-30 z-0" />
        <FaMousePointer className="absolute bottom-10 left-10 text-3xl text-[#24425d] opacity-30 z-0" />
        <FaLink className="absolute top-1/2 left-1/4 text-3xl text-[#24425d] opacity-30 z-0" />
        <MdLink className="absolute bottom-5 right-5 text-4xl text-[#24425d] opacity-30 z-0" />
        <HiLink className="absolute top-10 right-1/3 text-3xl text-[#24425d] opacity-30 z-0" />

      </div>

      <div className="bg-[#242126] w-full p-3 sm:p-6">
        <div className="flex items-center justify-center" >
          <h2 className="text-[#c4c5ca] font-[Ubuntu] text-xl sm:text-2xl p-4 w-[100%] sm:w-[90%]">Smart link management with real-time analytics. Track clicks, understand users, and boost conversions at scale.</h2>
        </div>



        <OurFeatures></OurFeatures>

        <div className="w-full mt-[50px]">
          <ReviewSlider></ReviewSlider>
        </div>

        <div className="w-full bg-yellow mt-20 ">
          <TrustedPartners partners={partners}></TrustedPartners>
        </div>

      </div>
    </div>
  );
}
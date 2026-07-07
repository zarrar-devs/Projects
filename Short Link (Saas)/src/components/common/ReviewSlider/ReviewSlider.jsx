import { useRef, useState } from "react";
import { ReviewCard } from "../ReviewCard/ReviewCard"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export function ReviewSlider() {

  const reviews = [
    {
      id: 1,
      aboutUser: "CEO of Microsoft and Tech supporter",
      img: "/images/reviewer-images/reviewer-img.jpeg",
      review:
        "Super fast and reliable URL shortener. Tracking clicks is insanely smooth. Best tool I’ve used for sharing links.",
      name: "Pajeet Patel",
    },
    {
      id: 2,
      aboutUser: "Full Stack Developer at Meta, React enthusiast",
      img: "/images/reviewer-images/reviewer2-img.jpeg",
      review:
        "UI is extremely clean and performance is top-notch. Link tracking works flawlessly and feels very professional.",
      name: "Arif Khan",
    },
    {
      id: 3,
      aboutUser: "Digital Marketing Lead at Google Ads",
      img: "/images/reviewer-images/reviewer3-img.jfif",
      review:
        "Perfect tool for campaign tracking. Short links are fast, analytics are accurate, and dashboard is super intuitive.",
      name: "Neha",
    },
  ];

  const [visibleCard, setVisibleCard] = useState(1)

  const handleNext = () => {
   setVisibleCard(v=>{
    return v === reviews.length ? 1 : v + 1
   })
  }

  const handlePrev = () => {
    setVisibleCard(v => {
      return v === 1 ? reviews.length : v - 1
    })
  }

    const dragStartX = useRef(0)
    const dragEndX = useRef(0)

    function handleMouseDown(e){
        dragStartX.current = e.clientX

        
    }

    function handleMouseUp(e){
        dragEndX.current = e.clientX

        const final = dragStartX.current - dragEndX.current

        if(final > 50){
          handleNext()
        }
        if(final < -50){
          handlePrev()
        }
    }

  return (
    <div className='w-full m-0 overflow-hidden  text-[white] text-4xl font-bold font-[Manrope] flex flex-col gap-[50px]  md:gap-[50px]  justify-center items-center'>
      <div className="text-2xl lg:text-4xl flex justify-center items-center-safe text-center"><h5>What our customers are saying.</h5></div>

      <div className="flex relative w-[95%] md:w-[500px] lg:w-[700px] h-[400px] md:h-[300px] justify-center items-center  rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        {reviews.map(review => (
          <ReviewCard key={review.id} visible={visibleCard === review.id ? true : false} review={review.review} aboutUser={review.aboutUser} img={review.img} name={review.name} />
        )
        )}
        <span onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}  className=" absolute z-50 w-full h-full cursor-grab" ></span>
      </div>

      <div className="flex justify-center items-center gap-2 w-full ">
        <button onClick={handlePrev} className="cursor-pointer">
          <MdArrowBackIos />
        </button>
        <button onClick={handleNext} className="cursor-pointer">
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  )
}
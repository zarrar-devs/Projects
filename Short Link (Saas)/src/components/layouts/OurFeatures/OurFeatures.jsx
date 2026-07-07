import { FeatureCard } from "../../common/FeatureCard/FeatureCard"

export function OurFeatures() {
  return (
    <div className="w-full md:p-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-[100px]">

      <div className=" text-[#c4c5ca] text-3xl font-black flex items-center justify-center row-span-1 md:row-span-2  font-[Ubuntu]">
        <p>What We <span className="underline">Provide?</span></p>
      </div>

      <FeatureCard
        bgColor={'#da1d1d'}
        bgTextColor={'white'}
        des={'Generate and manage branded short links with ease.'}
        LinkText1={'your-product.app/'}
        LinkText2={'link'}
        img={'/images/ani-card-images/ani-link.png'}
        iconImg={'/images/ani-card-images/link-icon.png'}
        title={'LINKS'}
        imgMovement={true}
      />

      <FeatureCard
        bgColor={'#f9d5a3'}
        bgTextColor={'black'}
        des={'Create dynamic QR codes that connect users instantly.'}
        LinkText1={'your-product.app/'}
        LinkText2={'qr-code'}
        img={'/images/ani-card-images/ani-qrcode.png'}
        iconImg={'/images/ani-card-images/qrcode-icon.png'}
        title={'QUICK'}
        imgMovement={true}
      />

      <FeatureCard
        bgColor={'#e4e6d7'}
        des={'Build custom landing pages to showcase your content.'}
        LinkText1={'your-product.app/'}
        LinkText2={'page'}
        img={'/images/ani-card-images/ani-page.png'}
        iconImg={'/images/ani-card-images/page-icon.png'}
        title={'PAGES'}
        imgMovement={false}
      />


    </div>
  )
}
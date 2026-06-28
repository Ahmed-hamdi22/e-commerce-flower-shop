import Image from "next/image";
import React from "react";

export default function AboutUsGifts() {
  return (
    <div className="relative w-full max-w-[530.49px] h-[260px] flex justify-between sm:h-[376.95px]">
      {/* Main gift box */}
      <div
        className="about-us-gift-one z-10 relative w-[205px] h-[238px] mt-[18px] rounded-b-[86px] overflow-hidden
      ml-4 rounded-tl-[36px] rounded-tr-[86px] rtl:mr-4 rtl:rounded-tr-[36px] rtl:rounded-tl-[86px] sm:w-[302px] sm:h-[344px] sm:mt-[24.21px] sm:rounded-b-[120px] sm:ml-[27.49px] sm:rounded-tl-[50px] sm:rounded-tr-[120px] sm:rtl:mr-[27.49px] sm:rtl:rounded-tr-[50px] sm:rtl:rounded-tl-[120px]"
      >
        <Image
          src="/assets/images/gift-box-1.png"
          alt="gift 1"
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 250px, 302px"
          className="object-cover"
        />
      </div>

      {/* Border decoration */}
      <div
        className="absolute w-[184px] rotate-[3.09deg] rtl:-rotate-[3.09] -z-1 h-[250px] border-4 border-custom-rose-900 rounded-b-[86px] left-2 rounded-tl-[36px] rounded-tr-[86px] 
          rtl:right-2 rtl:rounded-tr-[36px] rtl:rounded-tl-[86px] sm:w-[268.88px] sm:h-[363px] sm:rounded-b-[120px] sm:left-3 sm:rounded-tl-[50px] sm:rounded-tr-[120px] sm:rtl:right-3 sm:rtl:rounded-tr-[50px] sm:rtl:rounded-tl-[120px]"
      ></div>

      {/* Smaller gift boxes */}
      <div className="flex flex-col pt-3 gap-2 sm:pt-[15.97px]">
        {/* Second gift box */}
        <div className="about-us-gift-two relative w-[132px] h-[132px] rounded-full sm:w-[193px] sm:h-[193px]">
          <Image
            src="/assets/images/gift-box-2.png"
            alt="gift 2"
            fill
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 193px"
            className="rounded-full"
          />
        </div>

        {/* Third gift box */}
        <div className="about-us-gift-three relative w-[132px] h-[100px] rounded-s-[34px] rounded-e-[70px] overflow-hidden sm:w-[193px] sm:h-[144px] sm:rounded-s-[50px] sm:rounded-e-[100px]">
          <Image
            src="/assets/images/gift-box-3.png"
            alt="gift 3"
            fill
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 193px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

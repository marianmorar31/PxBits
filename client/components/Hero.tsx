"use client";

import Image from "next/image"
import CustomButton from "./CustomButton"

const Hero = () => {


  
const handleScroll = () =>{

    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }

}

  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">Your One-Stop Shop for Quality  Tools
            </h1>
           <p className="hero__subtitle">Welcome to MechStore, where precision meets performance! Explore our extensive collection of high-quality mechanic tools, designed to streamline your projects and elevate your craftsmanship.
           </p>
           <CustomButton
           title="Explore"
           containerStyles="bg-primary-blue 
           text-white rounded-full mt-10"
           handleClick={handleScroll}
           />

        </div>
        <div className="hero__image-container">
            <div className="hero__image">
                <Image src="/tool4.PNG" alt="hero"
                fill className="object-contain"/>
               </div> 
                <div className="hero__image-overlay"
                />
            
        </div>
    </div>
  )
}

export default Hero
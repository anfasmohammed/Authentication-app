import React, { useState } from 'react'
import Slider from "react-slick";
import img1 from "../Assets/img1.jpg"
import img2 from "../Assets/img2.jpg"
import img3 from "../Assets/img3.jpg"

const Banner = () => {
  const [doActive,setDoActive]=useState(0)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        beforechang:(prev,next)=>{
          setDoActive(next)
        },
        appendDots: (dots) => (
          <div
            style={{
              position:"absolute",
              top:"70%",
              left:"45%",
              transform:"translate(-50% -50%)",
              width:"210px"
            }}
          >
            <ul style={{ 
              width:"100%",
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between" }}>
                {" "}{dots}{" "}
              </ul>
          </div>
        ),
        customPaging: (i) => (
          <div
            style={{
              width: "30px",
              height:"30px",
              borderRadius:"50%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              background:"gray",
              padding:"8px 0",
              cursor:"pointer",
              color: "black",
              border: "1px gray solid"
            }}
          >
            {i + 1}
          </div>
        )
      };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className="h-[500px] w-screen" src={img1} alt="" />
        </div>
        <div>
          <img className="h-[500px] w-screen" src={img2} alt="" />
        </div>
        <div>
          <img className="h-[500px] w-screen" src={img3} alt="" />
        </div>
      </Slider>
    </div>
  )
}

export default Banner
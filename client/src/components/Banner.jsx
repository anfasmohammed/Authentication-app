import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { useState } from "react"

const Banner=()=>{

  const slider=[
    {
      url:'https://images.unsplash.com/photo-1705909237050-7a7625b47fac?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      url:'https://images.unsplash.com/photo-1623190171710-66609b402340?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      url:'https://plus.unsplash.com/premium_photo-1732043121150-4736a0ecba5b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ]

  const [currentIndux,setCuttentIndux]=useState(0)

  const PreSlide=()=>{
    const isFirstSlide=currentIndux===0
    const newSlide=isFirstSlide?slider.length-1:currentIndux-1
    setCuttentIndux(newSlide)
  }
  const nextSlide=()=>{
    const isLastSlide=currentIndux===slider.length-1
    const newSlide=isLastSlide?0:currentIndux+1
    setCuttentIndux(newSlide)
  }

  return(
    <div className="max-w-[1400px] h-[400px] w-full m-auto p-2 relative group">
    <div style={{backgroundImage:`url(${slider[currentIndux].url})`}} className="w-full h-full rounded-2xl bg-center bg-cover duration-500"> </div>
    <div onClick={PreSlide} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 pl-3 pb-3 bg-black/10 text-white cursor-pointer  ">
      <ArrowBackIos size={30}/>
    </div>

     <div onClick={nextSlide} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 pb-3 bg-black/10 text-white cursor-pointer">
      <ArrowForwardIos size={30}/>
     </div>
    </div>
    // <div className="bg-gradient-to-r from-slate-900 to-slate-500 text-white py-12 px-6">
    //   <div className="max-w-7xl mx-auto text-center">
    //     <h2 className="text-4xl font-bold mb-4">Summer Collection 2025</h2>
    //     <p className="text-xl mb-8">Discover the latest trends in fashion and lifestyle</p>
    //     <button className="bg-white text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">Shop Now</button> 
    //   </div>
    // </div>
  )
}

export default Banner

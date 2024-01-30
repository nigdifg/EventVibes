import React, { useState } from 'react';
import {BsFillArrowRightCircleFill,BsFillArrowLeftCircleFill} from "react-icons/bs"
// import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpeg';
import img3 from '../assets/images/3.jpeg';
import img4 from '../assets/images/4.jpeg';
import img5 from '../assets/images/5.jpg';


const images = [img2, img3, img4, img5];



const CarouselImage = () => {

  let [current,setCurrent] =useState(0);

  let prevousSlide = () =>{
    if(current ===0) setCurrent(images.length - 1);
    else setCurrent(current-1);
  };

  let nextSlide =()=>{
    if(current==images.length -1) setCurrent(0);
    else setCurrent(current+1);
  }


  return (
    <div className='overflow-hidden pt-12 relative'>
    <div className={`flex transition ease-out duration-400`}
      style={
        {
          transform: `translateX(-${current*100}%)`,
        }
      }
    > 
        {images.map((image) => {
          return <img className='object-cover rounded-lg' src={image}/>;

        })
      }

    </div>

      <div className='absolute top-0 h-full w-full justify-between items-center flex text-green-700 px-10 text-4xl'>
        <button onClick={prevousSlide}>
          <BsFillArrowLeftCircleFill/>
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill/>
        </button>
      </div>
      <div className='absolute bottom-0 py-4 flex justify-center gap-4 w-full'>
        {images.map((s,i)=>{
        return (
            
          <div
          onClick={()=>setCurrent(i)}
           key ={"circle" + i}
           className={`rounded-full cursor-pointer w-5 h-5 ${i==current ? "bg-green-400": "bg-gray-400"}`}
          > </div>
        );

        })
        }

      </div>


  </div>
  );
};

export default CarouselImage;

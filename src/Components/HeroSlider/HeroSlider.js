import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import { EffectFade, Autoplay } from 'swiper'

import Img1 from '../../assets/img/heroSlider/1.jpg'
import Img2 from '../../assets/img/heroSlider/2.jpg'
import Img3 from '../../assets/img/heroSlider/3.jpg'

const slides = [
  {
    id: 1,
    img: Img1,
    title: 'Serendipity Suite',
    btnText: 'Explore our rooms',
  },
  {
    id: 2,
    img: Img2,
    title: 'Enchanting Escape',
    btnText: 'Explore our rooms',
  },
  {
    id: 3,
    img: Img3,
    title: 'Prestige Penthouse',
    btnText: 'Explore our rooms',
  },
]

const HeroSlider = () => {
  return (
    <div className='heroSlider h-[600px] lg:h-[860px]'>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        effectFade={'fade'}
        loop={true}
        className='h-full w-full bg-transparent'
      >
        {slides.map((slide) => {
          const { id, img, title, btnText } = slide
          return (
            <SwiperSlide
              key={id}
              className='relative h-full flex justify-center items-center'
            >
              <div className='z-20 text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                  <div className='uppercase font-tertiary tracking-[6px] mb-5 text-base'>
                    Enjoy impeccable service
                  </div>

                <h1 className='text-4xl font-bold text-white uppercase font-primary tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>{title}</h1>

                <button className='px-8 py-4 mt-4 text-white hover:text-black font-semibold btn bnt-lg btn-primary mx-auto rounded-md'>
                    {
                      btnText ? btnText : 'Explore our accommodations'
                    }
                  </button>
                </div>

              <div className='absolute top-0 w-full h-full'>
                <img src={img} alt={title} className='object-cover w-full h-full' />
              </div>

              {/* Color Overlay */}
              <div className='absolute w-full h-full bg-black opacity-70 inset-0'> </div>

            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default HeroSlider

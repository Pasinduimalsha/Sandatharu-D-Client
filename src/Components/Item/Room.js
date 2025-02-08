import React from 'react'
import { BsArrowsFullscreen, BsPeople } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const Room = ({ room }) => {

  const { id, name, image, size, capacity, description, price } = room;

  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>
      <div className='overflow-hidden'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300'
        />
      </div>
      
      {/* Room Details */}
      <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center
      uppercase font-tertiary tracking-[1px] font-semibold text-base'>
        <div className='flex justify-between w-[80%]'>
          {/* Size */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsArrowsFullscreen className='text-[15px]' />
            </div>

            <div className='flex gap-x-1'>
              <div className=''>Size - </div>
              <div>{size}</div>
            </div>

          </div>

         {/* Room capacity */}
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsPeople className='text-[18px]' />
            </div>

            <div className='flex gap-x-1'>
              <div className=''> Max People - </div>
              <div>{capacity}</div>
            </div>

          </div>
        </div>
      </div>
      {/* name & description */}
      <div className=''>
        <Link
          to={`/room/${id}`}
        >
          <h3 className='text-center text-xl font-tertiary font-semibold text-gray-700 uppercase py-2'>{name}</h3>
        </Link>
        {/* description */}
        <p className='text-center text-gray-500 text-sm px-4 py-2 max-w-[300px] mx-auto mb-3 lg:mb-6'>{ description.slice(0, 100) }</p>
      </div>

      {/* Button */}
      <Link
        to={`/room/${id}`}
        className='mx-auto max-w-[240px] flex justify-center items-center w-full h-12 bg-black text-white uppercase font-tertiary tracking-[1px] font-semibold text-sm py-2 px-4 rounded-md hover:bg-white hover:text-black border border-black transition-all duration-300 text'
      >
        Details ${price}
      </Link>
    </div>
  )
}

export default Room

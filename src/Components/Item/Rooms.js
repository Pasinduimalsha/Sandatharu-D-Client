import React, { useContext , useState} from 'react';
import { RoomContext } from '../../context/RoomContext';
import Room from '../../Components/Item/Room';
import { SpinnerDiamond } from 'spinners-react';

const Rooms = () => {
  const { rooms, loading } = useContext(RoomContext);

  return (
    <section className='py-24'>
      {/* Overlay & Spinner */}
      {
        loading && (
          <div className='absolute w-full h-screen bg-black/70 flex justify-center items-center z-10'>
            <SpinnerDiamond size={100} color='#fff' />
          </div>
        )
      }
      <div className='container mx-auto lg:px-0'>

        <div className='text-center'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>KOBICYPHER Hotel & Spa</div>
          <h2 className='font-primary text-[45px] mb-4'>Rooms & Suites</h2>
        </div>
        {/* grid */}
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {
            rooms.map((room, index) => {
              return (
                <Room room={room} key={index} />
                );
              }
            )
            
          }
        </div>
      </div>
    </section>
  );
};

export default Rooms;

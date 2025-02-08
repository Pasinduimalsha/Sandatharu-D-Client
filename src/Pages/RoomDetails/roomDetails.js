import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext'
import { BsCheck2Circle } from 'react-icons/bs'
import ScrollToTop from '../../Components/Item/ScrollToTop'

const RoomDetails = () => {
  const { id } = useParams()
  const { rooms } = useContext(RoomContext)
  const room = rooms.find((room) => room.id === parseInt(id))
  console.log(room);

  const { name, description, facilities, imageLg } = room

  console.log(id);

  return (
    <section className=''>
      <ScrollToTop />
      <div className='bg-room h-[560px] bg-cover bg-center relative flex justify-center items-center'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/70'></div>

        {/* title */}
        <h1 className='text-3xl text-white font-bold z-10 font-primary text-center'>
          {name} Details
        </h1>
      </div>

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24 gap-8'>
          {/* Left Side */}
          <div className='w-full h-full lg:w-[58%] px-6 hover:shadow-lg
          transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:rotate-1
          '>
            <h3 className='h2'>{name}</h3>
            <p className='mb-8'>{description}</p>
            <img src={imageLg} alt={name} className='mb-8' />
            {/* facilities */}
            <div className='my-8 mt-12'>
              <h3 className='h3 mb-3'>Room Facilities</h3>
              <p className='mb-12'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt distinctio dolorem fugit reiciendis sunt iste doloremque aut dolore ex tempora voluptatibus aliquid in repellat facere et ipsum, laudantium ut quasi?
              </p>
              {/* Grid */}
              <div className='grid grid-cols-3 gap-6 mb-12'>
                {
                  facilities.map((facility, index) => {
                    const { name, icon } = facility
                    return (
                      <div key={index} className='flex items-center mb-3 gap-x-3 flex-1'>
                        <div className='text-lg text-accent'>{icon}</div>
                        <div className='text-vase text-accent'>{name}</div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className='w-full h-full lg:w-[40%] p-6 hover:shadow-lg
          transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:rotate-1'>

            {/* Rules */}
            <div className=''>
              <div className=''>
                <h3 className='h3'>Hotel Rules</h3>
                <p className='mb-6'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita labore pariatur maxime. Adipisci, recusandae voluptatem illo natus sed veritatis molestiae dicta assumenda consequuntur cupiditate eveniet quae dolorem alias maiores necessitatibus!
                </p>

                <ul className='flex flex-col gap-y-4'>

                  <li className='flex items-center gap-x-4'>
                    <BsCheck2Circle className='text-accent text-base' />
                    Check-In: 8:00 PM - 12:00 AM
                  </li>

                  <li className='flex items-center gap-x-4'>
                    <BsCheck2Circle className='text-accent text-base' />
                    Check-Out: 1:00 PM - 12:00 AM
                  </li>

                  <li className='flex items-center gap-x-4'>
                    <BsCheck2Circle className='text-accent text-base' />
                    No Smoking & No Pets
                  </li>

                  <li className='flex items-center gap-x-4'>
                    <BsCheck2Circle className='text-accent text-base' />
                    No drugs allowed
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoomDetails

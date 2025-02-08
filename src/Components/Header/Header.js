import { useState, useEffect } from 'react'

const Header = () => {
  const [header, setHeader] = useState(false)

  const listenScrollEvent = () => {
    window.scrollY > 100 ? setHeader(true) : setHeader(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
  }, [])

  return (
    <header
      className={`${header ? 'bg-white shadow-lg py-6' : 'bg-transparent py-8'}
      transition duration-500 ease-in-out fixed w-full z-50 top-0
        `}
    >
      <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        <a href='/'>
          {header ? (
            <p className='text-2xl text-center font-bold text-gray-800 uppercase font-primary tracking-[2px] max-w-[920px] lg:text-[16px] leading-tight'>
              Kobicypher
            </p>
          ) : (
            <p className='text-2xl text-center font-bold text-white uppercase font-primary tracking-[2px] max-w-[920px] lg:text-[16px] leading-tight'>
              Kobicypher
            </p>
          )}
        </a>

        <nav
          className={`${
            header ? 'text-gray-800' : 'text-white'
          } flex gap-x-4 font-tertiary lg:gap-x-8 tracking-[3px] text-[15px] items-center uppercase`}
        >
          <ul className='flex justify-end space-x-4'>
            <li>
              <a href='#home' className='hover:text-gray-400'>
                Home
              </a>
            </li>
            <li>
              <a href='#about' className='hover:text-gray-400'>
                Rooms
              </a>
            </li>
            <li>
              <a href='#services' className='hover:text-gray-400'>
                Restaurant
              </a>
            </li>
            <li>
              <a href='#portfolio' className='hover:text-gray-400'>
                Spa
              </a>
            </li>
            <li>
              <a href='#contact' className='hover:text-gray-400'>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

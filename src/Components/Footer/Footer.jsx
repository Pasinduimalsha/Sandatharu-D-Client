import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-black py-12'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between text-white'>
        <a href='/' className='text-2xl text-center font-bold text-white uppercase font-primary tracking-[2px] max-w-[920px] lg:text-[16px] leading-tight'>
          KOBICYPHER
        </a>
        <p className='mt-2'>
          &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

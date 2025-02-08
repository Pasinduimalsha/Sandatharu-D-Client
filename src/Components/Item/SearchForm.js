import React, { useContext, useState } from 'react';
import { RoomContext } from '../../context/RoomContext';

const SearchForm = () => {
  const { handleClick } = useContext(RoomContext);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    handleClick(searchQuery);
  };


  return (
    <form className='h-[300px] w-full lg:h-[70px] hidden md:block bg-transparent' onSubmit={handleSubmit}>
      <div className='flex flex-col w-full h-full lg:flex-row'>
        <div className='w-full'>

          <input
            type="text"
            placeholder='Explore our Luxurious rooms...'
            className='h-[70px] w-full text-gray-700 uppercase px-4 py-2 border-0 focus:outline-none
            focus:border-transparent placeholder-gray-700'
            // value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className='btn btn-primary hover:text-black' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

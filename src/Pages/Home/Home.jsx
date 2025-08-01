import React from 'react'

import { useState, useEffect } from 'react';
import Loading from '../../Pages/Loading/Loading';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import SearchForm from '../../Components/Item/SearchForm';
import Rooms from '../../Components/Item/Rooms';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';


const Home = () => {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, []);
  if (loading) return <Loading />;
  return (
    <div ClassName={"flex flex-col gap-0 mt-20"}>
       <Header/>
       <HeroSlider />
      <div className="container mx-auto relative">
        <div className='bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-24'>
      <SearchForm />
        </div>
      </div>
      <Rooms />
      <Footer/>
      
    </div>
  );
}

export default Home


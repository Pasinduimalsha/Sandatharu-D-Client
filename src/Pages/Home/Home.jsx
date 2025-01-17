import React from 'react'

import { useState, useEffect } from 'react';
import Loading from '../../Pages/Loading/Loading';
import Header from '../../Components/Header/Header';
import Packages from '../../Pages/Packages/Packages';



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
      <Header />
      <Packages />

      <div>Home3</div>
      <div>Home4</div>
      
    </div>
  );
}

export default Home


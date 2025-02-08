import React, { createContext, useState, useMemo, useCallback } from 'react';
import { roomData } from '../Pages/data';


export const RoomContext = createContext();


const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    setLoading(true);

    const filteredRooms = roomData.filter((room) => room.capacity <= total);
    setTimeout(() => {
      setRooms(filteredRooms);
      setLoading(false);
    }, 3000);
  }, [total]);

  return useMemo(() => (
    <RoomContext.Provider value={{ rooms, handleClick, loading}}>
      {children}
    </RoomContext.Provider>
  ), [rooms, handleClick, loading, children]);
};

export default RoomProvider;

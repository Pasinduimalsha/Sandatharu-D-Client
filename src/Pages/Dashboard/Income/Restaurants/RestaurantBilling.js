import React, { useState } from 'react';
import TableSelector from './TableSelector';
import KOTManager from './KOTManager';


const RestaurantBilling = () => {
  const [tables, setTables] = useState({});
  const [activeTable, setActiveTable] = useState('Cabana 1');

  const addKOT = (table, kot) => {
    setTables(prev => {
      const existing = prev[table] || { kots: [], finalBill: { completed: false } };
      return {
        ...prev,
        [table]: {
          ...existing,
          kots: [...existing.kots, kot],
        },
      };
    });
  };



  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
     

   
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
           
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Billing</h1>
        <p className="text-gray-600">Manage orders, KOTs and billing for tables and rooms</p>
    
          <div className="bg-white rounded-lg shadow-md p-4">
            <TableSelector
              tables={Object.keys(tables)}
              activeTable={activeTable}
              setActiveTable={setActiveTable}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <KOTManager activeTable={activeTable} onAddKOT={addKOT} />
          </div>

          
        </div>
        
      </div>

    </div>
  );
};

export default RestaurantBilling;
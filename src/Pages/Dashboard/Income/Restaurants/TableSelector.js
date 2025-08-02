import React from 'react';

const TableSelector = ({ tables, activeTable, setActiveTable }) => {
  const cabanas = ['Cabana 1', 'Cabana 2', 'Cabana 3', 'Cabana 4'];
  const rooms = ['Room 1', 'Room 2'];
  const allTables = [...cabanas, ...rooms];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Select Table/Room</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Select
        </label>
        <select 
          value={activeTable}
          onChange={(e) => setActiveTable(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {allTables.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Cabanas</h4>
          <div className="flex flex-wrap gap-2">
            {cabanas.map(t => (
              <button
                key={t}
                onClick={() => setActiveTable(t)}
                className={`py-2 px-3 rounded-md text-sm ${
                  activeTable === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${
                  tables.includes(t) ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {t}
                {tables.includes(t) && <span className="ml-1 text-xs">●</span>}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Rooms</h4>
          <div className="flex flex-wrap gap-2">
            {rooms.map(t => (
              <button
                key={t}
                onClick={() => setActiveTable(t)}
                className={`py-2 px-3 rounded-md text-sm ${
                  activeTable === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } ${
                  tables.includes(t) ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {t}
                {tables.includes(t) && <span className="ml-1 text-xs">●</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSelector;
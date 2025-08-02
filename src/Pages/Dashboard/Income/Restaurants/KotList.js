import React, { useState, useEffect } from 'react';
import apiService from '../../../../http/index'; 

const KotList = ({ onToggle, table }) => {
  const [kotsList, setKotsList] = useState([]);
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // yyyy-mm-dd
  });

  // Fetch KOTs based on status and date
  useEffect(() => {
    const fetchKOTs = async () => {
      try {
        const response = await apiService.get(
          `kot?status=${status}&table=${encodeURIComponent(table)}&date=${date}`
        );
        setKotsList(response|| []);
      } catch (err) {
        // handle error
      }
    };
    fetchKOTs();
  }, [status, table, date]);

  // Accept or reject KOT and update in DB
  const handleToggle = async (kotId, accept) => {
    try {
      const newStatus = accept ? 'accepted' : 'rejected';
      await apiService.patch(`kot/${kotId}/status`, { status: newStatus });
      setKotsList(prev =>
        prev.map(kot =>
          kot._id === kotId ? { ...kot, status: newStatus } : kot
        )
      );
      if (onToggle) onToggle(kotId, accept);
    } catch (err) {
      // handle error
    }
  };

  // UI
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          KOT List
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full">
            {table}
          </span>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
            {kotsList.length} KOTs
          </span>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      {kotsList.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-md flex flex-col items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No KOTs have been created for this table yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {kotsList.map((kot) => (
            <div
              key={kot._id}
              className={`border rounded-lg overflow-hidden ${
                kot.status === 'accepted'
                  ? 'border-green-500 bg-green-50'
                  : kot.status === 'rejected'
                  ? 'border-red-300 bg-red-50'
                  : 'border-yellow-300 bg-yellow-50'
              }`}
            >
              <div className="bg-white px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{kot.time}</span>
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        kot.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : kot.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {kot.status.charAt(0).toUpperCase() + kot.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Waiter: {kot.waiter} | Pax: {kot.pax} | {kot.date}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {kot.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleToggle(kot._id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-md flex items-center"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleToggle(kot._id, false)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md flex items-center"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="px-4 py-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Order Items:
                </h4>
                <ul className="space-y-1">
                  {kot.items.map((item, idx) => (
                    <li key={idx} className="flex flex-wrap gap-2 items-center text-sm">
                      <span className="text-gray-800 font-medium">{item.item}</span>
                      {item.portion && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                          {item.portion}
                        </span>
                      )}
                      {item.weight && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          {item.weight}kg
                        </span>
                      )}
                      {item.price && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Rs.{item.price}
                        </span>
                      )}
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        x{item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KotList;
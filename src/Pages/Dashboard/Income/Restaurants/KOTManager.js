import React, { useState } from 'react';
import ItemInputRow from './ItemInputRow';
import apiService from "../../../../http/index";
import { toast } from "react-toastify";

const waiters = ['John', 'Alice', 'Sam', 'David', 'Emma',"Other"];

const KOTManager = ({ activeTable, onAddKOT }) => {
  const [pax, setPax] = useState('');
  const [waiter, setWaiter] = useState(waiters[0]);
  const [customWaiter, setCustomWaiter] = useState('');
  const [items, setItems] = useState([]);

  const now = new Date();
  const initialTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
  const [time, setTime] = useState(initialTime);


  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const submitKOT = async () => {

    if (items.length === 0) {
      toast.error("Please add at least one item to the KOT");
      return;
    }


    if (!pax) {
       toast.error("Please enter the number of guests");
      return;
    }

  const [day, month, year] = new Date().toLocaleDateString().split('/');
  const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

 const kot = {
  table: activeTable,
  date: isoDate,
  time,
  pax: Number(pax),
  waiter: waiter === 'Other' ? customWaiter : waiter,
  items,
  status: "pending",
  payment: "pending"
};

  console.log("Submitting KOT:", kot);

     try {
    const response = await apiService.post("kot", kot);

    const savedKOT = await response.data;

    toast.success("KOT submitted successfully");
    onAddKOT(activeTable, savedKOT);
    setPax('');
    setItems([]);
    setTime(new Date().toLocaleTimeString());
  } catch (err) {
    toast.error(err.message);
  }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          New KOT for <span className="text-blue-600">{activeTable}</span>
        </h3>
        <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            placeholder="Pax"
            value={pax}
            onChange={e => setPax(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Waiter
          </label>
          <select
            value={waiter}
            onChange={e => setWaiter(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {waiters.map(w => <option key={w}>{w}</option>)}
          </select>
          {waiter === 'Other' && (
            <input
              type="text"
              placeholder="Enter waiter name"
              value={customWaiter}
              onChange={e => setCustomWaiter(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Menu Items
        </label>
        <ItemInputRow onAdd={handleAddItem} />

        {items.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
            <ul className="bg-gray-50 rounded-md divide-y divide-gray-200">
  {items.map((item, index) => (
    <li key={index} className="flex items-center justify-between py-2 px-3">
      <div>
        <span className="text-sm font-medium">{item.item}</span>
        {/* Show portion if available */}
        {item.portion && (
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
            {item.portion}
          </span>
        )}
        {/* Show weight if available */}
        {item.weight && (
          <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
            {item.weight}kg
          </span>
        )}
        {/* Show price */}
        {item.price && (
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
            Rs.{item.price}
          </span>
        )}
        {/* Always show quantity */}
        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          x{item.quantity}
        </span>
      </div>
      <button
        onClick={() => removeItem(index)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </li>
  ))}
</ul>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span>Time: {time}</span>
          <button
            onClick={() => setTime(new Date().toLocaleTimeString())}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            Update
          </button>
        </div>

        <button
          onClick={submitKOT}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium flex items-center"
          disabled={items.length === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Submit KOT
        </button>
      </div>
    </div>
  );
};

export default KOTManager;
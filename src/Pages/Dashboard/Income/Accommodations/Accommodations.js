import React, { useState } from 'react';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const initialRooms = [
  { id: 1, name: 'Room 1', status: 'available', defaultPrice: 12000 },
  { id: 2, name: 'Room 2', status: 'available', defaultPrice: 15000 },
  { id: 3, name: 'Room 3', status: 'available', defaultPrice: 10000 },
  { id: 4, name: 'Room 4', status: 'available', defaultPrice: 10000 },
  { id: 5, name: 'Room 5', status: 'available', defaultPrice: 10000 },
  { id: 6, name: 'Room 6', status: 'available', defaultPrice: 10000 },
  { id: 7, name: 'Room 7', status: 'available', defaultPrice: 10000 },
];

const Accommodations = () => {
  const [roomsData, setRoomsData] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    contact: '',
    email: '',
  });
  const [bookings, setBookings] = useState([]);

  const calculateTotal = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * selectedRoom.price;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom || !checkInDate || !checkOutDate || !customerDetails.name || !customerDetails.contact) {
      toast.error('Please fill all fields');
      return;
    }

    const newBooking = {
      id: uuidv4(),
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkInDate,
      checkOutDate,
      pricePerNight: selectedRoom.price,
      total: calculateTotal(),
      status: 'confirmed',
      customerDetails,
    };

    setBookings([...bookings, newBooking]);

    setRoomsData(prev =>
      prev.map(room =>
        room.id === selectedRoom.id ? { ...room, status: 'occupied' } : room
      )
    );

    setSelectedRoom(null);
    setCheckInDate('');
    setCheckOutDate('');
    setCustomerDetails({ name: '', contact: '', email: '' });
    toast.success('Room booked successfully!');
  };

  const handleCheckout = (bookingId) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'checked out' }
        : booking
    );

    const checkedOutBooking = bookings.find(b => b.id === bookingId);

    const updatedRooms = roomsData.map(room =>
      room.id === checkedOutBooking.roomId
        ? { ...room, status: 'available' }
        : room
    );

    setBookings(updatedBookings);
    setRoomsData(updatedRooms);
    toast.success('Checked out successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Room Booking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roomsData.map(room => (
          <div
            key={room.id}
            className={`border p-4 rounded-lg cursor-pointer ${
              selectedRoom?.id === room.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
            onClick={() =>
              setSelectedRoom({
                ...room,
                price: room.defaultPrice,
              })
            }
          >
            <h3 className="text-lg font-medium">{room.name}</h3>
            <p>Status: <span className={room.status === 'available' ? 'text-green-600' : 'text-red-500'}>{room.status}</span></p>
            <p>Default Price: RS. {room.defaultPrice}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={e => setCheckInDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={e => setCheckOutDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
          <input
            type="text"
            value={customerDetails.name}
            onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
          <input
            type="text"
            value={customerDetails.contact}
            onChange={e => setCustomerDetails({ ...customerDetails, contact: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={customerDetails.email}
            onChange={e => setCustomerDetails({ ...customerDetails, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            
          />
        </div>

        {selectedRoom && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Rate (per night)</label>
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedRoom.price}
                onChange={(e) =>
                  setSelectedRoom(prev => ({ ...prev, price: parseInt(e.target.value) }))
                }
              >
                <option value="12000">RS. 12,000</option>
                <option value="15000">RS. 15,000</option>
                <option value="10000">RS. 10,000</option>
              </select>
              <input
                type="number"
                min="1000"
                value={selectedRoom.price}
                onChange={(e) =>
                  setSelectedRoom(prev => ({ ...prev, price: parseInt(e.target.value) }))
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        )}

        <div>
          <p className="text-lg font-semibold">
            Total: RS. {calculateTotal()}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!selectedRoom || !checkInDate || !checkOutDate || !customerDetails.name || !customerDetails.contact }
        >
          Book Now
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Current Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Room</th>
                <th className="px-4 py-2 border">Check-in</th>
                <th className="px-4 py-2 border">Check-out</th>
                <th className="px-4 py-2 border">Rate</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-4 py-2 border">{booking.roomName}</td>
                  <td className="px-4 py-2 border">{booking.checkInDate}</td>
                  <td className="px-4 py-2 border">{booking.checkOutDate}</td>
                  <td className="px-4 py-2 border">RS. {booking.pricePerNight}</td>
                  <td className="px-4 py-2 border">RS. {booking.total}</td>
                  <td className="px-4 py-2 border">{booking.customerDetails.name}</td>
                  <td className="px-4 py-2 border capitalize">{booking.status}</td>
                  <td className="px-4 py-2 border">
                    {booking.status === 'confirmed' ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleCheckout(booking.id)}
                      >
                        Confirm Checkout
                      </button>
                    ) : (
                      <span className="text-green-700 font-medium">Checked Out</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Accommodations;
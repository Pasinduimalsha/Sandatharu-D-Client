import React, { useState } from 'react';
import { toast } from "react-toastify";
// import apiService from "../../../http/index";

const defaultMenus = {
  "Wedding Packages": [
    {
      name: "Premium Package",
      items: [
        { name: "Welcome Drinks", description: "Fresh Fruit Juice/King Coconut" },
        { name: "Appetizers", description: "Cream of Mushroom Soup, Garden Fresh Salad" },
        { name: "Main Course", description: "Rice, 3 Vegetables, 2 Meat Dishes, 1 Fish" },
        { name: "Desserts", description: "Ice Cream, Fresh Fruits, Watalappan" }
      ],
      basePrice: 3500,
      minGuests: 100
    },
    {
      name: "Deluxe Package",
      items: [
        { name: "Welcome Drinks", description: "Fresh Fruit Juice" },
        { name: "Appetizers", description: "Vegetable Soup, Mixed Salad" },
        { name: "Main Course", description: "Rice, 2 Vegetables, 2 Meat Dishes" },
        { name: "Desserts", description: "Ice Cream, Fresh Fruits" }
      ],
      basePrice: 2500,
      minGuests: 50
    }
  ],
  "Birthday Packages": [
    {
      name: "Kids Party Package",
      items: [
        { name: "Welcome Drinks", description: "Soft Drinks/Fruit Juice" },
        { name: "Snacks", description: "French Fries, Fish Fingers, Chicken Wings" },
        { name: "Main Course", description: "Fried Rice, Noodles, Chicken" },
        { name: "Desserts", description: "Ice Cream, Birthday Cake" }
      ],
      basePrice: 1500,
      minGuests: 20
    }
  ],
  "Corporate Packages": [
    {
      name: "Business Meeting Package",
      items: [
        { name: "Welcome Drinks", description: "Tea/Coffee" },
        { name: "Snacks", description: "Pastries, Sandwiches" },
        { name: "Lunch", description: "Buffet Setup with Multiple Options" }
      ],
      basePrice: 2000,
      minGuests: 30
    }
  ]
};

const Functions = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [guestCount, setGuestCount] = useState(0);
  const [eventDate, setEventDate] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    contact: '',
    email: '',
    specialRequirements: ''
  });

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const basePrice = selectedPackage.basePrice * guestCount;
    const customizationCost = Object.values(customizations).reduce((sum, item) => sum + (item.price || 0), 0);
    return basePrice + customizationCost;
  };

  const handlePackageSelect = (category, pkg) => {
    setSelectedPackage({ ...pkg, category });
    setCustomizations({});
  };

  const handleCustomization = (itemName, changes) => {
    setCustomizations(prev => ({
      ...prev,
      [itemName]: { ...changes }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guestCount < (selectedPackage?.minGuests || 0)) {
      toast.error(`Minimum guest count is ${selectedPackage.minGuests}`);
      return;
    }

    try {
      const bookingData = {
        packageName: selectedPackage.name,
        category: selectedPackage.category,
        guestCount,
        eventDate,
        customerDetails,
        customizations,
        totalAmount: calculateTotal(),
      };

      // await apiService.post('/functions/book', bookingData);
      toast.success('Function booking successful!');

      // Reset form
      setSelectedPackage(null);
      setCustomizations({});
      setGuestCount(0);
      setEventDate('');
      setCustomerDetails({
        name: '',
        contact: '',
        email: '',
        specialRequirements: ''
      });
    } catch (error) {
      toast.error('Error booking function');
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Function Booking</h1>

      {/* Package Selection */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {Object.entries(defaultMenus).map(([category, packages]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPackage?.name === pkg.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                    }`}
                  onClick={() => handlePackageSelect(category, pkg)}
                >
                  <h3 className="font-semibold text-lg text-gray-800">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Base Price: Rs. {pkg.basePrice} per person
                  </p>
                  <p className="text-sm text-gray-600">
                    Min. Guests: {pkg.minGuests}
                  </p>
                  <div className="mt-3 space-y-2">
                    {pkg.items.map((item) => (
                      <div key={item.name} className="text-sm">
                        <span className="font-medium">{item.name}:</span>
                        <span className="text-gray-600 ml-2">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Booking Details - {selectedPackage.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                min={selectedPackage.minGuests}
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={customerDetails.contact}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, contact: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                value={customerDetails.specialRequirements}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, specialRequirements: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2"
                rows="3"
              />
            </div>
          </div>

          {/* Menu Customization */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu Customization</h3>
            {selectedPackage.items.map((item) => (
              <div key={item.name} className="mb-4 p-4 border rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Additional Items
                    </label>
                    <input
                      type="text"
                      value={customizations[item.name]?.additionalItems || ''}
                      onChange={(e) => handleCustomization(item.name, {
                        ...customizations[item.name],
                        additionalItems: e.target.value
                      })}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Add extra items..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Extra Cost (Rs.)
                    </label>
                    <input
                      type="number"
                      value={customizations[item.name]?.price || ''}
                      onChange={(e) => handleCustomization(item.name, {
                        ...customizations[item.name],
                        price: parseFloat(e.target.value)
                      })}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Base Price (per person):</span>
              <span>Rs. {selectedPackage.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Total Guests:</span>
              <span>{guestCount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Customization Costs:</span>
              <span>Rs. {Object.values(customizations).reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <span className="text-lg font-bold">Total Amount:</span>
              <span className="text-lg font-bold text-blue-600">Rs. {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Functions;
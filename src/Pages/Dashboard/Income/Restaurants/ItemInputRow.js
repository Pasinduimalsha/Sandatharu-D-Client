import React, { useState } from 'react';

const menuCategories = {
  'Sri Lankan Corner': [
    'Rice & Curry Vegetable',
    'Rice & Curry Egg',
    'Rice & Curry Fish',
    'Rice & Curry Chicken',
    'Rice & Curry Pork or Beef'
  ],
  'Shorteats Table': [
    'Potato Chips',
    'Fried Cashonuts',
    'Boil Vegetable',
    'Bether Fried Crispy Vegetable',
    'Vegetable Pakora',
    'Sousagos Chicken',
    'Jambo Sousages'
  ],
  'Fried Rice Corner': [
    'Vegetable Fried Rice',
    'Egg Fried Rice',
    'Chicken Fried Rice',
    'Mix Fried Rice',
    'Sea Food Fried Rice',
    'Nasigorang',
    'Mongolian Rice',
    'Biriyani'
  ],
  'Noodles Corner': [
    'Vegetable Noodles',
    'Egg Noodles',
    'Chicken Noodles',
    'Mix Noodles',
    'SeaFood Noodles',
    'Thai Fried Noodles'
  ],
  'Chopcy': [
    'Vegetable chopcy',
    'Chicken chopcy',
    'Mix chopcy',
    'Seafood chopcy'
  ],
  'Chopcy & Rice': [
    'Vegetable chopcy rice',
    'Chicken chopcy Rice',
    'Mix chopcy Rice',
    'Seafood chopcy Rice'
  ],
  'Chicken Dishes': [
    'Chicken Curry',
    'Chicken Stew',
    'Chicken Devilled',
    'Fried Chicken',
    'Chilly Chicken',
    'Butter Chicken',
    'Crispy Chicken'
  ],
  'Fish Dishes': [
    'Fish Curry',
    'Fish Stew',
    'Fish Devilled',
    'Fried Fish',
    'Fish Fingers With Sauce'
  ],
  'Pork Dishes': [
    'Pork Curry',
    'Pork Devilled',
    'Pork Stew',
    'Pepper Pork',
    'Fried Pork'
  ],
  'Cuttle Fish Dishes': [
    'Cuttle Fish Curry',
    'Cuttle Fish Devilled',
    'Callte Fish Devilled',
    'Crispy Cattle Fish',
    'Hot Butter Cuttle Fish'
  ],
  'Prawns': [
    'Prawns Curry',
    'Prawns devilled',
    'Fried Prawns',
    'Crispy Prawns',
    'Hot Battered Prawns'
  ],
  'Omelet': [
    'Sri Lankan Omelet',
    'Cheese Omelet',
    'Chicken Omelet',
    'Mix Omelet',
    'Boiled Egg'
  ],
  'Soup Corner': [
    'Vegetable Broth',
    'Egg Soup',
    'Cream Of Chicken Soup',
    'Chicken Soup',
    'Beef Soup'
  ],
  'Fresh Juice': [
    'Lime Juice',
    'Papaya Juice',
    'Pineapple Juice',
    'Watermelon Juice',
    'Mix fruit Juice'
  ],
  'Vegetable Salad': [
    'Onion Salad',
    'Mix Vegetable Salad',
    'Chilly Pineapple Salad'
  ],
  'Drinking Corner': [
    'Water(1000)ml',
    'Coca Cola(300)ml',
    'Sprite',
    'Soda',
    'Tonic'
  ],
  'Sandwich Corner': [
    'Egg Sandwich',
    'Cheese Sandwich',
    'Chicken Sandwich'
  ],
  'Sweet Corner': [
    'Ice Cream',
    'Fresh Fruit',
    'Fresh Fruit With Ice Cream',
    'Watalappan',
    'Jelly'
  ]
};

const allMenuItems = Object.values(menuCategories).flat();

const weights = ['250g', '500g', '750g', '1kg', 'Custom'];
const weightToKg = {
  '250g': 0.25,
  '500g': 0.5,
  '750g': 0.75,
  '1kg': 1,
};

const fullHalfOptions = ['Full', 'Half', 'Normal'];

const ItemInputRow = ({ onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuCategories)[0]);
  const [item, setItem] = useState(menuCategories[Object.keys(menuCategories)[0]][0]);
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState(weights[0]);
  const [customWeight, setCustomWeight] = useState('');
  const [portion, setPortion] = useState(fullHalfOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [pricePerKg, setPricePerKg] = useState('');
  const [pricePerPortion, setPricePerPortion] = useState('');
  const [price, setPrice] = useState('');

  const filteredItems = isSearchMode && searchQuery
    ? allMenuItems.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
    : menuCategories[selectedCategory];

  const handleAddItem = () => {
    let details = {};
    // Sri Lankan Corner: portion, price per portion, quantity
    if (selectedCategory === 'Sri Lankan Corner') {
      if (!portion || !pricePerPortion || !quantity || quantity <= 0 || isNaN(pricePerPortion)) {
        alert('Please enter valid portion, price and quantity');
        return;
      }
      const totalPrice = (pricePerPortion * quantity).toFixed(2);
      details = { item, portion, quantity, price: totalPrice, pricePerPortion };
    }
    // Shorteats Table, Noodles Corner, Chopcy: weight, price per kg, quantity
    else if (
      selectedCategory === 'Shorteats Table' ||
      selectedCategory === 'Noodles Corner' ||
      selectedCategory === 'Chopcy'
    ) {
      let finalWeight = weight === 'Custom' ? parseFloat(customWeight) : weightToKg[weight];
      if (!weight || !finalWeight || !pricePerKg || !quantity || quantity <= 0 || isNaN(finalWeight) || isNaN(pricePerKg)) {
        alert('Please enter valid weight, price per kg and quantity');
        return;
      }
      const totalPrice = (pricePerKg * finalWeight * quantity).toFixed(2);
      details = { item, weight: finalWeight, quantity, price: totalPrice, pricePerKg };
    }
    // Fried Rice Corner, Chopcy & Rice: portion, price per portion, quantity
    else if (
      selectedCategory === 'Fried Rice Corner' ||
      selectedCategory === 'Chopcy & Rice'
    ) {
      if (!portion || !pricePerPortion || !quantity || quantity <= 0 || isNaN(pricePerPortion)) {
        alert('Please enter valid portion, price and quantity');
        return;
      }
      const totalPrice = (pricePerPortion * quantity).toFixed(2);
      details = { item, portion, quantity, price: totalPrice, pricePerPortion };
    }
    // Other categories: price, quantity
    else {
      if (!price || !quantity || quantity <= 0 || isNaN(price)) {
        alert('Please enter valid price and quantity');
        return;
      }
      const totalPrice = (price * quantity).toFixed(2);
      details = { item, quantity, price: totalPrice, price };
    }
    onAdd(details);
    setQuantity('');
    setWeight(weights[0]);
    setCustomWeight('');
    setPortion(fullHalfOptions[0]);
    setPricePerKg('');
    setPricePerPortion('');
    setPrice('');
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setIsSearchMode(false)}
          className={`px-3 py-1 text-sm rounded-md ${
            !isSearchMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Categories
        </button>
        <button
          type="button"
          onClick={() => setIsSearchMode(true)}
          className={`px-3 py-1 text-sm rounded-md ${
            isSearchMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Search
        </button>
      </div>

      {isSearchMode ? (
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchQuery && filteredItems.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredItems.map((menuItem) => (
                <button
                  key={menuItem}
                  type="button"
                  onClick={() => {
                    setItem(menuItem);
                    setSearchQuery('');
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {menuItem}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {Object.keys(menuCategories).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setItem(menuCategories[category][0]);
                }}
                className={`px-3 py-2 text-sm rounded-md text-center border ${
                  selectedCategory === category
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filteredItems.map((menuItem) => (
              <option key={menuItem} value={menuItem}>
                {menuItem}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Input controls based on category */}
      <div className="flex gap-3">
        {/* Sri Lankan Corner */}
        {selectedCategory === 'Sri Lankan Corner' && (
          <>
            <select
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
            >
              {fullHalfOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price per portion"
              value={pricePerPortion}
              onChange={(e) => setPricePerPortion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
          </>
        )}
        {/* Shorteats Table, Noodles Corner, Chopcy */}
        {(selectedCategory === 'Shorteats Table' ||
          selectedCategory === 'Noodles Corner' ||
          selectedCategory === 'Chopcy') && (
          <>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
            >
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            {weight === 'Custom' && (
              <input
                type="number"
                placeholder="Weight in kg"
                value={customWeight}
                onChange={(e) => setCustomWeight(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md py-2 px-3"
                min="0.01"
                step="0.01"
              />
            )}
            <input
              type="number"
              placeholder="Price per 1kg"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
          </>
        )}
        {/* Fried Rice Corner, Chopcy & Rice */}
        {(selectedCategory === 'Fried Rice Corner' ||
          selectedCategory === 'Chopcy & Rice') && (
          <>
            <select
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
            >
              {fullHalfOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price per portion"
              value={pricePerPortion}
              onChange={(e) => setPricePerPortion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
          </>
        )}
        {/* Other categories */}
        {(selectedCategory !== 'Sri Lankan Corner' &&
          selectedCategory !== 'Shorteats Table' &&
          selectedCategory !== 'Noodles Corner' &&
          selectedCategory !== 'Chopcy' &&
          selectedCategory !== 'Fried Rice Corner' &&
          selectedCategory !== 'Chopcy & Rice') && (
          <>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3"
              min="1"
            />
          </>
        )}
        <button
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Add Item
        </button>
      </div>

      <div className="text-sm text-gray-600">
        {item && (
          <span className="font-medium">
            Selected item: <span className="text-blue-600">{item}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ItemInputRow;